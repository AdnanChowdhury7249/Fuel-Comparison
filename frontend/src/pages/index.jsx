import { useState } from "react";
import { getCompare } from "../api";
import FuelCard from "../components/FuelCard";


function Compare() {
  const [postcode, setPostcode] = useState("")
  const [result, setResult] = useState(null)
  const [sortBy, setSortBy] = useState("Nearest")
  const [fuelType, setFuelType] = useState("E10");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getCompare(postcode)
      setResult(res.data)


    } catch (error) {
      console.error("Error fetching data", error)

    }
  }
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
    <div className="">
      <form onSubmit={handleSubmit}>
        <input type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Enter postcode"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded mb-4"
        >
          <option value="Nearest">Sort by Nearest</option>
          <option value="Cheapest">Sort by Cheapest (E10)</option>
        </select>
        <select
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          className="border p-2 rounded mb-4 ml-2"
        >
          <option value="E10">Petrol</option>
          <option value="E5">Premium Petrol</option>
          <option value="B7">Diesel</option>
          <option value="SDV">Super Diesel</option>
        </select>
        <button type="submit" className="hover:bg-gray-200 rounded p-1 cursor-pointer">Compare</button>
      </form>
      <div className="w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 w-full max-w-5xl mx-auto ">
          {sortedStations.map((station) => (
            <FuelCard key={station.site_id} station={station} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Compare
