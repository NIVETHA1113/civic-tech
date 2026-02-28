import { useEffect, useState } from "react"
import axios from "axios"
import ComplaintCard from "../../components/ComplaintCard"

function ManageComplaints() {

  const [complaints, setComplaints] = useState([])

  const fetchComplaints = async () => {

    const res = await axios.get(
      "http://127.0.0.1:8000/complaints"
    )

    setComplaints(res.data)

  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  const updateStatus = async (id, status) => {

    await axios.put(
      `http://127.0.0.1:8000/complaints/${id}`,
      { status }
    )

    fetchComplaints()

  }

  return (

    <div className="bg-gray-900 min-h-screen p-6">

      <h1 className="text-white text-2xl mb-4">
        Manage Complaints
      </h1>

      {complaints.map(c => (

        <ComplaintCard
          key={c.id}
          complaint={c}
          isAdmin={true}
          onStatusChange={updateStatus}
        />

      ))}

    </div>

  )

}

export default ManageComplaints