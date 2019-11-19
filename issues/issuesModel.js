const db = require("../database/dbConfig");

function get(id) {
  let query = db("issues as i");

  if (id) query.where("i.issue_id", id).first();

  return query;
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
    .update(changes);
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
