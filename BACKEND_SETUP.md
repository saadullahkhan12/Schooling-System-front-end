# Backend Server Setup Instructions

## Problem
Your React frontend is showing "Network error. Please check your connection" because it's trying to connect to a backend server at `http://localhost:3001` that doesn't exist.

## Solution
I've created a simple Express.js backend server for you. Follow these steps to set it up:

## Step 1: Install Backend Dependencies

1. Open a new terminal/command prompt
2. Navigate to your project directory
3. Install the backend dependencies:

```bash
# Copy the server package.json
cp server-package.json package-backend.json

# Install backend dependencies
npm install express cors bcryptjs jsonwebtoken

# Install development dependency (optional, for auto-restart)
npm install --save-dev nodemon
```

## Step 2: Start the Backend Server

```bash
# Start the server
node server.js
```

You should see output like:
```
🚀 Server is running on http://localhost:3001
📊 Health check: http://localhost:3001/health
🔐 Auth endpoints:
   POST http://localhost:3001/auth/login
   POST http://localhost:3001/auth/register
   GET  http://localhost:3001/auth/me
```

## Step 3: Test the Backend

Open your browser and go to: `http://localhost:3001/health`

You should see: `{"status":"OK","message":"Server is running"}`

## Step 4: Test Your React App

1. Make sure your React app is running (`npm run dev`)
2. Try logging in with these credentials:
   - **Username:** `admin`
   - **Password:** `password`

## Default User Account

The server comes with a pre-configured admin account:
- **Username:** admin
- **Password:** password
- **Email:** admin@baselineacademy.com
- **Role:** admin

## API Endpoints

- `POST /auth/login` - Login with username/password
- `POST /auth/register` - Register new user
- `GET /auth/me` - Get current user info (requires token)
- `GET /health` - Health check

## Running Both Frontend and Backend

You'll need two terminals:

**Terminal 1 (Backend):**
```bash
node server.js
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

## Troubleshooting

1. **Port 3001 already in use:** Change the PORT in server.js to a different number (like 3002) and update the URL in your React components
2. **CORS errors:** The server is configured with CORS to allow your React app
3. **Still getting network errors:** Make sure both servers are running and check the browser console for specific error messages

## Next Steps

Once the backend is running, your login should work! You can then:
1. Register new users
2. Implement additional features
3. Connect to a real database (currently using in-memory storage)
4. Add more API endpoints for your school management features
