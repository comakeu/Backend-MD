const db = require("../database/dbConfig");

module.exports = {
  createVote,
  removeVote,
  getWhere,
  getCount,
  getAllVotes,
};

function createVote(user_id, issue_id) {
  return db("votes").insert({ issue_id, user_id }, 'issue_id');
}

function removeVote(user_id, issue_id) {
  return db("votes")
    .where("issue_id", issue_id)
    .where("user_id", user_id)
    .del();
}

function getAllVotes(){
    return db('votes')
}

function getCount(filter){
    return db('votes').count('issue_id', {as: 'votes'})
    .where(filter)
    .first()
}

function getWhere(filter){
    return db('votes')
    .where(filter)
}
