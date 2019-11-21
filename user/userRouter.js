const userRouter = require("express").Router();
const db = require("./userModel");
const bodyVal = require("../auth/middlewares").authBodyValidator;
const restricted = require("../utils/restrictedMiddleware");

userRouter.get("/profile", restricted, (req, res) => {
  const id = req.decodedToken.subject;

  db.get(id).then(user => {
    res.status(200).json(user);
  });
});

userRouter.delete("profile", restricted, (req, res) => {
  const id = req.decodedToken.subject;

  db.remove(id).then(flag => res.status(200).json(flag));
});

userRouter.put("profile", bodyVal, restricted, (req, res) => {
  const id = req.decodedToken.subject;

  db.update(id, req.valHasheduser).then(flag => res.status(200).json(flag));
});

module.exports = userRouter;
