# FAQ System Testing Guide

## Overview
The FAQ system is now fully dynamic and fetches data from the backend. Here's how to test and use it:

## Backend Setup

### 1. Add Sample FAQs to Database
To add sample FAQs for testing, you can use the provided script:

```bash
cd backend
node scripts/addSampleFAQs.js
```

**Note**: Update the `robotid` field in the script with actual robot IDs from your database.

### 2. API Endpoints
- **Get FAQs for specific robot**: `GET /frontend/api/faq/robot/:robotId`
- **Get all FAQs**: `GET /frontend/api/faq/list`
- **Create FAQ**: `POST /admin/api/faq`
- **Update FAQ**: `PUT /admin/api/faq/:id`
- **Delete FAQ**: `DELETE /admin/api/faq/:id`

## Frontend Testing

### 1. Product Detail Page
- Navigate to any robot product detail page
- Click on the "FAQs" tab
- The system will automatically fetch FAQs for that specific robot
- If no FAQs exist, it will show "No FAQs Available" message

### 2. Admin Management
- Use the `RobotFaqManagement` component in the admin panel
- Add, edit, or delete FAQs for specific robots
- All changes will be reflected immediately on the frontend

## Data Structure

### FAQ Model Fields:
- `title`: The question
- `description`: The answer
- `robotid`: Reference to the robot (ObjectId)
- `status`: Boolean (true = active, false = deleted)

### API Response Format:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "faq_id",
      "question": "What are the key features?",
      "answer": "This robot has...",
      "robotId": "robot_id"
    }
  ]
}
```

## Troubleshooting

### 1. No FAQs Showing
- Check if FAQs exist in database for the specific robot
- Verify the robot ID is correct
- Check browser console for API errors
- Ensure backend server is running

### 2. API Errors
- Check backend logs for detailed error messages
- Verify database connection
- Ensure FAQ model is properly defined

### 3. Admin Panel Issues
- Verify admin API endpoints are working
- Check if robots are loaded in the dropdown
- Ensure proper authentication if required

## Features

### Dynamic Loading
- FAQs are fetched based on the current robot's ID
- No hardcoded data - everything comes from the database
- Real-time updates when FAQs are added/edited/deleted

### Error Handling
- Graceful fallback when API fails
- Loading states during data fetching
- User-friendly error messages

### Responsive Design
- Clean accordion-style UI
- Mobile-friendly interface
- Smooth animations and transitions

## Next Steps
1. Add sample FAQs using the script
2. Test the frontend display
3. Use admin panel to manage FAQs
4. Customize FAQ content for each robot
