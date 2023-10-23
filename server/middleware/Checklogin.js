const jwt = require("jsonwebtoken");

const checklogin = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = await authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    const { fname, lname, id } = decoded;
    (req.fname = fname), (req.lname = lname), (req.id = id);
    next();
  } catch {
    next("authontical error");
  }
};
module.exports = checklogin;
