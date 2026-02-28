import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"

import RaiseConcern from "./pages/RaiseConcern"
import TrackIssues from "./pages/TrackIssues"

import ManageComplaints from "./pages/admin/ManageComplaints"


function ProtectedRoute({ children }) {

  const user =
    JSON.parse(localStorage.getItem("user"))

  if (!user)
    return <Navigate to="/login" />

  return children

}


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Landing page */}
        <Route path="/" element={<Landing />} />


        {/* Auth */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* Dashboard */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />


        {/* Citizen */}
        <Route
          path="/raise"
          element={
            <ProtectedRoute>
              <RaiseConcern />
            </ProtectedRoute>
          }
        />

        <Route
          path="/track"
          element={
            <ProtectedRoute>
              <TrackIssues />
            </ProtectedRoute>
          }
        />


        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <ManageComplaints />
            </ProtectedRoute>
          }
        />


      </Routes>

    </BrowserRouter>

  )

}

export default App