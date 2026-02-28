import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)


  const handleLogin = async () => {

    if (!email || !password) {

      alert("Enter email and password")
      return

    }

    try {

      setLoading(true)

      const res = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          email,
          password
        }
      )

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      )

      alert("Login successful")

      // redirect to landing page
      navigate("/")

    }

    catch (err) {

      alert(
        err.response?.data?.detail ||
        "Login failed"
      )

    }

    finally {

      setLoading(false)

    }

  }


  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">

      <div className="bg-gray-900 border border-gray-700 p-8 rounded-2xl shadow-xl w-96">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          CivicTech Portal
        </h1>

        <p className="text-gray-400 text-center mb-6">
          Public Grievance System
        </p>


        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          onChange={(e)=>setEmail(e.target.value)}
        />


        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          onChange={(e)=>setPassword(e.target.value)}
        />


        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>


        <button
          onClick={()=>navigate("/register")}
          className="w-full mt-3 border border-gray-600 hover:bg-gray-800 transition p-3 rounded-lg text-white"
        >
          Create Account
        </button>


      </div>

    </div>

  )

}

export default Login