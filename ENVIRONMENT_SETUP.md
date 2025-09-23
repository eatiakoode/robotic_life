# Environment Setup for FAQ System

## Issue
The FAQ system is not fetching data because the environment variable `NEXT_PUBLIC_BACKEND_API_URL` is undefined.

## Solution

### Option 1: Create Environment File (Recommended)
Create a file named `.env.local` in the `frontend` directory with the following content:

```bash
# Backend API URL
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000/
```

**Note**: Replace `5000` with the actual port your backend server is running on.

### Option 2: Check Backend Port
To find out what port your backend is running on:

1. Start your backend server
2. Look for the console message: `Server is running at PORT XXXX`
3. Use that port number in the environment variable

### Option 3: Common Backend Ports
Try these common ports if you're unsure:
- `http://localhost:3000/`
- `http://localhost:5000/`
- `http://localhost:8000/`

## How to Create the Environment File

1. Navigate to the `frontend` directory
2. Create a new file named `.env.local`
3. Add the content from Option 1 above
4. Restart your frontend development server

## Verification
After setting up the environment variable:

1. Open browser developer tools (F12)
2. Go to the Console tab
3. Navigate to a product detail page and click the FAQs tab
4. Check the console logs - you should see:
   - `Environment variable NEXT_PUBLIC_BACKEND_API_URL: http://localhost:5000/`
   - `Using base URL: http://localhost:5000/`
   - `FAQ API URL: http://localhost:5000/frontend/api/faq/robot/[robot-id]`

## Troubleshooting
- If you still get 404 errors, verify your backend server is running
- Check that the FAQ API endpoint is accessible: `http://localhost:5000/frontend/api/faq/robot/[robot-id]`
- Ensure your backend has the FAQ routes properly configured
