# 🎮 GameHub – Fullstack Game Playground

**GameHub** is a fullstack web application that lets users register, log in, and play games like Blackjack while tracking their stats across sessions.

## 🧩 Tech Stack

### Frontend
- ⚛️ **React** (with TypeScript)
- 🧭 **TanStack Router** – file-based routing
- 💨 **Tailwind CSS** – responsive and mobile-first UI
- 🪝 **Custom AuthContext + Hooks** – for auth handling and persistent sessions
- 🧠 **State management** – via hooks and context
- 🌐 **REST API integration** – for user, login, and stats

### Backend (Java Spring Boot)
- ☕ **Spring Boot** (Java 21)
- 🧠 **In-memory "database"** – backed by `Map<UUID, User>`
- 🔐 **Validation** with `@Valid`, `@NotBlank`, and DTOs
---

## 📂 Project Structure

```bash
/
├── backend/                # Spring Boot backend (REST API)
│   ├── controller/
│   ├── model/
│   ├── repository/
│   ├── service/
│   └── util/
│
└── frontend/               # React frontend (Vite + TS)
    ├── components/         # Shared components like UI, Forms, etc.
    ├── context/            # AuthProvider with localStorage sync
    ├── hooks/              # useAuth hook
    ├── pages/              # Route-based page components
    ├── utils/              # API helpers, type definitions
    └── routeTree.gen.ts    # Auto-generated TanStack route tree
```

---

## 🔐 Authentication

- 👤 Users can register with a username and password.
- 🪪 Login persists in `localStorage`, restoring session on reload.
- 🧼 Password must:
  - Be at least 6 characters
  - Contain at least one letter and one number
- 🛡️ Authenticated routes: `/profile`, `/games/blackjack`, etc.

---

## 🃏 Game – Blackjack

- 🔄 Cards drawn using the [Deck of Cards API](https://deckofcardsapi.com/)
- 🎯 Game logic: hit, stand, bust, blackjack, dealer auto-play
- 🧠 Game status tracked with enum: `win`, `loss`, `tie`, `blackjack`
- 📊 Results are saved to backend via `PUT /api/users/{id}` as:
  ```json
  {
    "game": "blackjack",
    "outcome": "win"
  }
  ```

---

## 📈 Stats Tracking

- 🗂 Each user stores a `Map<String, GameStats>` like:
  ```json
  {
    "blackjack": {
      "wins": 3,
      "losses": 1,
      "ties": 0,
      "extraStats": {
        "blackjack": 1
      }
    }
  }
  ```
- 🧠 Game-specific logic (like Blackjack) is handled via a utility function in the backend.

---

## 🧪 Sample API Responses

### POST `/api/login?name=akamf&password=test123`
```json
{
  "id": "12b9a...",
  "name": "akamf"
}
```

### PUT `/api/users/{id}` (to update game stats)
```json
{
  "game": "blackjack",
  "outcome": "blackjack"
}
```

---

## 🔧 How to Run Locally

### 🖥 Backend

```bash
cd backend/
./mvnw spring-boot:run
```

### 🌐 Frontend

```bash
cd frontend/
npm install
npm run dev
```

### .env
Create a `.env` file in `/frontend`:
```env
VITE_API_URL=http://localhost:8080/api || PRODUCTION_URL
```

---

## 🧪 Demo Users

| Username | Password  | Notes                  |
|----------|-----------|------------------------|
| akamf    | test123   | Includes blackjack stats |
| user2    | s3cr37    | Empty game stats         |

---

## ✍️ Author

Made by [Andreas Kamf](https://github.com/akamf) – 2025  
