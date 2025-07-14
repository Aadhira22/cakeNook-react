require('dotenv').config();
const User = require('./models/User');
const Order = require('./models/Order');
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || "sk_test_...");

const app = express();
app.use(cors({ origin: "https://cake-nook-react.vercel.app", credentials: true }));
app.use(express.static("public"));
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Auth routes
const authRoutes = require('./routes/auth');
const adminRoutes=require("./routes/admin");
const orderRoutes = require('./routes/orders'); // Adjust path if needed
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin',adminRoutes);

app.post('/checkout', async (req, res) => {
   const { items, user } = req.body;
   console.log("Received items:",items);

    if (!user || !user.id || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Missing user or items in request' });
    }
   try {
     // 1. Save order to MongoDB
     const simplifiedItems = items.map((item) => ({
      cakeId: item.cakeName, // or item.index or slug — whichever uniquely identifies the cake
      quantity: item.quantity,
      price: item.details.price
    }));
     const order = new Order({
       userId: user.id,
      //  email: user.email,
       items:simplifiedItems,
       totalPrice: items.reduce((sum, item) => sum + item.details.price * item.quantity, 0),
       status: 'pending'
     });
     await order.save();
 
     // 2. Prepare line_items for Stripe
     const line_items = items.map((item) => ({
       price_data: {
         currency: 'inr',
         product_data: {
           name: item.cakeName,
         },
         unit_amount: item.details.price * 100,
       },
       quantity: item.quantity,
     }));
 
    //  3. Create Stripe Checkout session
     const session = await stripe.checkout.sessions.create({
       payment_method_types: ['card'],
       line_items,
       mode: 'payment',
       success_url: `${process.env.CLIENT_URL}/success`,
       cancel_url: `${process.env.CLIENT_URL}/cancel`,
       metadata: {
         orderId: order._id.toString(),
         userId: user.id
       }
     });
 
     return res.status(200).json({ url: session.url });
   } catch (err) {
     console.error('Checkout Error:', err);
     return res.status(500).json({ error: 'Checkout failed' });
   }
 });
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
