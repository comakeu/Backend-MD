const issues = require("express").Router();
const db = require("./issuesModel");
const restricted = require("../utils/restrictedMiddleware");

issues.get("/", (req, res) => {
  db.get()
    .then(issues => {
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

issues.post("/", issueBodyValidator, restricted, (req, res) => {
  db.add(req.valIssue)
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

issues.delete("/:id", issueIdValidator, (req, res) => {
  db.remove(req.params.id).then(flag => {
    if (flag) {
      res
        .status(200)
        .json({
          error: false,
          message: "Deleted successfully",
          data: req.valIssue
        });
    }
  });
});

function issueIdValidator(req, res, next) {
  const { id } = req.params;

  db.get(id)
    .then(issue => {
      if (issue) {
        req.valIssue = issue;
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
