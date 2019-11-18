const db = require("../database/dbConfig");

function get(id) {
  let query = db("issues as i");

  if (id) query.where("i.id", id).first();

  return query;
}

function add(issue) {
  return db("issues")
    .insert(issue)
    .then(([id]) => this.get(id));
}

function findWhere(filter) {
  return db("issues").where(filter);
}

module.exports = {
  get,
  add,
  findWhere
};
