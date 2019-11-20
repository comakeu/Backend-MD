const issues = require("express").Router();
const issuesModel = require("./issuesModel");
const restricted = require("../utils/restrictedMiddleware");

issues.get("/", (req, res) => {
  issuesModel.get()
    .then(([issues, allVotes]) => {
      issues.forEach(i => {
        const issueVotes = allVotes.filter(v => v.issue_id === i.issue_id);
        i.total_votes = issueVotes.length;
        // i.votes = issueVotes
      });
      res.status(200).json({
        error: false,
        message: "Issues fetched successfully",
        data: issues
      });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: true, message: `An error occurred: ${err.message}` })
    );
});

issues.get("/:id", (req, res) => {
  issuesModel.get(req.params.id)
    .then(([issue, allVotes]) => {
      const issueVotes = allVotes.filter(v => v.issue_id === issue.issue_id);
      issue.total_votes = issueVotes.length;
      issue.votes = issueVotes;
      res.status(200).json({
        error: false,
        message: "Issues fetched successfully",
        data: issue
      });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: true, message: `An error occurred: ${err.message}` })
    );
});

issues.post("/", issueBodyValidator, restricted, (req, res) => {
  issuesModel.add(req.valIssue)
    .then(issue => {
      res.status(201).json({
        error: false,
        message: "Created issue successfully",
        data: issue
      });
    })
    .catch(err =>
      res.status(500).json({
        error: true,
        message: `An error occurred: ${err.message}`,
        data: err
      })
    );
});

issues.delete("/:id", issueIdValidator, restricted, (req, res) => {
  issuesModel.remove(req.params.id).then(flag => {
    if (flag) {
      res.status(200).json({
        error: false,
        message: "Deleted successfully",
        data: req.valIdIssue
      });
    }
  });
});

issues.put(
  "/:id",
  issueIdValidator,
  issueBodyValidator,
  restricted,
  (req, res) => {
    issuesModel.update(req.params.id, req.valIssue).then(issue => {
      res
        .status(200)
        .json({ error: false, message: "Updated successfully", data: issue });
    });
  }
);

function issueIdValidator(req, res, next) {
  const { id } = req.params;

  issuesModel.get(id)
    .then(issue => {
      if (issue) {
        req.valIdIssue = issue;
        next();
      } else {
        res.status(404).json({
          message: "Issue not found"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "id not found: " + error.message
      });
    });
}

function issueBodyValidator(req, res, next) {
  const { description, latitude, longitude, user_id } = req.body;

  if (!Object.keys(req.body).length) {
    res.status(404).json({ error: true, message: "Request body missing" });
  } else if (!description || !latitude || !longitude || !user_id) {
    res.status(404).json({ error: true, message: "Required param(s) missing" });
  } else if (
    typeof latitude !== typeof longitude ||
    typeof latitude !== "number"
  ) {
    res.status(404).json({ error: true, message: "Incorrect data type" });
  } else {
    req.valIssue = { description, latitude, longitude, user_id };
    next();
  }
}

module.exports = issues;
