# Backend Setup Instructions to Fix Slider API

## The Problem
Your frontend is getting a 404 error when trying to fetch slider data from `/frontend/api/slider`. This means the backend server is not running or not accessible.

## Solution Steps

### 1. Start the Backend Server
Open a new terminal/command prompt and navigate to the backend directory:

```bash
cd backend
```

### 2. Install Dependencies (if not already done)
```bash
npm install
```

### 3. Create Environment File
Create a `.env` file in the backend directory with your MongoDB connection:

```env
MONGODB_URL=your_mongodb_connection_string_here
PORT=5000
```

### 4. Start the Server
```bash
npm start
```

You should see output like:
```
Database Connected Successfully
Server is running at PORT 5000
```

### 5. Test the API
Once the backend is running, test the slider API endpoint:
- Open your browser and go to: `http://localhost:5000/frontend/api/slider`
- You should see JSON data with your slider information

### 6. Restart Frontend
After starting the backend, restart your frontend development server:
```bash
cd frontend
npm run dev
```

## What This Fixes
- ✅ Slider data will be fetched from your database
- ✅ Images, titles, and descriptions will be dynamic
- ✅ No more 404 errors
- ✅ Slider will work with your actual data

## Troubleshooting
If you still get errors:
1. Check that MongoDB is running and accessible
2. Verify the backend server is running on the correct port
3. Check the browser console for detailed error messages
4. Ensure your slider data exists in the database with `status: true`

## Current Status
- Frontend: ✅ Ready to connect to backend
- Backend: ⚠️ Needs to be started
- Database: ⚠️ Needs to be connected
- API Endpoint: ✅ Configured and ready

Once you follow these steps, your slider will automatically fetch data from the backend and display your database content!
