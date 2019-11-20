const db = require("../database/dbConfig");

module.exports = {
  createVote,
  removeVote,
  getWhere,
};

function createVote(user_id, issue_id) {
  return db("issues").insert({ issue_id, user_id });
}

function removeVote(user_id, issue_id) {
  return db("issues")
    .where("issue_id", issue_id)
    .where("user_id", user_id)
    .del();
}

function getWhere(filter){
    return db('issues')
    .where(filter)
}
