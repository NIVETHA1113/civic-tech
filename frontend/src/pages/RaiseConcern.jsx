import { useState } from "react"
import axios from "axios"

function RaiseConcern() {

  const user =
    JSON.parse(localStorage.getItem("user"))

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Road"
  })

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async () => {

    if (!user) {
      alert("Please login first")
      return
    }

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/complaints",
        {
          title: form.title,
          description: form.description,
          category: form.category,
          user_id: user.id
        }
      )

      alert(res.data.message)

      // clear form
      setForm({
        title: "",
        description: "",
        category: "Road"
      })

    }
    catch (err) {

      alert("Failed to submit complaint")

    }

  }

  return (

    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">

      <div className="bg-gray-800 p-6 rounded-xl w-96">

        <h2 className="text-xl mb-4 font-bold">
          Raise a Concern
        </h2>

        <input
          name="title"
          value={form.title}
          placeholder="Issue title"
          className="w-full p-2 mb-2 bg-gray-700 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={form.description}
          placeholder="Describe the issue"
          className="w-full p-2 mb-2 bg-gray-700 rounded"
          onChange={handleChange}
        />

        <select
          name="category"
          value={form.category}
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          onChange={handleChange}
        >
          <option>Road</option>
          <option>Water</option>
          <option>Electricity</option>
          <option>Garbage</option>
          <option>Other</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 w-full p-2 rounded hover:bg-blue-600"
        >
          Submit Complaint
        </button>

      </div>

    </div>

  )

}

export default RaiseConcern