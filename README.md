<p align="center">
  <img src="https://raw.githubusercontent.com/HinduPatrini/CineScope/main/client/src/assets/screenshot1.png" width="900" alt="CineScope Home" />
</p>

<h1 align="center">🎬 CineScope</h1>

<h3 align="center">A full-stack movie discovery web app to search, explore, track, and review your favourite films — all in one place.</h3>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<p align="center">
  <a href="https://cine-scope-eight-nu.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐 Live Demo-Click Here-red?style=for-the-badge" />
  </a>
  &nbsp;
  <a href="https://github.com/HinduPatrini/CineScope" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" />
  </a>
  &nbsp;
  <a href="https://www.linkedin.com/in/hindu-patrini-7ab07a37a" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin" />
  </a>
</p>

---

## 📸 Screenshots

<p align="center">
  <img src="https://raw.githubusercontent.com/HinduPatrini/CineScope/main/client/src/assets/screenshot1.png" width="880" alt="CineScope Spotlight" />
  <br/><br/>
  <img src="https://raw.githubusercontent.com/HinduPatrini/CineScope/main/client/src/assets/screenshot2.png" width="880" alt="CineScope Browse & Trending" />
  <br/><br/>
  <img src="https://raw.githubusercontent.com/HinduPatrini/CineScope/main/client/src/assets/screenshot3.png" width="880" alt="CineScope Search & Genres" />
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Movie Search** | Search by title, actor, or genre instantly |
| 🎥 **Watch Trailers** | Embedded YouTube trailers on movie pages |
| 🔥 **Trending Movies** | Discover what's popular right now |
| 🎭 **Genre Filter** | Browse by Action, Drama, Comedy, Horror & more |
| 📋 **Watchlist** | Save movies you want to watch later |
| ⭐ **Reviews & Ratings** | Write your own reviews and rate movies |
| 🔐 **Sign Up / Login** | Secure user authentication with JWT |
| 🎬 **Movie Details** | Full details — poster, rating, cast, plot, runtime |

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js + Tailwind CSS v3 |
| **Backend** | Node.js + Express.js + REST API |
| **Database** | MongoDB |
| **Authentication** | JWT (JSON Web Tokens) |
| **Movie Data** | OMDB API |
| **Version Control** | Git + GitHub |
| **Deployment** | Vercel |

---

## 🌐 Live Demo

## 🔗 [https://cine-scope-eight-nu.vercel.app/](https://cine-scope-eight-nu.vercel.app/)

---

## 📁 Folder Structure

```
CineScope/
├── assets/                   # Screenshots for README
├── client/                   # Frontend - React App
│   ├── public/
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── pages/            # Route-level pages
│       ├── hooks/            # Custom React hooks
│       └── utils/            # Helper functions
├── server/                   # Backend - Node/Express
│   ├── routes/               # API routes
│   ├── models/               # MongoDB schemas
│   ├── controllers/          # Business logic
│   └── middleware/           # Auth & error handling
├── .env.example
├── .gitignore
└── README.md
```

---

## 🛠️ How to Run This Project Locally

### ✅ Step 1 — Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) `v18+`
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)
- [Git](https://git-scm.com/)
- A free [OMDB API Key](https://www.omdbapi.com/apikey.aspx)

---

### 📥 Step 2 — Clone the Repository

```bash
git clone https://github.com/HinduPatrini/CineScope.git
cd CineScope
```

---

### 📦 Step 3 — Install Dependencies

**Install backend dependencies:**
```bash
cd server
npm install
```

**Install frontend dependencies:**
```bash
cd ../client
npm install
```

---

### 🔑 Step 4 — Setup Environment Variables

Create a `.env` file inside the `server/` folder:

```env
OMDB_API_KEY=your_omdb_api_key
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

> ⚠️ Never share or commit your `.env` file. It is already listed in `.gitignore`.

---

### ▶️ Step 5 — Run the App

**Start the backend server:**
```bash
cd server
npm run dev
```

**Start the frontend (in a new terminal):**
```bash
cd client
npm run dev
```

---

### 🌐 Step 6 — Open in Browser

```
http://localhost:3000
```

## 🎉 CineScope is now running locally on your machine!

---


## 🔗 Connect

<p align="center">
  <a href="https://www.linkedin.com/in/hindu-patrini-7ab07a37a">
    <img src="https://img.shields.io/badge/LinkedIn-hindu--patrini-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  &nbsp;
  <a href="https://github.com/HinduPatrini/CineScope">
    <img src="https://img.shields.io/badge/GitHub-HinduPatrini-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>

<h3 align="center">Made by <a href="https://www.linkedin.com/in/hindu-patrini-7ab07a37a">HinduPatrini</a></h3>
