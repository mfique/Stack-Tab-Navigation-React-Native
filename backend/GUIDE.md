# Quick Setup Guide

## Step-by-Step Instructions

### 1. Install Backend Dependencies

Open a terminal and run:

```bash
cd backend
npm install
```

### 2. Start the Backend Server

```bash
npm start
```

You should see:
```
✅ Connected to SQLite database
✅ Users table ready
🚀 Server running on http://localhost:3000
```

Keep this terminal running!

### 3. Update API URL in Mobile App (IMPORTANT!)

**For Web/Simulator Testing:**
- Open `app/login.tsx`
- Line 14 should already say: `const API_URL = "http://localhost:3000";`
- This works for web and simulators

**For Physical Device Testing:**
1. Find your computer's IP address:

   **Windows PowerShell:**
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" under your active network adapter (usually something like `192.168.x.x`)

   **Or run this command:**
   ```powershell
   (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike '*Loopback*' -and $_.IPAddress -notlike '169.254.*'}).IPAddress
   ```

2. Open `app/login.tsx`
3. Change line 14 to your IP:
   ```typescript
   const API_URL = "http://YOUR_IP_ADDRESS:3000";
   ```
   Example: `const API_URL = "http://192.168.1.100:3000";`

4. Make sure your phone and computer are on the same WiFi network

### 4. Test the App

1. Start your Expo app:
   ```bash
   # From the root directory
   npm start
   ```

2. Tap "Don't have an account? Sign up"
3. Fill in:
   - Username: testuser
   - Email: test@test.com
   - Password: 123456

4. Click "Sign Up"

5. You should see "Success! Account created"

6. Now login with your credentials

## Verification

To verify users were created in the database, open another terminal and visit:
```
http://localhost:3000/api/users
```

You should see your registered users in JSON format.

## Troubleshooting

**"Could not connect to server" error:**
- Make sure backend server is running (`npm start` in backend folder)
- Check the API_URL is correct in login.tsx
- For physical devices, ensure same WiFi network
- Try disabling firewall temporarily to test

**"Username already exists" error:**
- This user is already in the database
- Try a different username or login instead

**"Password must be at least 6 characters" error:**
- Use a password that's 6 characters or longer

## Need Help?

- Check backend/README.md for detailed API documentation
- Verify server is running by visiting http://localhost:3000 in a browser

