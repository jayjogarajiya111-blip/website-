import React from 'react'
import Sidebar from './components/docs/Sidebar'
import TopNav from './components/docs/TopNav'
import DocsContent from './components/docs/DocsContent'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'

function App() {
  return (
    <div className="d-flex bg-docs-base min-vh-100 w-100">
      <Sidebar />
      <div className="flex-grow-1 bg-docs-dark d-flex flex-column" style={{ minWidth: 0 }}>
        <TopNav />
        <DocsContent />
      </div>
    </div>
  )
}

export default App
