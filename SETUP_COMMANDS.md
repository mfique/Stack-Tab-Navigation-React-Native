# Complete Setup Instructions - Signup & Login with SQLite

## 📋 Overview

You now have a complete authentication system with:
- ✅ Backend server (Node.js/Express)
- ✅ SQLite database
- ✅ Signup functionality
- ✅ Login functionality
- ✅ Password hashing with bcrypt
- ✅ Beautiful UI with toggle between Login/Signup

---

## 🚀 Commands to Run (Copy and Paste)

### **Terminal 1: Setup and Start Backend Server**

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

**Expected Output:**
```
✅ Connected to SQLite database
✅ Users table ready
🚀 Server running on http://localhost:3000
```

**Keep this terminal running! Don't close it.**

---

### **Terminal 2: Start Mobile App (In a NEW terminal)**

```bash
# Make sure you're in the root directory (mobile folder)
cd C:\Users\user\Documents\mobile

# Start Expo
npm start
```

This will open Expo in your browser. You can then:
- Press `w` to open in web browser
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

---

## 📱 Testing the App

### **Test Signup:**

1. Open your app (web browser or phone)
2. You should see the login screen
3. Click "Don't have an account? Sign up" at the bottom
4. Enter:
   - Username: `testuser`
   - Email: `test@test.com`
   - Password: `123456` (must be 6+ characters)
5. Click "Sign Up"
6. You should see "Success! Account created successfully!"

### **Test Login:**

1. Click "Already have an account? Sign in" at the bottom
2. Enter:
   - Username: `testuser`
   - Password: `123456`
3. Click "Sign in"
4. You should be redirected to the dashboard!

---

## 🔍 Verify Database

Open a browser and visit:
```
http://localhost:3000/api/users
```

You'll see all registered users in JSON format!

---

## 📝 Files Created/Modified

### **Backend Files:**
- `backend/server.js` - Express server with API endpoints
- `backend/database.js` - SQLite database connection and operations
- `backend/package.json` - Backend dependencies
- `backend/README.md` - Detailed API documentation
- `backend/GUIDE.md` - Quick setup guide

### **Frontend Files:**
- `app/login.tsx` - Updated with signup functionality

---

## 🌐 Important: API URL Configuration

### **Current Setup (Web/Simulator):**
The API URL in `app/login.tsx` is set to:
```typescript
const API_URL = "http://localhost:3000";
```

This works for:
- ✅ Web browser
- ✅ Android emulator
- ✅ iOS simulator

### **For Physical Device Testing:**

You need to update the API URL to your computer's IP address:

**Step 1: Find Your IP Address**

Open PowerShell and run:
```powershell
(Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike '*Loopback*' -and $_.IPAddress -notlike '169.254.*'}).IPAddress
```

Or simply:
```powershell
ipconfig
```
Look for "IPv4 Address" (usually starts with 192.168.x.x or 10.x.x.x)

**Step 2: Update login.tsx**

1. Open `app/login.tsx`
2. Find line 14: `const API_URL = "http://localhost:3000";`
3. Replace with:
   ```typescript
   const API_URL = "http://YOUR_IP_HERE:3000";
   ```
   Example: `const API_URL = "http://192.168.1.100:3000";`

**Step 3: Important Requirements**
- ✅ Your phone and computer must be on the SAME WiFi network
- ✅ Restart your Expo app after making the change
- ✅ Backend server must be running

---

## 🛠 Troubleshooting

### **"Could not connect to server" Error**

**Solutions:**
1. Make sure backend server is running (Terminal 1)
2. Check API_URL in login.tsx
3. For physical devices: ensure same WiFi network
4. Try accessing http://localhost:3000 in browser to test server

### **"Username already exists" Error**

This is normal! The username is already in the database. Either:
- Login with existing credentials
- Use a different username

### **"Password must be at least 6 characters"**

Use a password that's 6 characters or longer.

### **Database won't create**

Make sure you have write permissions in the backend folder.
The database file `users.db` will be created automatically.

### **npm install fails**

Make sure you have Node.js installed:
```bash
node --version
```

Should show v16 or higher. If not, install from https://nodejs.org/

---

## 📚 API Endpoints Available

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Create new user |
| POST | `/api/login` | Login user |
| GET | `/api/users` | Get all users (testing) |
| GET | `/` | Server status |

---

## 🎯 Next Steps

1. ✅ Backend server is running
2. ✅ Mobile app is running
3. ✅ Test signup and login
4. ✅ Verify users in database

**Optional Enhancements:**
- Add user session management
- Add JWT tokens for authentication
- Add email verification
- Add password reset functionality
- Style improvements
- Add form validation messages

---

## 📖 Documentation

- Full API docs: `backend/README.md`
- Quick guide: `backend/GUIDE.md`

---

## ✨ You're All Set!

Your authentication system is now complete. Users can signup and login, and all data is stored securely in SQLite with encrypted passwords!

