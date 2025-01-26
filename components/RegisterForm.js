"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "../utils/api"
import Link from "next/link"


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cnic: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await api.post("/auth/register", formData)
      localStorage.setItem("token", res.data.token)
      router.push("/dashboard")
    } catch (error) {
      setError(error.response?.data?.msg || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
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
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cnic" className="block mb-2">
          CNIC
        </label>
        <input
          type="text"
          id="cnic"
          name="cnic"
          value={formData.cnic}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          placeholder="XXXXX-XXXXXXX-X"
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
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm

