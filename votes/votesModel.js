const db = require("../database/dbConfig");

module.exports = {
  createVote,
  removeVote,
  getWhere,
};

function createVote(user_id, issue_id) {
  return db("votes").insert({ issue_id, user_id }, 'id');
}

function removeVote(user_id, issue_id) {
  return db("votes")
    .where("issue_id", issue_id)
    .where("user_id", user_id)
    .del();
}

function getWhere(filter){
    return db('votes')
    .where(filter)
}
