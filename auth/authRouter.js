const auth = require("express").Router();
const db = require("./authModel");
const bodyVal = require("./middlewares").authBodyValidator;
const loginVal = require("./middlewares").loginValidator;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

auth.post("/register", bodyVal, (req, res) => {
  db.insert(req.valHashedUser)
    .then(user => {
      res
        .status(201)
        .json({ error: false, message: "Created successfully", data: user });
    })
    .catch(err =>
      res.status(500).json({ error: true, message: err.message, data: err })
    );
});

auth.post("/login", loginVal, (req, res) => {
  const { email, password } = req.valUser;
  db.findBy({ email }).then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      delete user.password
      res
        .status(200)
        .json({
          error: false,
          message: "Successfully logged in",
          token: token,
          data: user
        });
    } else {
      res.status(401).json({error: true, message: 'Failed to authenticate'})
    }
  });
});

function generateToken(user) {
  const payload = {
    subject: user.user_id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone

  };
  const options = {
    expiresIn: "1d"
  };

  const result = jwt.sign(
    payload,
    process.env.SECRET || "testing test",
    options
  );

  return result;
}

module.exports = auth;
