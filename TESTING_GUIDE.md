# 🚀 Testing Frontend → Backend → Database Connection

## ✅ Current Status

### Frontend
- **Status**: ✅ Running
- **URL**: http://localhost:5173
- **Port**: 5173 (Vite React app)

### Backend
- **Status**: Starting...
- **URL**: http://localhost:8080
- **Port**: 8080 (Spring Boot)
- **CORS**: ✅ Configured for localhost:5173

### Database
- **Name**: sweetbase
- **Host**: localhost:3306
- **Status**: Should be running

---

## 🧪 How to Test the Complete Flow

### Step 1: Verify Backend is Running

After backend starts, you should see:
```
============================================================
Sweet Shop Authentication Service Started Successfully!
Server running on: http://localhost:8080
API Base URL: http://localhost:8080/api/auth
============================================================
```

### Step 2: Open Frontend in Browser

1. Open your browser
2. Navigate to: **http://localhost:5173**
3. You should see the Sweet Shop login/signup page

### Step 3: Test Sign Up (Frontend → Backend → Database)

1. Click **"Sign Up"** tab
2. Select role: **"User"**
3. Fill in the form:
   - **Username**: `john`
   - **Email**: `john@example.com`
   - **Password**: `password123`
4. Click **"Register"**

**What happens:**
```
Frontend (localhost:5173)
    ↓ HTTP POST Request
    ↓ { name: "john", email: "john@example.com", password: "password123", role: "user" }
    ↓
Backend (localhost:8080/api/auth/register/user)
    ↓ Validates input
    ↓ Encrypts password with BCrypt
    ↓ INSERT INTO users...
    ↓
MySQL Database (localhost:3306/sweetbase)
    ✅ Data saved in 'users' table
    ↓
Backend sends response
    ↓ { message: "User registered successfully!" }
    ↓
Frontend shows success message
    ✅ Auto-switches to Sign In tab
```

### Step 4: Verify in Database

Open MySQL Workbench or command line:
```sql
USE sweetbase;
SELECT * FROM users;
```

You should see:
```
+------+---------+--------------------+------------------------------------------------------+
| user_id | user_name | user_email      | user_password                                        |
+---------+-----------+-----------------+------------------------------------------------------+
| 1       | john      | john@example.com | $2a$10$hashed_password_here...                         |
+---------+-----------+-----------------+------------------------------------------------------+
```

### Step 5: Test Sign In

1. Use the same credentials
2. Click **"Sign In"**

**What happens:**
```
Frontend
    ↓ HTTP POST to /api/auth/login/user
    ↓
Backend
    ↓ Finds user in database
    ↓ Verifies BCrypt password
    ↓ Generates JWT token
    ↓
Frontend receives
    ✅ { token: "eyJhbG...", role: "ROLE_USER", email: "john@example.com", name: "john", id: 1 }
    ✅ Stores in localStorage
    ✅ Redirects to dashboard
```

---

## 🔍 Check CORS is Working

### In Browser DevTools (F12):

1. Open browser **Console** tab
2. After clicking "Register", check **Network** tab
3. Look for the request to `localhost:8080/api/auth/register/user`
4. Check **Response Headers** - should include:
   ```
   Access-Control-Allow-Origin: http://localhost:5173
   Access-Control-Allow-Credentials: true
   ```

If you see these headers, **CORS is working perfectly!** ✅

---

## ❌ Troubleshooting

### "Network Error" in Frontend

**Cause**: Backend not running
**Fix**: Start backend with `mvn spring-boot:run`

### "CORS Error" in Console

**Cause**: Backend CORS not configured
**Status**: ✅ Already configured in SecurityConfig.java

### "Cannot connect to database"

**Cause**: MySQL not running
**Fix**: 
```bash
# Check MySQL status
mysql -u root -p
# Enter password: Vivek123
```

### "Email already exists"

**Cause**: User already registered
**Fix**: Use different email OR delete from database:
```sql
USE sweetbase;
DELETE FROM users WHERE user_email = 'john@example.com';
```

---

## 🎯 Expected Results

After successful signup:
- ✅ Frontend shows green success message
- ✅ Backend logs the registration
- ✅ Database has new record with encrypted password
- ✅ Frontend auto-switches to Sign In tab

After successful login:
- ✅ Frontend receives JWT token
- ✅ Token stored in localStorage
- ✅ User data available in app
- ✅ Redirected to dashboard

---

## 📊 Data Flow Diagram

```
┌─────────────────┐
│   Browser       │
│ localhost:5173  │
│  (React App)    │
└────────┬────────┘
         │ 1. User fills signup form
         │ 2. Click "Register"
         ↓
    HTTP POST
    /api/auth/register/user
    { name, email, password, role }
         │
         ↓
┌────────────────────┐
│  Spring Boot       │
│  localhost:8080    │
│  (Backend API)     │
├────────────────────┤
│ 1. CORS allows     │
│    request from    │
│    localhost:5173  │
│ 2. Validates data  │
│ 3. Encrypts pwd    │
│ 4. Saves to DB     │
└────────┬───────────┘
         │
         ↓
    SQL INSERT
    INTO users...
         │
         ↓
┌────────────────────┐
│   MySQL Database   │
│  localhost:3306    │
│  sweetbase         │
├────────────────────┤
│ users table:       │
│ - user_id          │
│ - user_name        │
│ - user_email       │
│ - user_password    │
└────────────────────┘
```

---

## ✅ Quick Checklist

Before testing:
- [ ] MySQL running
- [ ] Backend running (port 8080)
- [ ] Frontend running (port 5173)
- [ ] Browser open to http://localhost:5173

Testing:
- [ ] Sign up with new email
- [ ] Check success message appears
- [ ] Verify in MySQL database
- [ ] Sign in with same credentials
- [ ] Check JWT token received

---

**Everything is configured! Just start the backend and test it out!** 🎉
