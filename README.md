# 📢 Welcome to Car Wash Booking System

## 🎬 Live URL

[https://car-washing-system-backend-cyan.vercel.app/](https://car-washing-system-backend-cyan.vercel.app/)

## ✨ Project Description

The Car Wash Booking System is a web application that enables users to easily schedule car wash services.

## ✨ Project Features

- **Authentication System for Users**: Users can sign up, log in, and see their Bookings.
- **Booking Management**: CCustomers have the management option to choose their desired date and time slot for scheduling a car wash appointment.
- **Service and Slot Management System**: AThe admin can establish various car wash services and designate specific time slots for them. Additionally, the admin can oversee bookings and modify availability.
- **Error Handling Properly**: Proper error messages are displayed for invalid inputs or failed operations.

## ✨ Technology Stack

- **Language Dev-Dependency**: TypeScript
- **Database**: MongoDB (using Mongoose for ODM)
- **Web Framework**: Express.js
- **Authentication**: JSON Web Tokens (JWT)
- **Error Handling**: Custom middleware
- **Validation**: Zod Validations
- **Deployment**: Deployed on Vercel

## ✨ Installation and Setup

1. ⛳ Clone this repository:

   ```bash
   git clone https://github.com/mehadiHasanDiner/car-washing-system-backend
   ```

2. ⛳ Install dependencies:

   ```bash
   cd car-washing-system-backend
   npm install
   ```

3. ⛳ Set up environment variables:

   Create a `.env` file with the following variables:

   ```
   PORT=5000
   DB_URI=Your Mongodb connnection Uri
   BCRYPT_SALT_ROUNDS= any number
   JWT_ACCESS_SECRET= Your JWT Secret
   JWT_ACCESS_EXPIRES= Your Jwt Token Expire time

   ```

4. ⛳ Start the server:

   ```bash
   npm run start:dev
   ```

5. ⛳ Access the application in your browser at `http://localhost:5000`.

## 📘 API Documentation

 **Authentication Routes**:

  - `POST /api/auth/signup`: Register a new user.
  - `POST /api/auth/login`: Log in an existing user.

- **Service Routes**:

  - `POST /api/services`: Create a Service. (Only Accessible by Admin)
  - `GET /api/services/:id`: Get a Service. (Accessible by all)
  - `GET /api/services`: Get all Services. (Accessible by all)
  - `PUT /api/services/:id`: Update Services (Only Accessible by Admin)
  - `DELETE /api/services/:id`: Delete (Soft Delete) a Service (Only Accessible by Admin)

- **Slot Routes**:

  - `POST /api/services/slots`: Create Slot (Only Accessible by Admin)
  - `GET /api/slots/availability`: Get available slots (Accessible by all)
  - `GET /api/slots/availability?date=&serviceId=`: Get available slots (Accessible by all)

- **Booking Routes**:
  - `POST /api/bookings`: Book a Service (Only Accessible by User).
  - `GET /api/bookings`: Get All Bookings (Only Accessible by Admin).
  - `PUT /api/my-bookings`: Get User's Bookings (Only Accessible by User).
