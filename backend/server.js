const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// 🔹 Allowed origins (dev + .env)
const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:8080',
];



const envOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
  : [];

const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

console.log('CORS_ORIGIN from env:', process.env.CORS_ORIGIN);
console.log('Allowed CORS origins:', allowedOrigins);

// 🔹 Express CORS (simplified)
app.use(
  cors({
    origin: allowedOrigins,        // array of allowed origins
    credentials: true,
  })
);

app.use(express.json());

// 🔹 Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 🔹 Socket.IO CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

app.set('io', io);

// 🔹 Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
// FIRST: team members route
app.use('/api/users', require('./routes/teamMembers'));

// THEN: connection fallback route
app.use('/api/connection', require('./routes/connection'));



// 🔹 Global error handling middleware (MUST be last)
app.use((err, req, res, next) => {
  console.error('Express error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    status: err.status || 500,
  });
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    path: req.path,
    method: req.method,
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/team-tracker')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`User ${userId} joined room`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 🔹 Handle uncaught exceptions
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
