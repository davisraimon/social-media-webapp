const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

//@route  POST api/users
//@desc   Register a User
//@access Public
router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Please Enter a Valid Email").isEmail(),
    check("password", "Password should be more than 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      //Check whether user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //Get the avatar
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      //Create the User
      user = new User({ name, email, password, avatar });

      //Encrypt the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //Save the User
      await user.save();

      //Generate the token for Session Managment
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.send({ token });
        }
      );
      // res.send("User Registered");
    } catch (err) {
      res.status(500).send("Application Server Error");
    }
  }
);

module.exports = router;
