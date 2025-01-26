import Link from "next/link"
import LoanCalculator from "./LoanCalculator"

const LandingPage = () => {
  const loanCategories = [
    {
      name: "Wedding Loans",
      subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
      maxLoan: 500000,
      loanPeriod: 3,
    },
    {
      name: "Home Construction Loans",
      subcategories: ["Structure", "Finishing", "Loan"],
      maxLoan: 1000000,
      loanPeriod: 5,
    },
    {
      name: "Business Startup Loans",
      subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
      maxLoan: 1000000,
      loanPeriod: 5,
    },
    {
      name: "Education Loans",
      subcategories: ["University Fees", "Child Fees Loan"],
      maxLoan: "Based on requirement",
      loanPeriod: 4,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Saylani Microfinance App</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Loan Categories</h2>
          {loanCategories.map((category, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-medium">{category.name}</h3>
              <ul className="list-disc list-inside">
                {category.subcategories.map((sub, subIndex) => (
                  <li key={subIndex}>{sub}</li>
                ))}
              </ul>
              <p>
                Maximum loan:{" "}
                {typeof category.maxLoan === "number" ? `PKR ${category.maxLoan.toLocaleString()}` : category.maxLoan}
              </p>
              <p>Loan period: {category.loanPeriod} years</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Loan Calculator</h2>
          <LoanCalculator categories={loanCategories} />
        </div>
      </div>
      <div className="mt-8">
        <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Apply for a Loan
        </Link>
      </div>
    </div>
  )
}

export default LandingPage

