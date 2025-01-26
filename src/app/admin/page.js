"use client"
import React, { useState, useEffect } from "react"
import api from "../../../utils/api"

const AdminPanel = () => {
  const [applications, setApplications] = useState([])
  const [filter, setFilter] = useState({ city: "", country: "" })

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const res = await api.get("/admin/applications")
      setApplications(res.data)
    } catch (error) {
      console.error("Error fetching applications:", error)
    }
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/admin/applications/${id}`, { status })
      fetchApplications()
    } catch (error) {
      console.error("Error updating application status:", error)
    }
  }

  const filteredApplications = applications.filter(
    (app) =>
      (filter.city === "" || app.personalInfo.address.toLowerCase().includes(filter.city.toLowerCase())) &&
      (filter.country === "" || app.personalInfo.address.toLowerCase().includes(filter.country.toLowerCase())),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by city"
          value={filter.city}
          onChange={(e) => setFilter({ ...filter, city: e.target.value })}
          className="border rounded px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Filter by country"
          value={filter.country}
          onChange={(e) => setFilter({ ...filter, country: e.target.value })}
          className="border rounded px-2 py-1"
        />
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Loan Category</th>
            <th className="border p-2">Loan Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((app) => (
            <tr key={app._id}>
              <td className="border p-2">{app._id}</td>
              <td className="border p-2">{app.user.name}</td>
              <td className="border p-2">{app.loan.category}</td>
              <td className="border p-2">PKR {app.loan.amount.toLocaleString()}</td>
              <td className="border p-2">{app.status}</td>
              <td className="border p-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                  onClick={() => handleStatusUpdate(app._id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleStatusUpdate(app._id, "rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPanel

