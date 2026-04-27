import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // 1. Fetch order to get notes
      const order = await razorpay.orders.fetch(razorpay_order_id);
      const { email, planId } = order.notes as any;

      // 2. Map planId to backend planType
      const planType = planId === "windows-3m" ? "3month" : "1month";

      // 3. Call backend to activate subscription
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const backendResponse = await fetch(`${apiUrl}/stripe-webhook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: email,
          planType: planType,
        }),
      });

      if (!backendResponse.ok) {
        console.error("Backend activation failed");
      }

      return NextResponse.json({ verified: true });
    } else {
      return NextResponse.json(
        { verified: false, error: "Invalid signature" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Razorpay verification failed:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
