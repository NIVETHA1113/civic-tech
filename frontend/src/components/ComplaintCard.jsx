function ComplaintCard({
  complaint,
  isAdmin = false,
  onStatusChange
}) {

  if (!complaint)
    return null

  const handleChange = (e) => {

    if (onStatusChange)
      onStatusChange(
        complaint.id,
        e.target.value
      )

  }

  return (

    <div className="bg-gray-800 p-4 mb-3 rounded text-white">

      <h3 className="font-bold text-lg">
        {complaint.title}
      </h3>

      <p>
        {complaint.description}
      </p>

      <p>
        Category: {complaint.category}
      </p>

      <p>
        Status: {complaint.status}
      </p>

      {isAdmin && (

        <select
          value={complaint.status}
          onChange={handleChange}
          className="mt-2 p-1 bg-gray-700"
        >

          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Escalated</option>

        </select>

      )}

    </div>

  )

}

export default ComplaintCard