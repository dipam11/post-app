const express = require('express');
const mongoose = require('mongoose');
const app = express();
const postsRouter = require('./routes/posts.js');

mongoose
  .connect('mongodb+srv://dipamjp99:post-app-01@cluster0.jnaqyy5.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

app.use(express.json());

app.use('/api/posts', postsRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
