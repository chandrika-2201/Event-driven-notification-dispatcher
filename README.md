# 🚀 Event-Driven Notification Dispatcher

A lightweight asynchronous notification system built using **Node.js**, **Express.js**, and **SQLite**.

This application demonstrates an event-driven architecture where business events are accepted immediately, stored in the database, queued for background processing, and processed asynchronously without blocking the API response.

---

## 📌 Project Overview

When a client triggers an event (for example, `order_placed`), the application:

1. Validates the incoming request.
2. Stores the event in the SQLite `events` table.
3. Creates a notification with **pending** status.
4. Pushes the notification into an in-memory queue.
5. Returns **HTTP 202 Accepted** immediately.
6. Processes the notification asynchronously in the background.
7. Updates the notification status to **completed** or **failed**.

This ensures the API remains responsive while notification processing happens independently.

---

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite
- **Database Package:** sqlite3
- **Queue:** Native JavaScript In-Memory Queue
- **Environment Variables:** dotenv

---

## 📂 Project Structure

```
Event-Driven-Notification-Dispatcher
│
├── src
│   ├── app.js
│   ├── server.js
│   │
│   ├── controllers
│   │   └── eventController.js
│   │
│   ├── services
│   │   ├── eventService.js
│   │   ├── notificationService.js
│   │   └── queueWorker.js
│   │
│   ├── db
│   │   ├── database.js
│   │   └── schema.sql
│   │
│   └── routes
│       └── eventRoutes.js
│
├── architecture-diagram.png
├── package.json
├── README.md
└── .env.example
```

---

## ⚙ Installation

### 1. Clone the repository

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/Event-Driven-Notification-Dispatcher.git

cd Event-Driven-Notification-Dispatcher
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Create Environment File

Create a file named `.env`

```env
PORT=3000
DATABASE_FILE=database.sqlite
```

---

### 4. Start the Server

Development Mode

```bash
npm run dev
```

Production Mode

```bash
npm start
```

---

## 🗄 Database

SQLite automatically creates

```
database.sqlite
```

on the first application startup.

The database contains two tables:

### events

| Column | Type |
|---------|------|
| id | INTEGER |
| event_type | TEXT |
| payload | TEXT |
| created_at | DATETIME |

---

### notifications

| Column | Type |
|---------|------|
| id | INTEGER |
| event_id | INTEGER |
| recipient | TEXT |
| channel | TEXT |
| status | TEXT |
| retry_count | INTEGER |
| created_at | DATETIME |
| updated_at | DATETIME |

---

## 📡 API Endpoint

### POST

```
/api/v1/events
```

---

### Sample Request

```json
{
  "event_type": "order_placed",
  "recipient": "user@example.com",
  "data": {
    "order_id": 101
  }
}
```

---

### Success Response

**HTTP 202 Accepted**

```json
{
  "message": "Event accepted for processing",
  "tracking_id": 1,
  "notification_id": 1,
  "status": "pending"
}
```

---

### Validation Error

**HTTP 400**

```json
{
  "error": "event_type and recipient are required"
}
```

---

### Internal Server Error

**HTTP 500**

```json
{
  "error": "Internal Server Error"
}
```

---

## ⚡ Background Queue Processing

The application uses an **in-memory queue** for asynchronous notification processing.

Workflow:

```
Client
   │
   ▼
POST /api/v1/events
   │
   ▼
Validate Request
   │
   ▼
Save Event
   │
   ▼
Create Notification (Pending)
   │
   ▼
Push Notification to Queue
   │
   ▼
Return HTTP 202 Accepted
───────────────────────────────
Background Worker
   │
   ▼
Process Queue
   │
   ▼
Simulate Notification (500–1000ms)
   │
   ▼
Update Status
```

---

## 🔄 Notification Processing

Each queued notification:

- Waits a random delay between **500–1000 ms**
- Has a **10% simulated failure rate**
- Updates notification status to:
  - `completed`
  - `failed`
- Increments `retry_count` on failure

---

## ✅ Features

- RESTful API
- Express.js architecture
- SQLite database integration
- Event-driven processing
- In-memory asynchronous queue
- Background worker
- Request validation
- Error handling
- HTTP 202 immediate response
- Automatic database initialization
- Clean modular architecture

---

## 🧪 Testing

The API can be tested using:

- Postman
- cURL
- Thunder Client

Example:

```bash
curl -X POST http://localhost:3000/api/v1/events \
-H "Content-Type: application/json" \
-d '{
  "event_type":"order_placed",
  "recipient":"user@example.com",
  "data":{
    "order_id":101
  }
}'
```

---

## 📖 Assumptions

- Notification channel is always **email**
- Queue is maintained in memory
- SQLite is used as the persistent database
- Notification sending is simulated using `setTimeout()`

---

## ⚠ Limitations

- Queue data is lost if the server restarts
- Notification sending is simulated
- No authentication or authorization
- No external messaging service (Redis, RabbitMQ, Kafka)

---

## 📷 Architecture Diagram

The repository includes:

```
architecture-diagram.png
```

showing the complete event-driven architecture and notification processing workflow.

---

## 👨‍💻 Author

**M.Siva Chandrika**

GitHub: https://github.com/<chandrika-2201>

---

## 📄 License

This project was developed as part of a backend engineering assessment and is intended for evaluation purposes.
