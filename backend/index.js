const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/User.route');

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors()); 
app.use(express.json()); 


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


app.get('/', (req, res) => {
  res.send('API is running!');
});
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
