# app/routes/compare.py
from fastapi import APIRouter, Request, Query
from app.utils.geo import get_lat_lon
from app.price_filter import filter_nearby_10km  # you'll build this


router = APIRouter()


@router.get("/compare")
async def compare(postcode: str = Query(...), request: Request = None):
    lat, lon = get_lat_lon(postcode)
    stations = request.app.state.cached_data
    filtered = filter_nearby_10km(lat, lon, stations)
    return {"postcode": postcode, "lat": lat, "lon": lon, "stations": filtered}
