require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.WEB_PORT || 3000;
const usersRouter = require('./src/modules/users/route');

app.use(express.json());

app.use('/users', usersRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
