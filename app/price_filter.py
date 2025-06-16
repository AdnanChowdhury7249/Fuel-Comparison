from geopy.distance import distance


def filter_nearby_10km(lat, lon, stations, radius_km=10):
    filtered = []

    for station in stations:
        if not isinstance(station, dict):
            continue

        location = station.get("location", {})
        station_lat = station.get("latitude") or location.get("latitude")
        station_lon = station.get("longitude") or location.get("longitude")

        if station_lat and station_lon:
            dist = distance((lat, lon), (station_lat, station_lon)).km
            if dist <= radius_km:
                station["Distance_km"] = round(dist, 2)
                filtered.append(station)

    return filtered
