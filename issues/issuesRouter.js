const issues = require("express").Router();
const db = require("./issuesModel");

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

module.exports = issues