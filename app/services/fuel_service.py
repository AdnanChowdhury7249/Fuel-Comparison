import aiohttp
import asyncio

urls = [
    "https://applegreenstores.com/fuel-prices/data.json",
    "https://fuelprices.asconagroup.co.uk/newfuel.json",
    "https://storelocator.asda.com/fuel_prices_data.json",
    "https://www.bp.com/en_gb/united-kingdom/home/fuelprices/fuel_prices_data.json",
    "https://fuelprices.esso.co.uk/latestdata.json",
    "https://jetlocal.co.uk/fuel_prices_data.json",
    "https://api2.krlmedia.com/integration/live_price/krl",
    "https://www.morrisons.com/fuel-prices/fuel.json",
    "https://moto-way.com/fuel-price/fuel_prices.json",
    "https://fuel.motorfuelgroup.com/fuel_prices_data.json",
    "https://www.rontec-servicestations.co.uk/fuel-prices/data/fuel_prices_data.json",
    "https://api.sainsburys.co.uk/v1/exports/latest/fuel_prices_data.json",
    "https://www.sgnretail.uk/files/data/SGN_daily_fuel_prices.json",
    "https://www.shell.co.uk/fuel-prices-data.html",
    "https://www.tesco.com/fuel_prices/fuel_prices_data.json",
]


async def fetch(session, url):
    try:
        async with session.get(url, timeout=10) as response:
            return await response.json()
    except:
        return {}


async def fetch_all_prices():
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        raw_results = await asyncio.gather(*tasks)

    all_stations = []

    for result in raw_results:
        if isinstance(result, dict):
            # Case: response is like {"stations": [...]}
            stations = result.get("stations")
            if isinstance(stations, list):
                all_stations.extend(stations)
        elif isinstance(result, list):
            # Case: response is already a list of stations
            all_stations.extend(result)

    return all_stations
