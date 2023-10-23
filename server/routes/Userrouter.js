const express = require("express");
const usercontroler = require("./../controler/Usercontroler");
//const checklogin = require("./../middleware/Checklogin");
const router = express.Router();

//userrouter
router.post("/api/post", usercontroler.register);
//alluserget

router.get("/api/get", usercontroler.alluser);

//login

router.post("/api/login", usercontroler.Login);

//post email=

router.post("/api/emailpost", usercontroler.sendmail);

module.exports = router;
