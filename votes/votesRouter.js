const votes = require("express").Router();
const votesModel = require("./votesModel.js");
const restricted = require("../utils/restrictedMiddleware");

votes.post("/", restricted, (req, res) => {
  const user_id = req.decodedToken.subject;
  const issue_id = req.body.issue_id;

  votesModel
    .createVote(user_id, issue_id)
    .then(() => {
      votesModel.getCount({ issue_id }).then(votes => {
        votes.issue_id = issue_id;
        res
          .status(201)
          .json({ error: false, message: "Vote successful", data: votes });
      });
    })
    .catch(err => {
      if (err.errno === 19) {
        res.status(500).json({
          error: true,
          message: `Failed. User ${user_id} might have already voted for this issue`
        });
      } else {
        res
          .status(500)
          .json({ error: true, message: `Failed to vote: ${err.message}`, data: err });
      }
    });
});

votes.delete("/:issue_id", restricted, (req, res) => {
  const user_id = req.decodedToken.subject;
  const issue_id = req.params.issue_id;
  votesModel
    .removeVote(user_id, issue_id)
    .then(flag => {
      if (flag) {
        res.status(200).json({ error: false, message: "Vote removed" });
      } else {
        res.status(404).json({
          error: true,
          message: `User ${user_id} has not voted for this issue {issue_id: ${issue_id}} yet`
        });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: true, message: "Failed to vote", data: err })
    );
});

module.exports = votes;
