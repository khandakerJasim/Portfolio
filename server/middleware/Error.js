const Error = async (err, req, res, next) => {
  if (res.headersSend) {
    return next(err);
  } else {
    res.status(500).json({ error: err });
  }
};
module.exports = Error;
