const db = require("../database/dbConfig");
const votesModel = require("../votes/votesModel");

function get(id) {
  let query = db("issues as i")
    .select(
      "i.issue_id",
      "i.description",
      "i.longitude",
      "i.latitude",
      "i.user_id",
      "u.user_id",
      "u.first_name",
      "u.last_name"
    )
    .join("users as u", "i.user_id", "u.user_id");


    /**
     * Alternate knex query to return votes and removes the need to use a second promise:
     * 
     *  let query = db("issues as i")
    .select(
      "i.issue_id",
      "i.description",
      "i.longitude",
      "i.latitude",
      "i.user_id",
      "u.user_id",
      "u.first_name",
      "u.last_name"
    )
    .count("v.issue_id", { as: "votes" })
    .join("users as u", "i.user_id", "u.user_id")
    .leftJoin("votes as v", "v.issue_id", "i.issue_id")
    .groupBy(
      "i.issue_id",
      "i.description",
      "i.latitude",
      "i.longitude",
      "u.first_name",
      "u.last_name"
    )
    .orderBy("votes", "desc");
     */

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
