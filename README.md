# 🏠 RentNest – Rental Property Management Platform

RentNest is a modern rental property management platform built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Shadcn UI**. It provides separate dashboards for **Tenant**, **Landlord**, and **Admin**, allowing users to manage properties, rental requests, payments, and profiles.

---

## 🚀 Live Demo

- **Frontend:**https://assignment-5-eight-dusky.vercel.app/
- **Backend API:** https://rentnest-nine.vercel.app

---

# ✨ Features

## 👤 Authentication

- JWT Authentication
- Secure Cookie-based Login
- Role-based Authorization
- Protected Routes
- Middleware Authentication

---

## 🏠 Tenant Features

- Browse Properties
- Property Details
- Request Rental
- View Rental Requests
- Payment Integration
- Payment History
- Review Property
- Update Profile

---

## 🏡 Landlord Features

- Dashboard
- Create Property
- Update Property
- Delete Property
- View Rental Requests
- Approve / Reject Requests
- Manage Properties

---

## 🛡️ Admin Features

- Dashboard
- Manage Users
- Manage Properties
- Manage Rental Requests
- System Overview

---

# 🛠️ Tech Stack

### Frontend

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Lucide React
- React Hook Form
- Zod
- Framer Motion
- Sonner
- JWT Authentication

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- Bcrypt
- Cookie Parser

---

# 📁 Folder Structure

```
app/
│
├── dashboard/
│   ├── tenant/
│   ├── landlord/
│   └── admin/
│
├── properties/
├── auth/
│
components/
│
services/
│
actions/
│
types/
│
middleware.ts
```

---


# 📌 API Used

## Authentication

- Register
- Login
- Get Profile
- Update Profile

## Property

- Get Properties
- Get Single Property
- Create Property
- Update Property
- Delete Property

## Rental

- Create Rental Request
- Get Rental Requests
- Get Single Rental Request

## Payment

- Checkout
- Payment Success
- Payment History

## Review

- Create Review

---

# 💳 Payment Flow

```
Property Details

      ↓

Request Rental

      ↓

Landlord Approval

      ↓

Payment Checkout

      ↓

Payment Success

      ↓

Payment History
```

---

# 🔐 Role-Based Access

| Role | Permission |
|-------|------------|
| Tenant | Browse properties, request rentals, payments |
| Landlord | Manage properties and rental requests |
| Admin | Manage users, properties and system |

---

# 📷 Screenshots

Add your screenshots here.

```
Home Page

Dashboard

Property Details

Payment

Admin Panel
```

---

# 🌐 Deployment

Frontend deployed on

- Vercel

Backend deployed on

- Vercel

---

# 👨‍💻 Author

**Abir Ovi**

GitHub:
https://github.com/OviIslmAbir

Portfolio:
https://my-portfolio62.netlify.app/

---

# 📄 License

This project is developed for educational purposes (Assignment-5).
