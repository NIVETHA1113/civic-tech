import { useEffect, useState } from "react"
import axios from "axios"

function TrackIssues() {

  const [complaints, setComplaints] = useState([])

  const user =
    JSON.parse(localStorage.getItem("user"))

  useEffect(() => {

    const fetchComplaints = async () => {

      try {

        const res = await axios.get(
          `http://127.0.0.1:8000/complaints/user/${user.id}`
        )

        console.log(res.data)

        setComplaints(res.data)

      }

      catch (err) {

        console.error(err)
        alert("Error fetching complaints")

      }

    }

    if (user)
      fetchComplaints()

  }, [])

  if (!user) {

    return (
      <div style={{color:"white"}}>
        Please login first
      </div>
    )

  }

  return (

    <div className="bg-gray-900 text-white min-h-screen p-6">

      <h1 className="text-xl mb-4">
        Your Complaints
      </h1>

      {complaints.length === 0 ? (

        <p>No complaints yet</p>

      ) : (

        complaints.map((c) => (

          <div
            key={c.id}
            className="bg-gray-800 p-4 mb-3"
          >

            <h3>{c.title}</h3>

            <p>{c.description}</p>

            <p>Status: {c.status}</p>

          </div>

        ))

      )}

    </div>

  )

}

export default TrackIssues