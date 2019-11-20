const votes = require("express").Router();
const db = require("./votesModel.js");
const restricted = require("../utils/restrictedMiddleware");

votes.post("/", restricted, (req, res) => {
  const user_id = req.decodedToken.subject;
  const issue_id = req.body.issue_id;

  db.createVote(user_id, issue_id)
    .then(returns => res.status(201).json(returns))
    .catch(err =>
      res
        .status(500)
        .json({ error: true, message: "Failed to vote", data: err })
    );
});
