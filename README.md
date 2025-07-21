# ServiceHub - Full-Stack Service Management Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![React](https://img.shields.io/badge/React-v18+-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-v6+-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-v5+-lightgrey.svg)

<!-- Add deployment badges once services are linked -->
<!-- [![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys) -->
<!-- [![Render Deploy](https://img.shields.io/badge/Render-Deploy-success)](https://your-render-app.onrender.com) -->

## Project Description

ServiceHub is a comprehensive full-stack service management platform built with modern web technologies. The application features a **MERN stack architecture** (MongoDB, Express.js, React, Node.js) with a **multi-frontend setup** supporting both user-facing and administrative interfaces.

### Architecture Overview

- **Backend**: RESTful API server built with Express.js and Node.js
- **Database**: MongoDB with Mongoose ODM for data modeling
- **Frontend (User)**: React 19 application with Vite build tool
- **Frontend (Admin)**: React 18 application with administrative dashboard
- **Authentication**: JWT-based authentication with HTTP-only cookies
- **File Storage**: Cloudinary integration for image and video uploads
- **Email Services**: Nodemailer with Gmail integration for OTP verification
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Context API for global state

### Key Technologies

- **Backend Stack**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend Stack**: React, Vite, Tailwind CSS, Framer Motion
- **Authentication**: JWT, bcrypt, cookie-based sessions
- **File Upload**: Multer, Cloudinary
- **Email**: Nodemailer, Gmail SMTP
- **API**: RESTful architecture with proper error handling
- **Development**: ESLint, Nodemon for hot reloading

## Installation & Setup Instructions

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (v6 or higher) - Local installation or MongoDB Atlas
- **npm** or **yarn** package manager
- **Cloudinary Account** (for file uploads)
- **Gmail Account** (for email services)

### 1. Clone the Repository

```bash
git clone https://github.com/curiousbud/Roshan_ServiceHub.git
cd Roshan_ServiceHub
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/servicehub
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/servicehub

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration (Gmail)
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

### 3. User Frontend Setup

```bash
cd ../servicehub-frontend
npm install
```

Create a `.env` file in the servicehub-frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Admin Frontend Setup

```bash
cd ../Admin-frontend
npm install
```

Create a `.env` file in the Admin-frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Database Setup

- **Local MongoDB**: Ensure MongoDB is running on your system
- **MongoDB Atlas**: Use the connection string from your Atlas dashboard

## Local Development Guide

### Quick Start (All Services)

For developers who want to run the entire application locally, follow these steps:

#### 1. Install Dependencies for All Services

```bash
# Install backend dependencies
cd Backend
npm install

# Install user frontend dependencies
cd ../servicehub-frontend
npm install

# Install admin frontend dependencies
cd ../Admin-frontend
npm install

# Return to root directory
cd ..
```

#### 2. Setup Environment Variables

Create the required `.env` files as described in the installation section above.

#### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service (Windows)
net start MongoDB

# Start MongoDB service (macOS/Linux)
sudo systemctl start mongod
# OR
brew services start mongodb-community
```

**Option B: Use MongoDB Atlas**
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Get your connection string and use it in the `MONGO_URI` environment variable

#### 4. Start All Services in Development Mode

Open **3 separate terminals** and run:

**Terminal 1 - Backend:**
```bash
cd Backend
npm run dev
```
✅ Backend will start on `http://localhost:5000`

**Terminal 2 - User Frontend:**
```bash
cd servicehub-frontend
npm run dev
```
✅ User app will start on `http://localhost:5173`

**Terminal 3 - Admin Frontend:**
```bash
cd Admin-frontend
npm run dev
```
✅ Admin app will start on `http://localhost:5174`

#### 5. Verify Setup

- **Backend API**: Visit `http://localhost:5000/api/auth/test` (should return "Test route working")
- **User Frontend**: Visit `http://localhost:5173` (should load the user interface)
- **Admin Frontend**: Visit `http://localhost:5174` (should load the admin dashboard)

### Development Workflow

#### Hot Reloading
All services support hot reloading:
- **Backend**: Uses `nodemon` for automatic server restart on file changes
- **Frontend**: Uses Vite's HMR (Hot Module Replacement) for instant updates

#### Code Linting
```bash
# Run ESLint on frontend projects
cd servicehub-frontend && npm run lint
cd Admin-frontend && npm run lint
```

#### Database Management
```bash
# Connect to local MongoDB
mongosh

# View databases
show dbs

# Use servicehub database
use servicehub

# View collections
show collections
```

### Troubleshooting Common Issues

#### Port Conflicts
If ports are already in use, you can change them:
- **Backend**: Change `PORT` in `.env` file
- **Frontend**: Vite will automatically find available ports or you can specify in `vite.config.js`

#### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh --eval "db.runCommand({connectionStatus: 1})"

# For Atlas: Test connection string
mongosh "your_atlas_connection_string"
```

#### Environment Variables Not Loading
- Ensure `.env` files are in the correct directories
- Restart the development servers after changing environment variables
- Check for typos in variable names (case-sensitive)

#### CORS Issues
- Ensure frontend URLs are added to CORS configuration in `Backend/server.js`
- Check that `withCredentials: true` is set in frontend axios configuration

## Usage Instructions

### Development Environment

#### 1. Start the Backend Server

```bash
cd Backend
npm run dev
```

The API server will start on `http://localhost:5000`

#### 2. Start the User Frontend

```bash
cd servicehub-frontend
npm run dev
```

The user application will be available at `http://localhost:5173`

#### 3. Start the Admin Frontend

```bash
cd Admin-frontend
npm run dev
```

The admin dashboard will be available at `http://localhost:5174`

### How to create a Production Build

#### Backend Production

```bash
cd Backend
npm start
```

#### Frontend Production Build

For User Frontend:
```bash
cd servicehub-frontend
npm run build
npm run preview
```

For Admin Frontend:
```bash
cd Admin-frontend
npm run build
npm run preview
```

### Available Scripts

#### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

#### Frontend (Both Applications)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### API Structure

The backend provides RESTful APIs organized into the following modules:
- **Authentication** - User registration, login, OTP verification
- **Services** - Service management and CRUD operations
- **Sub-Services** - Sub-service operations and categorization
- **Nested Services** - Hierarchical service management
- **Users** - User management (admin functionality)
- **Bookings** - Booking management and scheduling
- **Location** - Location-based services and geolocation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
