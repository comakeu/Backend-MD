const userRouter = require("express").Router();
const db = require("./userModel");
const bodyVal = require("./middlewares").authBodyValidator;

userRouter.get("/:id", (req, res) => {
  db.get(req.params.id).then(user => {
    res.status(200).json(user);
  });
});

userRouter.delete("/:id", (req, res) => {
  db.remove(req.params.id).then(flag => res.status(200).json(flag));
});

userRouter.put("/:id", bodyVal, (req, res) => {
  db.update(req.params.id, req.valHasheduser).then(flag =>
    res.status(200).json(flag)
  );
});

module.exports = userRouter;
