const express = require('express');
const app = express();
const cors = require('cors');

const prismaErrorHandler = require('./config/UniqueConstraintError');
const validateRequest = require('./validators/validateRequest');

const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');
const likeRoute = require('./routes/likeRoute');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', validateRequest);
app.use(prismaErrorHandler);

app.use('/', userRoute);
app.use('/', postRoute);
app.use('/', commentRoute);
app.use('/', likeRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
