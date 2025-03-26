const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const passport = require('./config/passport');
const cors = require('cors');

const prismaErrorHandler = require('./config/UniqueConstraintError');
const validateRequest = require('./validators/validateRequest');

const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');
const likeRoute = require('./routes/likeRoute');
const followRoute = require('./routes/followRoute');
const authRoute = require('./routes/authRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow cookies
  })
);
app.use(passport.initialize());
app.use('/', validateRequest);
app.use(prismaErrorHandler);

app.use('/', userRoute);
app.use('/', postRoute);
app.use('/', commentRoute);
app.use('/', likeRoute);
app.use('/', followRoute);
app.use('/', authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
