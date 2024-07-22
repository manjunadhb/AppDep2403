const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotEnv = require("dotenv");
dotEnv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profilePics");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/profilePics", express.static("profilePics"));

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNo: String,
  profilePic: String,
});

let User = new mongoose.model("users", userSchema);

app.post("/signup", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  console.log(req.file);

  let hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    let signedupDetails = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      mobileNo: req.body.mobileNo,
      profilePic: req.file.path,
    });

    await User.insertMany([signedupDetails]);

    res.json({ status: "success", msg: "User created successfully" });
  } catch (err) {
    res.json({
      status: "failure",
      msg: "Unable to create account.",
      error: err,
    });
  }
});

app.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);

  let userDetails = await User.find().and({ email: req.body.email });

  console.log(userDetails);

  if (userDetails.length > 0) {
    let result = await bcrypt.compare(
      req.body.password,
      userDetails[0].password
    );
    if (result == true) {
      let token = jwt.sign(
        {
          email: req.body.email,
          password: req.body.password,
        },
        "abracadabra"
      );

      let details = {
        firstName: userDetails[0].firstName,
        lastName: userDetails[0].lastName,
        age: userDetails[0].age,
        email: userDetails[0].email,
        mobileNo: userDetails[0].mobileNo,
        profilePic: userDetails[0].profilePic,
        token: token,
      };

      res.json({
        status: "success",
        data: details,
      });
    } else {
      res.json({
        status: "failure",
        msg: "Invalid Passsword.",
      });
    }
  } else {
    res.json({ status: "failure", msg: "User doesnot exist." });
  }
});

app.post("/validateToken", upload.none(), async (req, res) => {
  console.log(req.body.token);

  try {
    let decryptedToken = jwt.verify(req.body.token, "abracadabra");

    console.log(decryptedToken);

    let userDetails = await User.find().and({ email: decryptedToken.email });

    console.log(userDetails);

    if (userDetails.length > 0) {
      if (userDetails[0].password == decryptedToken.password) {
        let details = {
          firstName: userDetails[0].firstName,
          lastName: userDetails[0].lastName,
          age: userDetails[0].age,
          email: userDetails[0].email,
          mobileNo: userDetails[0].mobileNo,
          profilePic: userDetails[0].profilePic,
        };

        res.json({
          status: "success",
          data: details,
        });
      } else {
        res.json({
          status: "failure",
          msg: "Invalid Passsword.",
        });
      }
    } else {
      res.json({ status: "failure", msg: "User doesnot exist." });
    }
  } catch (err) {
    res.json({ status: "failure", msg: "Invalid Token.", error: err });
  }
});

app.patch("/updateProfile", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  try {
    if (req.body.firstName.length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { firstName: req.body.firstName }
      );
    }

    if (req.body.lastName.length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { lastName: req.body.lastName }
      );
    }

    if (req.body.age > 0) {
      await User.updateMany({ email: req.body.email }, { age: req.body.age });
    }

    if (req.body.password.length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { password: req.body.password }
      );
    }

    if (req.body.mobileNo.length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { mobileNo: req.body.mobileNo }
      );
    }

    if (req.file) {
      await User.updateMany(
        { email: req.body.email },
        { profilePic: req.file.path }
      );
    }

    res.json({ status: "success", msg: "Profile Updated successfully." });
  } catch (err) {
    res.json({ status: "failure", msg: "Profile Updation failed." });
  }
});

app.delete("/deleteProfile", upload.none(), async (req, res) => {
  try {
    await User.deleteMany({ email: req.body.email });
    res.json({ status: "success", msg: "User Account deleted successfully" });
  } catch (err) {
    res.json({ status: "failure", msg: "Unable to delete account." });
  }
});

app.listen(process.env.port, () => {
  console.log(`Listening to port ${process.env.port}`);
});

let connectToMDB = async () => {
  try {
    // await mongoose.connect(
    //   "mongodb+srv://manjunadhb:manjunadhb@batch2403.2c0omf2.mongodb.net/MyDB?retryWrites=true&w=majority&appName=batch2403"
    // );
    await mongoose.connect(process.env.MDBURL);
    console.log("Successfully connected to MDB");
  } catch (err) {
    console.log("Unable to connect to MDB");
    console.log(err);
  }
};

connectToMDB();
