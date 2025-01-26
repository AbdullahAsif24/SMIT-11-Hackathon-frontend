"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import api from "../../../utils/api"

const DashboardPage = () => {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const [loanDetails, setLoanDetails] = useState({
    category: "",
    subcategory: "",
    amount: "",
    period: "",
  })
  const [guarantor1, setGuarantor1] = useState({ name: "", email: "", location: "", cnic: "" })
  const [guarantor2, setGuarantor2] = useState({ name: "", email: "", location: "", cnic: "" })
  const [personalInfo, setPersonalInfo] = useState({ address: "", phoneNumber: "" })
  const [loans, setLoans] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/user")
        setUser(res.data)
      } catch (error) {
        console.error("Error fetching user:", error)
        router.push("/login")
      }
    }
    fetchUser()
    fetchLoans()
  }, [router])

  const fetchLoans = async () => {
    try {
      const res = await api.get("/loans")
      setLoans(res.data)
    } catch (error) {
      console.error("Error fetching loans:", error)
    }
  }

  const handleLoanSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/loans", loanDetails)
      alert("Loan request submitted successfully!")
      fetchLoans()
    } catch (error) {
      console.error("Loan submission error:", error.response.data)
      alert("Loan submission failed. Please try again.")
    }
  }

  const handleApplicationSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/loans/application", {
        loanId: loans[loans.length - 1]._id, // Assuming the last loan is the one we want to apply for
        guarantor1,
        guarantor2,
        personalInfo,
      })
      alert("Loan application submitted successfully!")
    } catch (error) {
      console.error("Application submission error:", error.response.data)
      alert("Application submission failed. Please try again.")
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>CNIC: {user.cnic}</p>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Submit Loan Request</h2>
        <form onSubmit={handleLoanSubmit} className="space-y-4">
          <div>
            <label htmlFor="category" className="block mb-2">
              Loan Category
            </label>
            <select
              id="category"
              value={loanDetails.category}
              onChange={(e) => setLoanDetails({ ...loanDetails, category: e.target.value })}
              className="w-full border rounded px-2 py-1"
              required
            >
              <option value="">Select a category</option>
              <option value="Wedding Loans">Wedding Loans</option>
              <option value="Home Construction Loans">Home Construction Loans</option>
              <option value="Business Startup Loans">Business Startup Loans</option>
              <option value="Education Loans">Education Loans</option>
            </select>
          </div>
          <div>
            <label htmlFor="subcategory" className="block mb-2">
              Subcategory
            </label>
            <input
              type="text"
              id="subcategory"
              value={loanDetails.subcategory}
              onChange={(e) => setLoanDetails({ ...loanDetails, subcategory: e.target.value })}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block mb-2">
              Loan Amount
            </label>
            <input
              type="number"
              id="amount"
              value={loanDetails.amount}
              onChange={(e) => setLoanDetails({ ...loanDetails, amount: e.target.value })}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label htmlFor="period" className="block mb-2">
              Loan Period (years)
            </label>
            <input
              type="number"
              id="period"
              value={loanDetails.period}
              onChange={(e) => setLoanDetails({ ...loanDetails, period: e.target.value })}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Submit Loan Request
          </button>
        </form>
      </div>
      {loans.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Loans</h2>
          <ul>
            {loans.map((loan) => (
              <li key={loan._id} className="mb-2">
                {loan.category} - {loan.subcategory}: PKR {loan.amount} for {loan.period} years
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Submit Loan Application</h2>
        <form onSubmit={handleApplicationSubmit} className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Guarantor 1</h3>
            <input
              type="text"
              placeholder="Name"
              value={guarantor1.name}
              onChange={(e) => setGuarantor1({ ...guarantor1, name: e.target.value })}
              className="w-full border rounded px-2 py-1 mb-2"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={guarantor1.email}
              onChange={(e) => setGuarantor1({ ...guarantor1, email: e.target.value })}
              className="w-full border rounded px-2 py-1 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={guarantor1.location}
              onChange={(e) => setGuarantor1({ ...guarantor1, location: e.target.value })}
              className="w-full border rounded px-2 py-1 mb-2"
              required
            />
            <input
              type="text"
              placeholder="CNIC"
              value={guarantor1.cnic}
              onChange={(e) => setGuarantor1({ ...guarantor1, cnic: e.target.value })}
              className="w-full border rounded px-2 py-1 mb-2"
              required
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Guarantor 2</h3>
            <input
              type="text"
              placeholder="Name"
              value={guarantor2.name}
              onChange={(e) => setGuarantor2({ ...guarantor2, name: e.target.value })}
              className="w-full border rounded px-2 py-1 mb-2"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={guarantor2.email}
              onChange={(e) => setGuarantor2({ ...guarantor2, email: e.target.value })}
              className="w-full border rounded px-2 py-1 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={guarantor2.location}
              onChange={(e) => setGuarantor2({ ...guarantor2, location: e.target.value })}
              className="w-full border rounded px-2 py-1 mb-2"
              required
            />
            <input
              type="text"
              placeholder="CNIC"
              value={guarantor2.cnic}
              onChange={(e) => setGuarantor2({ ...guarantor2, cnic: e.target.value })}
              className="w-full border rounded px-2 py-1 mb-2"
              required
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
            <input
              type="text"
              placeholder="Address"
              value={personalInfo.address}
              onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
              className="w-full border rounded px-2 py-1 mb-2"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={personalInfo.phoneNumber}
              onChange={(e) => setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })}
              className="w-full border rounded px-2 py-1 mb-2"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Submit Loan Application
          </button>
        </form>
      </div>
    </div>
  )
}

export default DashboardPage

