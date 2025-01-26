"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import api from "../../../utils/api"

const ApplyPage = () => {
  const [cnic, setCnic] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/auth/register", { name, email, cnic, password })
      localStorage.setItem("token", res.data.token)
      router.push("/dashboard")
    } catch (error) {
      console.error("Registration error:", error.response.data)
      alert("Registration failed. Please try again.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Apply for a Loan</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="cnic" className="block mb-2">
            CNIC
          </label>
          <input
            type="text"
            id="cnic"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Register and Proceed
        </button>
      </form>
    </div>
  )
}

export default ApplyPage

