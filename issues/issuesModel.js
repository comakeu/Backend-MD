const db = require("../database/dbConfig");
const votesModel = require('../votes/votesModel')

function get(id) {
  let query = db("issues as i");

  if (id) query.where("i.issue_id", id).first();

  return Promise.all([query, votesModel.getAllVotes()]);
}

function add(issue) {
  return db("issues")
    .insert(issue, "issue_id")
    .then(([id]) => this.get(id));
}

function remove(issue_id) {
  return db("issues as i")
    .where("i.issue_id", issue_id)
    .del();
}

function update(issue_id, changes) {
  return db("issues as i")
    .where("issue_id", issue_id)
    .update(changes)
    .then(flag => {
      if (flag) {
        return this.get(issue_id);
      }
    });
}

function findWhere(filter) {
  return db("issues").where(filter);
}

module.exports = {
  get,
  add,
  findWhere,
  remove,
  update
};
