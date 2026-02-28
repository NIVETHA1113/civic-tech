import { useNavigate } from "react-router-dom"

function Landing() {

  const navigate = useNavigate()

  const user =
    JSON.parse(localStorage.getItem("user"))

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-8 py-4 bg-gray-900 border-b border-gray-700">

        <h1 className="text-xl font-bold text-blue-400">
          CivicTech
        </h1>

        <div className="flex gap-6 items-center">

          <button
            onClick={()=>navigate("/home")}
            className="hover:text-blue-400"
          >
            Home
          </button>

          <button
            onClick={()=>navigate("/raise")}
            className="hover:text-blue-400"
          >
            File Complaint
          </button>

          <button
            onClick={()=>navigate("/track")}
            className="hover:text-blue-400"
          >
            Track Status
          </button>

          {user?.role === "admin" && (
            <button
              onClick={()=>navigate("/admin")}
              className="hover:text-blue-400"
            >
              Admin
            </button>
          )}

          {!user && (
            <>
              <button
                onClick={()=>navigate("/login")}
                className="hover:text-blue-400"
              >
                Login
              </button>

              <button
                onClick={()=>navigate("/register")}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Register
              </button>
            </>
          )}

          {user && (
            <button
              onClick={()=>{
                localStorage.removeItem("user")
                navigate("/login")
              }}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          )}

        </div>

      </div>


      {/* HERO SECTION */}

      <div className="text-center mt-20">

        <h2 className="text-4xl font-bold mb-4">
          CivicTech Public Grievance Portal
        </h2>

        <p className="text-gray-400 mb-8">
          Raise issues. Track progress. Improve your city.
        </p>

        <div className="flex justify-center gap-4">

          <button
            onClick={()=>navigate("/raise")}
            className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700"
          >
            File Complaint
          </button>

          <button
            onClick={()=>navigate("/track")}
            className="bg-gray-700 px-6 py-3 rounded hover:bg-gray-600"
          >
            Track Complaint
          </button>

        </div>

      </div>


      {/* FEATURES */}

      <div className="flex justify-center gap-6 mt-20 flex-wrap">

        <div className="bg-gray-800 p-6 rounded-xl w-64">
          <h3 className="text-xl font-semibold mb-2">
            Easy Complaint Filing
          </h3>
          <p className="text-gray-400">
            Submit issues in seconds
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl w-64">
          <h3 className="text-xl font-semibold mb-2">
            Live Status Tracking
          </h3>
          <p className="text-gray-400">
            Monitor resolution progress
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl w-64">
          <h3 className="text-xl font-semibold mb-2">
            Admin Monitoring
          </h3>
          <p className="text-gray-400">
            Efficient grievance management
          </p>
        </div>

      </div>


      <div className="text-center text-gray-500 mt-20 pb-6">
        CivicTech © 2026
      </div>

    </div>

  )

}

export default Landing