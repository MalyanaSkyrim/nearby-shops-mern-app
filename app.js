const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

const authRoutes = require('./routes/authRoutes');
const shopsRoutes = require('./routes/shopsRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/shops', shopsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
