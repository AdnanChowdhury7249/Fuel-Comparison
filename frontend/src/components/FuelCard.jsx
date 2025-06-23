

const FuelCard = ({ station }) => {
  const fuelTypeDescriptions = {
    E10: "Petrol",
    E5: "Premium Petrol",
    B7: "Diesel",
    SDV: "Super Diesel",
  };

  return (
    <div
      key={station.site_id}
      className="border rounded-3xl shadow border-gray-200 bg-white pl-5 px-3 py-3"
    >
      <h2 className="text-lg font-bold">{station.brand}</h2>
      <p className="text-sm text-gray-600" >{station.address}</p>
      <p className="text-sm">Distance: {station.Distance_km.toFixed(2)} km</p>
      <ul className="mt-2">
        {Object.entries(station.prices).map(([fuel, price]) => (
          <li key={fuel}>{fuelTypeDescriptions[fuel] || fuel}: {price}p Per litre</li>
        ))}
      </ul>
    </div>
  )

}


export default FuelCard;
