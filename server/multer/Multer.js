const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const filename = `images-${Date.now()}.${file.originalname}`;
    cb(null, filename);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype == "images/png" ||
    file.mimetype == "images/jpg" ||
    file.mimetype == "images/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("only jpg,jprg,png file is allowed"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filefilter,
});

module.exports = upload;
