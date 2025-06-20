from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from app.services.fuel_service import fetch_all_prices
from app.routes.compare import router as compare_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://18.175.131.44",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(compare_router)
app.state.cached_data = []


def update_fuel_prices():
    import asyncio

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    data = loop.run_until_complete(fetch_all_prices())
    app.state.cached_data = data
    print("✅ Fuel prices updated")


scheduler = BackgroundScheduler()
scheduler.add_job(update_fuel_prices, "cron", hour=6)
scheduler.start()


@app.on_event("startup")
async def startup_event():
    print("🔄 First-time data fetch...")
    app.state.cached_data = await fetch_all_prices()


@app.get("/")
def root():
    return {"message": "Fuel comparison API is running"}
