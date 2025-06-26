import { useState } from "react";
import { getCompare } from "../api";
import FuelCard from "../components/FuelCard";


function Compare() {
  const [postcode, setPostcode] = useState("")
  const [result, setResult] = useState(null)
  const [sortBy, setSortBy] = useState("Nearest")
  const [fuelType, setFuelType] = useState("E10");
  const [errorMsg, setErrorMsg] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getCompare(postcode);
      setResult(res.data);
      setHasSearched(true);
      setErrorMsg("");
    } catch (error) {
      console.error("Error fetching data", error);
      if (error.response && error.response.status === 400) {
        setErrorMsg("Please provide a valid postcode");
      }
    }
  };


  let sortedStations = [...(result?.stations || [])]

  if (sortBy === "Nearest") {
    sortedStations.sort((a, b) => a.Distance_km - b.Distance_km)

  } else if (sortBy === "Cheapest") {
    sortedStations.sort((a, b) => {
      const aPrice = a.prices[fuelType] ?? Infinity;
      const bPrice = b.prices[fuelType] ?? Infinity;
      return aPrice - bPrice;
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100">
      {!hasSearched ? (
        <>
          <h1 className="flex items-center justify-center pt-8 font-bold text-4xl">
            Find the Cheapest Fuel Near You
          </h1>
          <h2 className="flex items-center justify-center pt-8 text-2xl text-gray-600">
            Compare fuel prices from stations in your area and save money on every fill-up
          </h2>
        </>
      ) : (
        <div className="text-center pt-6">
          <button
            onClick={() => setHasSearched(false)}
            className="text-blue-600 underline hover:text-blue-800"
          >
            🔙 Back to home
          </button>
        </div>
      )}

      <div className="flex items-center justify-center pt-10">
        <form onSubmit={handleSubmit} className="flex items-end gap-4">
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Enter postcode"
            className="border rounded h-12 px-4"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded h-12 px-4"
          >
            <option value="Nearest">Sort by Nearest</option>
            <option value="Cheapest">Sort by Cheapest</option>
          </select>
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="border rounded h-12 px-4"
          >
            <option value="E10">Petrol</option>
            <option value="E5">Premium Petrol</option>
            <option value="B7">Diesel</option>
            <option value="SDV">Super Diesel</option>
          </select>
          <button
            type="submit"
            className="bg-[#0e172b] text-amber-50 rounded px-6 py-3 cursor-pointer hover:bg-[#0e172b]"

          >
            Compare
          </button>
        </form>
      </div>
      {errorMsg && (
        <p className="text-red-500 font-medium mb-2 text-center">{errorMsg}</p>
      )}

      {hasSearched && (
        <div className="w-full px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 w-full max-w-5xl mx-auto">
            {sortedStations.map((station) => (
              <FuelCard key={station.site_id} station={station} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Compare
