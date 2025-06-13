
# Backend Integration Guide for Data Analytics Dashboard

This document outlines all the areas where backend integration is needed. Each section includes the current frontend implementation and what the backend developer needs to implement.

## 🔐 Authentication System

### Current Frontend Implementation
- **Files**: `src/hooks/useAuth.tsx`, `src/pages/SignIn.tsx`, `src/pages/SignUp.tsx`
- **Current Status**: Mock authentication using localStorage
- **Search for**: `TODO: BACKEND INTEGRATION POINT` in authentication files

### Backend Requirements
1. **User Registration API**
   - Endpoint: `POST /api/auth/signup`
   - Input: `{ firstName, lastName, email, password }`
   - Output: `{ user, token }`

2. **User Login API**
   - Endpoint: `POST /api/auth/login`
   - Input: `{ email, password }`
   - Output: `{ user, token }`

3. **Token Validation**
   - Endpoint: `GET /api/auth/verify`
   - Headers: `Authorization: Bearer <token>`
   - Output: `{ user }`

### Frontend Integration Points
- Replace `login()` function in `useAuth.tsx` (line ~37)
- Replace `signup()` function in `useAuth.tsx` (line ~49)
- Add token-based authentication persistence

---

## 📊 CSV Data Processing

### Current Frontend Implementation
- **Files**: `src/components/CSVDataImporter.tsx`, `src/pages/Upload.tsx`
- **Current Status**: File upload UI ready, no backend processing

### Backend Requirements
1. **CSV Upload API**
   - Endpoint: `POST /api/data/upload`
   - Input: `multipart/form-data` with CSV file
   - Output: `{ fileId, status, rowCount }`

2. **Data Processing Pipeline**
   - Parse CSV data
   - Validate data format
   - Store in database
   - Generate initial analytics

3. **Processing Status API**
   - Endpoint: `GET /api/data/status/:fileId`
   - Output: `{ status, progress, errors }`

### Frontend Integration Points
- Connect file upload in `CSVDataImporter.tsx`
- Add real-time processing status updates
- Handle upload success/error states

---

## 📈 Analytics & Segmentation

### Current Frontend Implementation
- **Files**: `src/pages/Analytics.tsx`, `src/components/CustomerSegmentChart.tsx`
- **Current Status**: Using mock data (see `mockSegments` in Analytics.tsx)

### Backend Requirements
1. **Customer Segmentation API**
   - Endpoint: `GET /api/analytics/segments`
   - Output: Array of segment objects with:
     ```json
     {
       "id": number,
       "name": string,
       "description": string,
       "size": number,
       "percentage": number,
       "avgValue": number,
       "churnRisk": number,
       "growth": number,
       "color": string,
       "characteristics": string[],
       "aiInsight": string
     }
     ```

2. **Analytics Dashboard Data**
   - Endpoint: `GET /api/analytics/dashboard`
   - Output: Dashboard metrics and charts data

### Frontend Integration Points
- Replace `mockSegments` in `Analytics.tsx` and `Index.tsx`
- Connect chart components to real data APIs
- Add data loading states and error handling

---

## 🗄️ Data Management

### Current Frontend Implementation
- **Files**: `src/pages/DataManagement.tsx`
- **Current Status**: Mock file list display

### Backend Requirements
1. **File Management API**
   - `GET /api/data/files` - List uploaded files
   - `DELETE /api/data/files/:id` - Delete file
   - `GET /api/data/files/:id/download` - Download file
   - `GET /api/data/files/:id/preview` - Preview file data

2. **File Metadata Storage**
   - File name, size, upload date
   - Processing status and row count
   - Error logs if processing failed

### Frontend Integration Points
- Replace mock `uploadedFiles` array in `DataManagement.tsx`
- Implement file action buttons (view, download, delete)
- Add file status updates and error handling

---

## 🔮 AI-Powered Features

### Current Frontend Implementation
- **Files**: Various analytics components
- **Current Status**: Mock AI insights in segment data

### Backend Requirements
1. **AI Insights Generation**
   - Customer behavior analysis
   - Predictive analytics
   - Segment recommendations
   - Churn risk assessment

2. **Real-time Recommendations**
   - Marketing strategy suggestions
   - Customer retention tactics
   - Revenue optimization tips

### Frontend Integration Points
- Components in `src/components/` that show AI insights
- Real-time insight updates
- Confidence scores for AI predictions

---

## 🚀 API Integration Checklist

### For each API endpoint, implement:
- [ ] Input validation and sanitization
- [ ] Authentication middleware
- [ ] Error handling and logging
- [ ] Rate limiting
- [ ] Response caching where appropriate
- [ ] Database transactions for data consistency

### Database Schema Requirements:
- [ ] Users table (authentication)
- [ ] Files table (uploaded CSV metadata)
- [ ] Customer data tables (processed CSV data)
- [ ] Segments table (AI-generated segments)
- [ ] Analytics cache table (performance optimization)

### Security Considerations:
- [ ] JWT token management
- [ ] File upload validation (CSV only, size limits)
- [ ] User data privacy compliance
- [ ] API rate limiting
- [ ] Input sanitization for SQL injection prevention

---

## 🔧 Development Environment Setup

### Required Environment Variables:
```env
DATABASE_URL=
JWT_SECRET=
CORS_ORIGIN=http://localhost:5173
MAX_FILE_SIZE=10MB
AI_API_KEY= (if using external AI services)
```

### Recommended Tech Stack:
- **Database**: PostgreSQL with proper indexing for analytics
- **File Storage**: Cloud storage (AWS S3, Google Cloud Storage)
- **AI/ML**: Python backend service or external API integration
- **Caching**: Redis for analytics data caching

---

## 📞 Frontend-Backend Communication

### Current Frontend Assumptions:
- Base API URL configurable via environment
- RESTful API design
- JSON request/response format
- JWT token in Authorization header
- Proper HTTP status codes for error handling

### Error Handling:
The frontend expects standardized error responses:
```json
{
  "error": "Error message",
  "details": "Additional error details",
  "code": "ERROR_CODE"
}
```

---

## 🧪 Testing Integration Points

### To test backend integration:
1. Replace mock data with API calls one component at a time
2. Add loading states and error boundaries
3. Test with real CSV files of various sizes
4. Verify authentication flow completely
5. Test file upload progress and error scenarios

### Console Logging:
Look for `🔧 BACKEND TODO:` messages in browser console to identify all integration points that need backend implementation.
