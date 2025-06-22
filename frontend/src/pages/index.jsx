import { useState } from "react";
import { getCompare } from "../api";


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

  const fuelTypeDescriptions = {
    E10: "Petrol (up to 10% ethanol)",
    E5: "Premium Petrol (up to 5% ethanol)",
    B7: "Diesel (up to 7% biodiesel)",
    SDV: "Super Diesel Variant",
  };
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
      {result && (
        <div>
          <p>Postcode:{result.postcode}</p>
          <ul>
            {result.stations.map((station, i) => (
              <li key={i}>
                {station.brand} - {station.address} ({station.Distance_km.toFixed(2)} km)
                <ul>
                  {Object.entries(station.prices).map(([fuel, price]) => (
                    <li key={fuel}>{fuelTypeDescriptions[fuel] || fuel}: {price}p Per litre</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

        </div>
      )}

    </div>
  )
}

export default Compare
