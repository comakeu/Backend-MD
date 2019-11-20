const bcrypt = require("bcrypt");

function authBodyValidator(req, res, next) {
  const { email, first_name, last_name, password, phone } = req.body;

  if (!Object.keys(req.body).length) {
    res.status(400).json({ error: true, message: "Missing request body" });
  } else if (!email || !first_name || !last_name || !password) {
    res.status(400).json({ error: true, message: "Missing required param(s)" });
  } else {
    const hashedPassword = bcrypt.hashSync(password, 10);

    req.valUser = { email, first_name, last_name, password, phone };
    req.valHashedUser = { email, first_name, last_name, password: hashedPassword, phone };
    next()
  }
}

function loginValidator(req, res, next){
  const { email, password } = req.body;

  if (!Object.keys(req.body).length) {
    res.status(400).json({ error: true, message: "Missing request body" });
  } else if (!email || !password) {
    res.status(400).json({ error: true, message: "Missing required param(s)" });
  } else {
    req.valUser = { email, password };

    next()
  }
}

module.exports = {
  authBodyValidator,
  loginValidator,
};
