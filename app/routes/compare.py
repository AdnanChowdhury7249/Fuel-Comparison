# app/routes/compare.py
from fastapi import APIRouter, Request, Query
from app.utils.geo import get_lat_lon
from app.price_filter import filter_nearby_5km
from fastapi import HTTPException


router = APIRouter()


@router.get("/compare")
async def compare(postcode: str = Query(...), request: Request = None):
    if not postcode.strip():
        raise HTTPException(status_code=400, detail="Postcode required")
    lat, lon = get_lat_lon(postcode)
    stations = request.app.state.cached_data
    filtered = filter_nearby_5km(lat, lon, stations)
    return {"postcode": postcode, "lat": lat, "lon": lon, "stations": filtered}
