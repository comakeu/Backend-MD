const votes = require("express").Router();
const db = require("./votesModel.js");
const restricted = require("../utils/restrictedMiddleware");

votes.post("/", restricted, (req, res) => {
  const user_id = req.decodedToken.subject;
  const issue_id = req.body.issue_id;

  db.createVote(user_id, issue_id)
    .then(() => {
        db.getCount({ issue_id }).then(votes => {
            votes.issue_id = issue_id;
            res
              .status(201)
              .json({ error: false, message: "Vote successful", data: votes });
          });
    })
    .catch(err => {
      if (err.errno === 19) {
        res
          .status(500)
          .json({
            error: true,
            message: `Failed. User ${user_id} might have already voted for this issue`
          });
      } else {
        res
          .status(500)
          .json({ error: true, message: "Failed to vote", data: err });
      }
    });
});

module.exports = votes;
