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
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    express.raw({ type: 'application/json' })(req, res, next);
  } else {
    express.json()(req, res, next);
  }
});
app.use(cors({ origin: "https://cake-nook-react-dwi1.vercel.app", credentials: true }));
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

  if (!user || !user.id || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Missing user or items in request' });
  }

  try {
    const line_items = items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: { name: item.cakeName },
        unit_amount: item.details.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        userId: user.id,
        items: JSON.stringify(items), 
      }
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Checkout Error:', err);
    return res.status(500).json({ error: 'Checkout failed' });
  }
});

app.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const items = JSON.parse(session.metadata.items);

    const simplifiedItems = items.map((item) => ({
      cakeId: item.cakeName,
      quantity: item.quantity,
      price: item.details.price,
    }));

    try {
      const order = new Order({
        userId,
        items: simplifiedItems,
        totalPrice: items.reduce((sum, item) => sum + item.details.price * item.quantity, 0),
        status: 'pending',
      });

      await order.save();
      console.log("Order saved to DB after successful payment.");
    } catch (err) {
      console.error("Failed to save order:", err);
    }
  }

  res.status(200).json({ received: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
