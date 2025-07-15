Here's a polished and structured **README.md** for your *cakeNook-react* project:

---

# 🍰 cakeNook

A full-stack cake ordering app built with React, Tailwind CSS, Node.js, Express, and MongoDB. Users can browse cakes, add items to their cart, simulate payments via Stripe sandbox, and track order status. An admin user can manage orders by updating their status.

---

## Table of Contents

1. [Demo](#demo)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Getting Started](#getting-started)
5. [Admin Instructions](#admin-instructions)
---

## Demo

Live demo available at:
**[https://cake-nook-react-dwi1.vercel.app/](https://cake-nook-react-dwi1.vercel.app/)**

---

## Features

* **User**

  * Browse a variety of cakes
  * Add cakes to a shopping cart
  * Simulate checkout via Stripe sandbox
  * View order history and track order statuses

* **Admin**

  * Log in using designated admin email
  * View all user orders
  * Update order status to "delivered"
  * Manage orders via admin dashboard

---

## Technologies

* **Frontend**

  * React.js
  * Tailwind CSS

* **Backend**

  * Node.js, Express
  * MongoDB (via Mongoose)
  * Stripe API (sandbox mode) for payment simulation

---

## Getting Started

### Prerequisites

* Node.js installed
* MongoDB database (local or cloud)
* Stripe account (for sandbox test keys)

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/Aadhira22/cakeNook-react.git
   cd cakeNook-react
   ```

2. **Install dependencies**

   ```bash
   # in root/frontend
   cd store
   npm install
   ```

3. **Environment Variables**
   Create `.env` file in root.

   ```
   JWT_SECRET=<jwt_secret>
   CLIENT_URL=<localhost_fronotend_url>
   MONGODB_URI=<your_mongo_connection_string>
   STRIPE_SECRET_KEY=<your_stripe_test_secret_key>
   STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret_key>
   REACT_APP_API_URL=<localhost_backend_url>
   ```

## Admin Instructions

* **Login**

  * Email: `test@example`
  * You can use any password
    Before logging in, you must first register an account using this email (test@example). Once registered, the system will treat this account as an admin.

* **Manage Orders**

  * Navigate to **Admin Dashboard**
  * View user orders
  * Change order status (e.g. to "Delivered")

---
---



