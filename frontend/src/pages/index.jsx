import { useState } from "react";
import { getCompare } from "../api";
import FuelCard from "../components/FuelCard";


function Compare() {
  const [postcode, setPostcode] = useState("")
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getCompare(postcode)
      setResult(res.data)


    } catch (error) {
      console.error("Error fetching data", error)

    }
  }
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Enter postcode"
        />
        <button type="submit">Compare</button>
      </form>
      <div className="w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 w-full max-w-5xl mx-auto ">
          {result && result.stations.map((station) => (
            <FuelCard key={station.site_id} station={station} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Compare
