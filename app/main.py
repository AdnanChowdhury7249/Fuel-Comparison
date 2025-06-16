# app/main.py
from fastapi import FastAPI
from apscheduler.schedulers.background import BackgroundScheduler
from app.services.fuel_service import fetch_all_prices
from app.routes import compare


app = FastAPI()
app.include_router(compare.router)

# Global in-memory cache
app.state.cached_data = []


# Background task to update cache
def update_fuel_prices():
    import asyncio

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    data = loop.run_until_complete(fetch_all_prices())
    app.state.cached_data = data
    print(" Fuel prices updated")


# Start scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(update_fuel_prices, "cron", hour=6)  # runs daily at 6AM
scheduler.start()


# Run once on startup
@app.on_event("startup")
async def startup_event():
    print("🔄 First-time data fetch...")
    app.state.cached_data = await fetch_all_prices()


@app.get("/")
def root():
    return {"message": "Fuel comparison API is running"}
