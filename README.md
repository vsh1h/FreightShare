# 🚛 FreightShare Platform

FreightShare is a logistics management platform that connects verified shippers and truck drivers to enable efficient freight matching, secure payments, and real-time tracking.
This repository contains the source code for the FreightShare MVP — built with a modern MERN-based architecture.

👨‍💻 Team Members
--
Vinayak Mohakud

Anirudh Panigrahi

Vanshika Shah

Bhavana Talkute

⚙️ Tech Stack
--
Layer	Technology	Purpose
Frontend	React.js, TailwindCSS	Interactive shipper & driver dashboards
Backend	Node.js (Express)	API and business logic
Database	MySQL + MongoDB	Structured and real-time data
Authentication	JWT / Firebase	Secure login & authorization
Maps/Tracking	Leaflet.js, OpenStreetMap	Live route and location tracking
Hosting	Vercel (Frontend), Render (Backend)	Deployment environment
Notifications	Firebase Cloud Messaging	Real-time alerts and updates
Storage	Cloudinary / Firebase Storage	File & document uploads

🏗️ Features
--
* Secure user authentication and role-based access (shipper, driver, admin)

* Freight posting and truck availability management

* Real-time messaging and live tracking

* Wallet and payment integration (UPI/online methods)

* SOS and support system for safety

🚀 Code Initiation
--
Follow these steps to get the FreightShare platform running locally:

### 1. Clone the repository
```
git clone https://github.com/vsh1h/FreightShare.git
cd freightshare-platform
```

### 2. Install dependencies

Install server and client dependencies:
```
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Start the development servers

Start backend and frontend apps:
```
# In backend/
npm run dev

# In frontend/ (new terminal)
npm start
```

Open `http://localhost:3000` to view the frontend application.

