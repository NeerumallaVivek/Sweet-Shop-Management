# 🚀 Quick Start Guide - Frontend & Backend Integration

## ✅ What's Been Done

### Backend (Spring Boot)
- ✅ Database configured to use `sweetbase`
- ✅ All endpoints ready at `http://localhost:8080/api/auth`
- ✅ CORS enabled for React frontend
- ✅ JWT authentication configured

### Frontend (React)
- ✅ Auth service created (`authService.js`)
- ✅ AuthScreen integrated with backend API
- ✅ Axios installed
- ✅ Error and success message handling
- ✅ Loading states added

## 🔧 How to Run

### 1. Start MySQL Database
Make sure MySQL is running and accessible with:
- **Host**: localhost:3306
- **Username**: root
- **Password**: Vivek123
- **Database**: sweetbase (will be auto-created)

### 2. Start Backend (Spring Boot)
```bash
cd Sweetbase
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend is Already Running
Your React app is already running on `http://localhost:5173`

## 📝 How Sign Up Works Now

### Sign Up Flow:
1. User fills in the form (Username, Email, Password)
2. Selects role (User or Admin)
3. Clicks "Register"
4. **Frontend** calls backend API:
   - For User: `POST http://localhost:8080/api/auth/register/user`
   - For Admin: `POST http://localhost:8080/api/auth/register/admin`
5. **Backend** receives the request:
   - Validates the input
   - Encrypts password with BCrypt
   - Saves to MySQL database (`users` or `admins` table)
   - Returns success/error message
6. **Frontend** displays:
   - Success message → Auto-switches to Sign In tab
   - Error message → Shows error (e.g., "Email already exists")

### Sign In Flow:
1. User fills in email and password
2. Selects role (User or Admin)
3. Clicks "Sign In"
4. **Frontend** calls backend API:
   - For User: `POST http://localhost:8080/api/auth/login/user`
   - For Admin: `POST http://localhost:8080/api/auth/login/admin`
5. **Backend** verifies credentials and returns JWT token
6. **Frontend** stores token in localStorage and navigates to dashboard

## 🗄️ Database Tables

When you register, data is saved in MySQL:

### For User Registration:
```sql
INSERT INTO users (user_name, user_email, user_password)
VALUES ('John', 'john@example.com', '$2a$10$encrypted_password_hash...');
```

### For Admin Registration:
```sql
INSERT INTO admins (admin_name, admin_email, admin_password)
VALUES ('Admin', 'admin@example.com', '$2a$10$encrypted_password_hash...');
```

## 🧪 Testing Steps

### Test Sign Up:
1. Open `http://localhost:5173`
2. Click "Sign Up" tab
3. Select role: User
4. Fill in:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
5. Click "Register"
6. You should see: "Registration successful! Please login."
7. Form auto-switches to Sign In

### Verify in Database:
```sql
USE sweetbase;
SELECT * FROM users;
```

You should see your registered user with encrypted password!

### Test Sign In:
1. Use the same credentials
2. Click "Sign In"
3. You should be logged in and redirected to dashboard

## 🔍 Troubleshooting

### Backend Issues:

**"Unable to connect to database"**
- Make sure MySQL is running
- Check credentials in `application.properties`

**"Port 8080 already in use"**
- Stop other applications using port 8080
- Or change port in `application.properties`

### Frontend Issues:

**"Network Error"**
- Make sure backend is running on port 8080
- Check browser console for CORS errors

**"Registration failed"**
- Check backend console for errors
- Verify database connection
- Check if email already exists

## 📂 File Locations

### Backend:
- Database config: `Sweetbase/src/main/resources/application.properties`
- Auth endpoints: `Sweetbase/src/main/java/com/sweetshop/auth/controller/AuthController.java`

### Frontend:
- Auth service: `Frontend/src/services/authService.js`
- Sign up form: `Frontend/src/components/AuthScreen.jsx`

## 🎯 What Happens Next

After successful sign in:
- JWT token is stored in localStorage
- User data is saved in app state
- User is redirected to dashboard
- All subsequent API calls include the JWT token

---

**Everything is connected! Just start the backend and test it out! 🎉**
