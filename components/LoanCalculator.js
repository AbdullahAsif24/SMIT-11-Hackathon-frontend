"use client"
import { useState } from "react"

const LoanCalculator = ({ categories }) => {
  const [category, setCategory] = useState("")
  const [subcategory, setSubcategory] = useState("")
  const [initialDeposit, setInitialDeposit] = useState("")
  const [loanPeriod, setLoanPeriod] = useState("")
  const [loanAmount, setLoanAmount] = useState("")
  const [monthlyPayment, setMonthlyPayment] = useState("")

  const handleCalculate = (e) => {
    e.preventDefault()
    const selectedCategory = categories.find((cat) => cat.name === category)
    const maxLoan = selectedCategory.maxLoan

    if (typeof maxLoan === "number") {
      const calculatedLoanAmount = Math.min(maxLoan - initialDeposit, maxLoan)
      setLoanAmount(calculatedLoanAmount)

      const monthlyPaymentAmount = calculatedLoanAmount / (loanPeriod * 12)
      setMonthlyPayment(monthlyPaymentAmount.toFixed(2))
    } else {
      setLoanAmount("To be determined")
      setMonthlyPayment("To be determined")
    }
  }

  return (
    <form onSubmit={handleCalculate} className="space-y-4">
      <div>
        <label className="block">Loan Category</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
            setSubcategory("")
          }}
          className="w-full border rounded px-2 py-1"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {category && (
        <div>
          <label className="block">Subcategory</label>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="">Select a subcategory</option>
            {categories
              .find((cat) => cat.name === category)
              .subcategories.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
          </select>
        </div>
      )}
      <div>
        <label className="block">Initial Deposit (PKR)</label>
        <input
          type="number"
          value={initialDeposit}
          onChange={(e) => setInitialDeposit(Number(e.target.value))}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block">Loan Period (Years)</label>
        <input
          type="number"
          value={loanPeriod}
          onChange={(e) => setLoanPeriod(Number(e.target.value))}
          min="1"
          max="5"
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Calculate
      </button>
      {loanAmount && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Loan Breakdown</h3>
          <p>Loan Amount: {typeof loanAmount === "number" ? `PKR ${loanAmount.toLocaleString()}` : loanAmount}</p>
          <p>Monthly Payment: {monthlyPayment === "To be determined" ? monthlyPayment : `PKR ${monthlyPayment}`}</p>
        </div>
      )}
    </form>
  )
}

export default LoanCalculator

