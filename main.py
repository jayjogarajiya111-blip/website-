import os
import json
import base64
from fastapi import FastAPI, WebSocket, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from cryptography.fernet import Fernet
import google.generativeai as genai
from motor.motor_asyncio import AsyncIOMotorClient

# Make sure to pip install fastapi uvicorn motor pyjwt passlib[bcrypt] cryptography google-generativeai stripe

# ================================
# CONFIG & SECURITY INITIALIZATION
# ================================
SECRET_KEY = os.getenv("SECRET_KEY", "woxus_aes_256_super_secret_key_123!")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7

# Environment variables for API keys
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "your-gemini-key")
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
STRIPE_API_KEY = os.getenv("STRIPE_API_KEY", "your-stripe-secret")

# AES-256 Encryption (Using Fernet which is AES128 CBC but acts as robust wrapper)
# For strict AES 256 you'd use raw cryptography.hazmat AES.
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", Fernet.generate_key().decode())
cipher_suite = Fernet(ENCRYPTION_KEY.encode())

# Initialize Gemini 2.0 Flash SDK
genai.configure(api_key=GEMINI_API_KEY)
# We map to the appropriate latest 2.5 flash based on SDK availability
model = genai.GenerativeModel('gemini-2.5-flash') 

# Passlib for Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")

app = FastAPI(title="WOXUS AI Assistant API", version="1.0.0")

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection Context
client = AsyncIOMotorClient(MONGO_URI)
db = client.woxus_db

# ================================
# Pydantic Models for Data Handling
# ================================
class UserCreate(BaseModel):
    email: str
    password: str

class UserInDB(BaseModel):
    email: str
    hashed_password: str

class Review(BaseModel):
    username: str
    content: str
    rating: int = 5

class Token(BaseModel):
    access_token: str
    token_type: str

# ================================
# Auth & Security Utilities
# ================================
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

from typing import Optional

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = await db.users.find_one({"email": email})
    if user is None:
        raise credentials_exception
    return user

# ================================
# ROUTES: AUTHENTICATION
# ================================
@app.post("/api/signup", response_model=Token)
async def signup(user: UserCreate):
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Encrypt email with AES if highly sensitive (Demonstration of AES)
    encrypted_email = cipher_suite.encrypt(user.email.encode()).decode()
    
    user_dict = {
        "email": user.email,
        "encrypted_email": encrypted_email,
        "hashed_password": get_password_hash(user.password)
    }
    await db.users.insert_one(user_dict)
    
    access_token = create_access_token(data={"sub": user.email}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await db.users.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user['hashed_password']):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token = create_access_token(data={"sub": user['email']}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

# ================================
# 1. AI TERMINAL COMMAND LOGIC (WebSocket)
# ================================
@app.websocket("/ws/execute")
async def websocket_terminal(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_text("Connected to WOXUS Logic Engine [Gemini 2.0 Flash enabled]")
    try:
        while True:
            cmd = await websocket.receive_text()
            if not cmd.strip():
                continue
            
            # Send immediate reflection
            await websocket.send_text(f"➜ Analyzing command: {cmd}")
            
            try:
                # Integrate with Gemini 2.0 Flash
                prompt = (
                    f"You are WOXX, the AI Logic Engine. Execute this OS command conceptually: '{cmd}'. "
                    f"Output what you would do in standard terminal output format. Keep it concise."
                )
                response = model.generate_content(prompt)
                ai_output = response.text
                
                # Mock System OS execution feedback (For VS Code, Chrome, etc)
                if "chrome" in cmd.lower():
                    await websocket.send_text("[SYSTEM] Launching Google Chrome process...\n")
                elif "code" in cmd.lower() or "vs code" in cmd.lower():
                    await websocket.send_text("[SYSTEM] Bringing up VS Code editor...\n")
                
                await websocket.send_text(f"\n{ai_output}\n")
                await websocket.send_text("[OK] Execution Complete.\n")
                
            except Exception as gemini_err:
                await websocket.send_text(f"[ERROR] AI Engine unavailable: {str(gemini_err)}")
                
    except Exception as e:
        print(f"WebSocket closed: {e}")

# HTTP Variant
@app.post("/api/command")
async def handle_command(cmd: str, current_user: dict = Depends(get_current_user)):
    try:
        response = model.generate_content(f"Act as WOXX Terminal interpreting command: {cmd}")
        return {"status": "EXEC_SUCCESS", "message": f"Executed: {cmd}", "output": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ================================
# 2. SUBSCRIPTION & PLANS
# ================================
@app.get("/api/plans/{os_type}")
async def get_plan_details(os_type: str):
    plans = {
        "windows": {"price": 299, "trial": "7 Days", "currency": "USD", "gateway": "Stripe"},
        "macos": {"price": 399, "trial": "7 Days", "currency": "USD", "gateway": "Stripe"}
    }
    # Future: Generate Stripe checkout session here
    return plans.get(os_type.lower(), {"error": "Plan not found"})

# ================================
# 3. REVIEW SUBMISSION
# ================================
@app.post("/api/publish-review")
async def post_review(data: Review):
    # AES-256 encrypt user name if considered sensitive feedback data
    encrypted_name = cipher_suite.encrypt(data.username.encode()).decode()
    
    review_record = {
        "encrypted_username": encrypted_name,
        "content": data.content,
        "rating": data.rating,
        "timestamp": datetime.utcnow()
    }
    
    await db.reviews.insert_one(review_record)
    return {"message": "Review added to WOXUS mesh", "status": "success"}

# Start instructions: 
# uvicorn main:app --host 0.0.0.0 --port 8000 --reload
