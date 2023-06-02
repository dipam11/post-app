const express = require('express');
const mongoose = require('mongoose');
const app = express();
const postsRouter = require('./routes/posts.js');
const commentsRouter = require('./routes/comments');
require('dotenv').config()



mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jnaqyy5.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

app.use(express.json());
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
