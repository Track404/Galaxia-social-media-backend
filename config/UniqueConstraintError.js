const prismaErrorHandler = (err, req, res, next) => {
  if (err.code === 'P2002') {
    return res.status(400).json({ error: `${err.meta.target} already exists` });
  }
  next(err); // Pass other errors to the default error handler
};

module.exports = prismaErrorHandler;
