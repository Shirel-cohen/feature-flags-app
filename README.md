# ✅ Feature Flags Manager

A minimal full-stack service for managing feature flags for users.  
Built with **Node.js + Express**, **SQLite/JSON persistence**, and **React UI**.  
Includes CI/CD using GitHub Actions.

---

## 🚀 Features

✅ Enable/disable a feature globally or for a specific user  
✅ Simple API: `POST /api/flags` and `GET /api/flags`  
✅ Persistence using SQLite (`flags.db`)  
✅ React UI to toggle and check feature status  
✅ Automated CI: lint + tests + build + deploy

---

## 🗂 Project Structure

feature-flags-app/
│
├── src/
│ ├── server.js # Express server
│ ├── db.js # JSON / DB persistence
│ ├── routes/
│ │ └── flags.js # API endpoints
│
├── ui/ # React frontend
│
├── tests/ # Jest tests (API + util)
│
├── .github/workflows/ci.yml # CI/CD pipeline
├── package.json
├── README.md
├── flags.db /# SQLite database
└── .env.example


---

## 🧩 API

### ✅ POST `/api/flags`
Create or update a flag

**Body**
```json
{
  "feature": "darkMode",
  "userId": "123",     // optional
  "enabled": true
}
Response
{ "message": "Flag saved" }

### ✅ GET '/api/flags?feature=darkMode&userId=123'
Checks if a flag is enabled

Response
{
  "enabled": true,
  "reason": "user"   // "user" | "global" | "default"
}

🔧 Local Setup
1. Install dependencies
npm install
2. Start backend
node src/server.js
Backend runs at:
http://localhost:3000
3. Run tests
npm test
4. Run lint
npm run lint

🧪 Tests
Tests are located in /tests and include:
✅ API test for GET /api/flags
✅ API test for POST /api/flags


🔌 Persistence

SQLite database: /src/data/flags.db

Stores all feature flags with two tables:

Table Name	Columns	Description
global_flags	feature TEXT PRIMARY KEY, enabled BOOLEAN	Flags that apply to all users
user_flags	feature TEXT, userId TEXT, enabled BOOLEAN	Flags that apply to a specific user (override global)

Example Data:

Global flag:
| feature | enabled |
|-----------|---------|
| darkMode | true |

User-specific flag:
| feature | userId | enabled |
|-----------|--------|---------|
| darkMode | 123 | false |

Notes:

User-specific flags override global flags; if no flag exists, the default is false.

The backend reads/writes directly to flags.db


🚀 Deployment
This project is deployed using Render.

CI/CD workflow (.github/workflows/ci.yml) automatically runs when:
✅ Push to main
✅ Pull Request to main

Pipeline steps:
✔ Install deps
✔ Lint
✔ Tests
✔ Build
✔ Deploy (only on push to main)

Deployment triggered using:
curl -X POST "$RENDER_DEPLOY_HOOK"
🧰 Environment Variables
Create .env or use .env.example

PORT=3000
RENDER_DEPLOY_HOOK=your-deploy-hook


🤖 AI Notes
See AI_NOTES.md for prompts used and reflections.

✅ Public URL
▶ https://feature-flags-app.onrender.com



✅ Enjoy the Feature Flag Manager 🚀