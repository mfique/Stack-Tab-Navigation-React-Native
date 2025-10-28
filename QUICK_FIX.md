# Quick Fix Applied ✅

## What I Changed

Updated `app/login.tsx` line 14:
- **Before:** `const API_URL = "http://localhost:3000";`
- **After:** `const API_URL = "http://10.12.75.73:3000";`

## Next Step - Reload Your App

**In the Expo terminal, press `r` to reload the app.**

Or:
- Shake your device and tap "Reload"
- Close and reopen the app

## Now Try Again

1. Click "Don't have an account? Sign up"
2. Enter your details
3. Click "Sign Up"

It should work now! 🎉

## If You Still Get the Error

Make sure:
- ✅ Backend server is running (Terminal 1 - you should see "🚀 Server running on http://localhost:3000")
- ✅ You pressed `r` to reload after the change
- ✅ Your device/emulator and computer are on the same WiFi network

## How to Find Your IP if It Changes

If your IP address changes in the future, run this in PowerShell:

```powershell
(Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike '*Loopback*' -and $_.IPAddress -notlike '169.254.*'}).IPAddress
```

Then update `app/login.tsx` with the new IP.

