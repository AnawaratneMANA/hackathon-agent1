import './App.css'
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const smeId = sessionStorage.getItem("smeId");

function App() {

  return (
    <>
     <Router>
      <Routes>

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard – only accessible when logged in */}
        <Route 
          path="/dashboard" 
          element={
            smeId ? <Dashboard smeId={smeId} /> : <Navigate to="/login" />
          } 
        />

        {/* Default route: redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
    </>
  )
}

export default App
