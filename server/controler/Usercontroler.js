const User = require("./../model/Userschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  const { fname, lname, email, password, cpassword } = req.body;

  try {
    const preuser = await User.findOne({ email: email });
    const hpassword = await bcrypt.hash(password, 10);
    const hcpassword = await bcrypt.hash(cpassword, 10);

    if (preuser) {
      res.status(400).json("the user is already exits");
    } else {
      const newuser = await User({
        fname: fname,
        lname: lname,
        email: email,
        password: hpassword,
        cpassword: hcpassword,
      });
      const saveuser = await newuser.save();
      res.status(200).json({ status: 200, saveuser });
    }
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

exports.alluser = async (req, res) => {
  //   const search = req.query.search || "";
  //   const gender = req.query.gender || "";
  //   const status = req.query.status || "";
  //   const sort = req.query.sort || "";
  //   const page = req.query.page || 1;
  //   const data_perpage = 5;

  //   const query = {
  //     name: {
  //       $regex: search,
  //       $options: "1",
  //     },
  //   };
  //   if (!gender !== "all") {
  //     query.gender = gender;
  //   }
  //   if (status !== "all") {
  //     req.query = status;
  //   }
  try {
    //     const skip = (page - 1) * data_perpage; // 1-1=0*5=0 2-1=1*5=5
    //     const datacount = await User.countDocuments(query);
    //     const pagecount = Math.ceil(datacount / data_perpage); // 20/5=4
    const alluser = await User.find();
    //   .sort({
    //     datecreate: sort === "new" ? -1 : 1,
    //   })
    //   .skip(skip)
    //   .limit(data_perpage);
    //, pagination: { datacount, pagecount }

    res.status(200).json({ status: 200, alluser });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

//login user

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email });
    if (user && user.length > 0) {
      const validpassword = await bcrypt.compare(password, user[0].password);
      if (validpassword) {
        const token = jwt.sign(
          { fname: user[0].fname, lname: user[0].lname, id: user[0]._id },
          process.env.SECRET,
          { expiresIn: "1h" }
        );
        const result = { user, token };
        res.status(200).json({ status: 200, result });
      } else {
        res.status("authontical error");
      }
    } else {
      res.status("authonticals error");
    }
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

///email sent

exports.sendmail = async (req, res) => {
  const { email } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "email",
      auth: {
        user: precess.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    const mailoptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "email sent for nodemailer",
      html: "<> the email sent successfully</>",
    };
    transporter.sendMail(mailoptions, (err, info) => {
      if (err) {
        res.status(400).json(err);
      } else {
        console.log("email sent successfully", +info.response);
        res.status(200).json({ status: 200, info });
      }
    });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};
