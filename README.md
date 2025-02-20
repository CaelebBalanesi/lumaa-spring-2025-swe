# Full-Stack Coding Challenge

A minimal Task Management application built with React + TypeScript (frontend), Node.js (backend using Express and pg), and PostgreSQL. This application supports user authentication (register & login) and CRUD operations for tasks. Basic dark styling is applied to the frontend.

## Table of Contents

- [Database Setup](#database%20setup)
- [Backend Setup](#backend%20setup)
- [Frontend Setup](#frontend%20setup)
- [Testing](#testing)
- [Notes](#notes)

## Database Setup

### Create the Database

- Open pgAdmin (or your preferred PostgreSQL client).
- Create a new database called `taskdb` (or another name if preferred).

### Run Migrations

Using pgAdmin’s Query Tool (or your preferred client), execute the following SQL to create the required tables:

```sql
-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Create tasks table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  "isComplete" BOOLEAN DEFAULT false,
  "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE
);
```

### Environment Variables

Create a .env file in the backend directory with the following content (adjust values as needed):

```dotenv
PORT=5000
DB_CONNECTION_STRING=postgres://your_db_username:your_db_password@localhost:5432/taskdb
JWT_SECRET=your_jwt_secret_here
BCRYPT_SALT_ROUNDS=10
CORS_ADDRESS=http://localhost:3000
```

Also, create a .env file in the frontend directory with:

```dotenv
REACT_APP_API_URL=http://localhost:5000
```

## Backend Setup

1. Navigate to the Backend Directory: `cd backend`
2. Install Dependencies: `npm install`
3. Run the Backend Server:
	- For development: `npm run dev`
	- Or to run compiled code: `npm run start`

The backend server will be running at http://localhost:5000.

## Frontend Setup

1. Navigate to the Frontend Directory: `cd frontend`
2. Install Dependencies: `npm install`
3. Run the Frontend Application: `npm start`

The frontend will start at http://localhost:3000 and communicate with the backend using the API URL defined in your .env file.

## Testing

### Manual Testing

- API Testing: Use Postman or a similar tool to test API endpoints:
	- Register: POST /auth/register
	- Login: POST /auth/login
	- Task Operations: Use the JWT from login in the Authorization header (Bearer \<token\>) when testing /tasks endpoints
- Frontend Testing: Use the application forms to register, log in, and manage tasks. Verify that:
	- Tasks are created, updated, and deleted correctly.
	- Unauthorized access is properly restricted.

### Notes

- Error Handling: Basic error handling is implemented in the controllers.