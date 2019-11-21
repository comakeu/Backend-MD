const userRouter = require("express").Router();
const db = require("./userModel");
const bodyVal = require("../auth/middlewares").authBodyValidator;
const restricted = require("../utils/restrictedMiddleware");

userRouter.get("/profile", restricted, (req, res) => {
  const id = req.decodedToken.subject;

  db.get(id).then(user => {
    res.status(200).json(user);
  })
  .catch(err =>
    res.status(500).json({
      error: true,
      message: `Failed to get user`,
      data: err
    }))
});

userRouter.delete("/profile", restricted, (req, res) => {
  const id = req.decodedToken.subject;
  const { first_name, last_name } = req.decodedToken;

  db.remove(id)
    .then(flag => {
      if (flag) {
        res.status(200).json({
          error: false,
          message: `Deleted user ${first_name} ${last_name}`
        });
      } else {
        res.status(200).json({
          error: true,
          message: `Failed to delete user ${first_name}`
        });
      }
    })
    .catch(err =>
      res.status(500).json({
        error: true,
        message: `Failed to delete user ${first_name}`,
        data: err
      })
    );
});

userRouter.put("/profile", bodyVal, restricted, (req, res) => {
  const id = req.decodedToken.subject;

  db.update(id, req.valHashedUser).then(user =>
    res.status(200).json({
      error: false,
      message: `Successfully updated user`,
      data: user
    })
  )
  .catch(err =>
    res.status(500).json({
      error: true,
      message: `Failed to update user `,
      data: err
    }))
});

module.exports = userRouter;
