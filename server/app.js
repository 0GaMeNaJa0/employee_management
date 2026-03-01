require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = process.env.WEB_PORT || 3000;
const usersRouter = require('./src/modules/users/route');
const authRouter = require('./src/modules/auth/route');
const authenticate = require('./src/middleware/middleware')

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin : process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials : true
}));

app.use('/auth', authRouter);
app.use('/users', authenticate , usersRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 
