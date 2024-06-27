const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const subredditRoutes = require('./routes/subredditRoutes');
const postRoutes = require('./routes/postRoutes.js');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


app.use('/api/users', userRoutes);
app.use('/api/subreddits', subredditRoutes);
app.use('/api/posts', postRoutes);

mongoose.connect(process.env.MONGO_URI);
console.log(process.env.MONGO_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});


