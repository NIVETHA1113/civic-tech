import { useState } from "react"
import axios from "axios"

function RegisterTest() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen"
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/register",
        form
      )

      alert(res.data.message)

    } catch (err) {

      alert(err.response?.data?.detail || "Error")

    }

  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">

      <div className="bg-gray-800 p-6 rounded-xl w-96">

        <h2 className="text-xl mb-4">
          Register Test
        </h2>

        <input
          name="name"
          placeholder="Name"
          className="w-full p-2 mb-2 bg-gray-700"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-2 bg-gray-700"
          onChange={handleChange}
        />

        <input
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-2 bg-gray-700"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full p-2 mb-3 bg-gray-700"
          onChange={handleChange}
        >
          <option value="citizen">Citizen</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="bg-blue-500 w-full p-2"
          onClick={handleSubmit}
        >
          Register
        </button>

      </div>

    </div>
  )

}

export default RegisterTest