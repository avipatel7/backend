import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoute from './router/auth.js';
import tourRoute from './router/tours.js';
import userRoute from './router/users.js';
import reviewRoute from './router/review.js';
import bookingRoute from './router/bookings.js';
import searchRoute from './router/Search.js';
import contactRoute from './router/contact.js';
import blogRoute from './router/blog.js';
import commentRoute from './router/comment.js';
import scheduleRoute from './router/schedule.js';
import weatherRoute from './router/whether.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

let cachedDbConnection = null;

async function connectToDatabase() {
  if (cachedDbConnection) {
    return cachedDbConnection;
  }
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Database Connected");
    cachedDbConnection = connection;
    return connection;
  } catch (err) {
    console.log("MongoDB Database Connection Failed", err);
    throw err;
  }
}

// Middleware
app.use(cors({
  origin: 'http://travel-world-a1daa60f712f.herokuapp.com', // Replace with your client-side origin
  // origin:'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.send({"message": "Server is up and running!"});
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/search", searchRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/schedule", scheduleRoute);
app.use("/api/v1/weather", weatherRoute);


app.listen(port, async () => {
  await connectToDatabase(); // Ensuring the database connection is established before starting the server
  console.log(`Server is listening on port ${port}`);
});
