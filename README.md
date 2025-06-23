#  Fuel Comparison App

A full-stack web application that allows users to compare nearby fuel prices by entering a UK postcode. The app fetches fuel prices from multiple providers and displays stations within 10km, sorted by proximity or fuel cost.

##  Live Demo

Coming soon...

---

##  Tech Stack

### Frontend:
- **React** (with Vite)
- **Tailwind CSS** for styling
- **Axios** for API requests

### Backend:
- **FastAPI** (Python)
- **pgeocode** to convert postcode to latitude/longitude
- **Custom filtering** logic to find stations within 10km
- **Crontask** runs daily at 6AM to fetch latest fuel prices

### Hosting & Deployment:
- **Frontend**: Hosted on **Nginx** via **EC2 (AWS)**
- **Backend**: FastAPI running on **EC2 (AWS)**
- **CI/CD**: GitHub Actions deploys backend via SSH to EC2

---

## 🧪 Features

-  Search fuel stations by postcode
-  View stations within 10km
-  Sort by:
  - Nearest
  - Cheapest (E10, E5, B7, SDV)
-  Friendly fuel descriptions (e.g., "E10 → Petrol")
-  Private backend (not exposed publicly)

---

## Setup Instructions

### Prerequisites

- Node.js
- Python 3.10+
- pip & virtualenv

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
