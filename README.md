# 🌱 Organic Harvest India Marketplace

A full-stack organic products marketplace built with React, Vite, Node.js, and Express. The platform allows users to browse organic products, explore categories, and subscribe to newsletters through a modern and responsive interface.

## 🚀 Features

- Browse organic products
- Product categories
- Responsive user interface
- Newsletter subscription
- REST API integration
- Product ratings and reviews
- Fast frontend using Vite
- Express.js backend API

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- CORS

## 📂 Project Structure

```text
organic_harvest_india_marketplace/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── routes/
│   ├── data/
│   ├── package.json
│   └── index.js
│
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/DakshRana1/organic-harvest-india-marketplace
cd organic-harvest-india-marketplace
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

### Backend Setup

```bash
cd server
npm install
npm start
```

Backend runs at:

```text
http://localhost:5000
```

The backend exposes API endpoints for products, categories, newsletters, and health checks. :contentReference[oaicite:0]{index=0}

## 🔌 API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /api/products | Fetch all products |
| GET | /api/categories | Fetch categories |
| POST | /api/newsletter | Subscribe to newsletter |
| GET | /api/health | Health check |

## 📦 Sample Products

The marketplace contains organic vegetables, fruits, dairy products, and pantry items with ratings, reviews, pricing, and stock availability. :contentReference[oaicite:1]{index=1}

## 🎯 Future Enhancements

- User Authentication
- Shopping Cart
- Payment Gateway Integration
- Order Tracking
- Admin Dashboard
- Product Search & Filters

## 👨‍💻 Author

Daksh Rana

GitHub: https://github.com/DakshRana1
Host Link: https://adorable-starburst-11f35c.netlify.app

## 📜 License

This project is licensed under the MIT License.
