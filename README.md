# CuriousMuch.com - Q&A Platform

## 🚀 Quick Start

### 1. Start Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
Backend will run on: http://localhost:8080

### 2. Start Frontend (React)
```bash
cd frontend  
npm run dev
```
Frontend will run on: http://localhost:5173

### 3. Database Setup
- Install MySQL and create database: `curiousmuch_db`
- Update `backend/src/resources/application.properties` with your MySQL credentials
- Or use H2 database (uncomment H2 config in application.properties)

## 🎯 Features Implemented

### Backend APIs:
- ✅ User Registration/Login: `/api/auth/register`, `/api/auth/login`
- ✅ Questions CRUD: `/api/questions`
- ✅ Answers CRUD: `/api/questions/{id}/answers`
- ✅ Voting System: `/api/answers/{id}/vote`
- ✅ Search & Filter: `/api/questions/search?q=query`
- ✅ Categories: `/api/questions/category/{category}`

### Frontend Pages:
- ✅ Home Page with recent questions
- ✅ Questions listing with search/filter
- ✅ Question detail with answers & voting
- ✅ Ask question form
- ✅ Login/Register forms
- ✅ Responsive design with Tailwind CSS

## 🔧 Tech Stack
- **Backend**: Spring Boot, JPA/Hibernate, MySQL, JWT (ready)
- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Database**: MySQL (or H2 for testing)

## 📋 Next Steps
1. Test the application
2. Implement JWT authentication
3. Add image upload functionality
4. Deploy to production