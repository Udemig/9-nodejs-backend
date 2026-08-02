const errorHandler = (err, req, res, next) => {
  // todo: bilinmeyen hatları el ala
  res.status(err.statusCode || 500).json({ message: err.message, code: err.errorCode });
};

export default errorHandler;
