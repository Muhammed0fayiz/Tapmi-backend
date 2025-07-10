const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); 
const userRouter = require('./routes/user');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;



app.use('/uploads', express.static('uploads'));


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));


mongoose.connect(process.env.MONGO_STR)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', userRouter);


app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
