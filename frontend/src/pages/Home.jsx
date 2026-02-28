import { useNavigate } from "react-router-dom"

function Home() {

  const navigate = useNavigate()

  const user =
    JSON.parse(localStorage.getItem("user"))

  if (!user) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Please login first
      </div>
    )

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-700">

        <h1 className="text-2xl font-bold">
          CivicTech Dashboard
        </h1>

        <button
          onClick={()=>{
            localStorage.removeItem("user")
            navigate("/login")
          }}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>

      </div>


      {/* welcome */}
      <div className="text-center mt-10">

        <h2 className="text-3xl font-semibold">
          Welcome, {user.name}
        </h2>

        <p className="text-gray-400 mt-2">
          Public Grievance Management Portal
        </p>

      </div>


      {/* cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-10">


        {/* citizen cards */}

        {user.role === "citizen" && (

          <>
            <div
              onClick={()=>navigate("/raise")}
              className="bg-gray-800 hover:bg-gray-700 cursor-pointer p-6 rounded-xl w-64 shadow-lg transition"
            >

              <h3 className="text-xl font-semibold mb-2">
                Raise Concern
              </h3>

              <p className="text-gray-400">
                Submit a new complaint to authorities
              </p>

            </div>


            <div
              onClick={()=>navigate("/track")}
              className="bg-gray-800 hover:bg-gray-700 cursor-pointer p-6 rounded-xl w-64 shadow-lg transition"
            >

              <h3 className="text-xl font-semibold mb-2">
                Track Issues
              </h3>

              <p className="text-gray-400">
                View and monitor your complaints
              </p>

            </div>

          </>
        )}


        {/* admin card */}

        {user.role === "admin" && (

          <div
            onClick={()=>navigate("/admin")}
            className="bg-gray-800 hover:bg-gray-700 cursor-pointer p-6 rounded-xl w-64 shadow-lg transition"
          >

            <h3 className="text-xl font-semibold mb-2">
              Manage Complaints
            </h3>

            <p className="text-gray-400">
              Review and update complaint status
            </p>

          </div>

        )}

      </div>


      {/* footer */}
      <div className="text-center text-gray-500 mt-16 pb-6">
        CivicTech Public Services Portal
      </div>

    </div>

  )

}

export default Home