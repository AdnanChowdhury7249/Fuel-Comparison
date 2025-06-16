import pgeocode


def get_lat_lon(postcode: str):
    nomi = pgeocode.Nominatim("GB")
    location = nomi.query_postal_code(postcode)
    return location.latitude, location.longitude
