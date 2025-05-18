# Multiplayer Game Hub – Auth & Frontend Setup

This setup includes backend authentication and frontend integration for the Multiplayer Game Hub.

## 🔒 Backend (Node.js with Express)

### Files:

* `auth.js`: Contains register/login endpoints, JWT authentication, and user data functions.
* `server.js`: Express server with routes for `/auth`, `/me`, `/stats`, `/preferences`, etc.
* `db.js`: MySQL connection configuration (not shown here).

### Main Routes:

* `POST /auth/register` – User registration
* `POST /auth/login` – User login
* `GET /me` – Protected route to verify token and user ID
* `GET /stats` – Get user wins/losses
* `GET /ranking` – Top players by wins
* `GET /preferences` – Fetch matchmaking preferences
* `POST /preferences` – Update preferences

## 🌐 Frontend

### Files:

* `frontend.html`: The main interface for login, registration, and API actions.
* `auth.js`: Handles client-side logic (fetch requests, token storage, rendering output).

### Usage:

1. Open `frontend.html` in a browser.
2. Use the forms to register and log in.
3. Click buttons to interact with protected endpoints (uses JWT).

### Note:

Ensure the backend server is running at `http://localhost:3000`.

---

### 🚀 Future Improvements

* Form validation
* Error/success message UI
* Refresh token mechanism
* User profile page

---

