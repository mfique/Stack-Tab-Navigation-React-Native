# Backend Server for Mobile App

This is a Node.js/Express server with SQLite database for user authentication.

## Features

- ✅ SQLite database for data persistence
- ✅ User registration (signup) with validation
- ✅ User login with password hashing (bcrypt)
- ✅ REST API endpoints
- ✅ CORS enabled for mobile app communication

## Installation & Setup

### Step 1: Install Dependencies

Navigate to the backend directory and install npm packages:

```bash
cd backend
npm install
```

### Step 2: Start the Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run ultra
```

The server will start on `http://localhost:3000`

## API Endpoints

### 1. GET / - Health Check
Returns server status and available endpoints.

### 2. POST /api/register - Sign Up
Create a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400` - Username or email already exists, or validation error
- `500` - Server error

### 3. POST /api/login - Login
Authenticate a user.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400` - Missing fields
- `401` - Invalid credentials
- `500` - Server error

### 4. GET /api/users - Get All Users (Testing)
Returns all registered users (excluding passwords).

## Database

The SQLite database (`users.db`) is automatically created in the backend directory on first run.

**Users Table Schema:**
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Security Features

- ✅ Passwords are hashed using bcrypt (10 salt rounds)
- ✅ SQL injection protection via parameterized queries
- ✅ Input validation on all endpoints
- ✅ Unique constraints on username and email

## Testing the API

You can test the API using curl or any HTTP client:

```bash
# Test registration
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"123456"}'

# Test login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"123456"}'

# Get all users
curl http://localhost:3000/api/users
```

## Mobile App Connection

**Important:** For testing on a physical device or emulator, you need to update the `API_URL` in your mobile app:

1. **For Android Emulator**: Use `http://10.0.2.2:3000`
2. **For iOS Simulator**: Use `http://localhost:3000`
3. **For Physical Device**: 
   - Find your computer's local IP address:
     - Windows: Run `ipconfig` in terminal
     - Mac/Linux: Run `ifconfig` in terminal
   - Use `http://YOUR_IP_ADDRESS:3000`
   - Make sure your phone and computer are on the same WiFi network

## Troubleshooting

**Database locked error:**
- Stop the server and restart it
- Make sure no other process is using the database

**Connection refused:**
- Make sure the server is running on port 3000
- Check firewall settings
- Verify the IP address/URL in your mobile app

