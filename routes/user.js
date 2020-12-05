const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");
const User = require("../model/User");
const { findByIdAndUpdate } = require("../model/User");

/* *
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/signup",
  [
    check("email", "Fyll i en giltig epostaddress").isEmail(),
    check(
      "password",
      "Fyll i ett giltig lösenord - lösenord måste vara minst 6 bokstäver"
    ).isLength({
      min: 6,
    }),
    check("phone", "Fyll i ett giltig mobilnummer").isMobilePhone(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password, phone, coordinates, smsChoice, mailChoice, name } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          msg: "Användare finns redan",
        });
      }

      user = new User({
        email,
        password,
        phone,
        coordinates,
        smsChoice,
        mailChoice, 
        name
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (err) {
      res.status(500).send("Error in Saving");
    }
  }
);

/* *
 * @method - POST
 * @param - /login
 * @description - User log in
 */

router.post(
  "/login",
  [
    check("email", "Fyll i en giltig epostaddress").isEmail(),
    check("password", "Fyll i ett giltig lösenord").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({
        email,
      });
      if (!user)
        return res.status(400).json({
          message: "error",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "error",
        });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

router.get("/getcoordinates", /* auth, */ async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const email = req.headers.email;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        response: "Failed to find the user",
      });
    } else {
      return res.status(200).json({
        response: user,
      });
    }
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

router.post(
  "/saveforest",
  [check("email", "no email provided").isEmail()],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Failed to save coordinates"
      });
    }

    const { email, coordinates } = req.body;

    try {
      let user = await User.findOneAndUpdate(
        { email: email },
        { coordinates: coordinates }
      );
      if (!user) {
        return res.status(400).json({
          message: "failed",
        });
      }
      else if (user) {
        return res.status(200).json({
          message: "OK",
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

router.post(
  "/savepreferences",
  [check("email", "no email provided").isEmail()],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Failed to save preferences"
      });
    }

    const { email, smsChoice, mailChoice, name } = req.body;
    try {
      let user = await User.findOneAndUpdate(
        { email: email },
        { smsChoice: smsChoice, mailChoice: mailChoice, name: name },
      );
      if (!user) {
        return res.status(400).json({
          message: "failed",
        });
      }
      else if (user) {
        return res.status(200).json({
          message: "OK",
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

router.get("/getuser", async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const email = req.headers.email;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        response: "Failed to find the user",
      });
    } else {
      return res.status(200).json({
        response: user,
      });
    }
  } catch (e) {
    return res.status(700).json({ message: "Error in fetching user" });
  }
});


module.exports = router;
