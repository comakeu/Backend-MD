const db = require("../database/dbConfig");

function get(id) {
  let query = db("users as u");

  if (id) query.where("u.user_id", id).first();

  return query.select('user_id', 'first_name', 'last_name', 'email', 'phone');
}

function insert(user) {
  return db("users")
    .insert(user, 'user_id')
    .then(([id]) => this.get(id));
}

function findBy(filter){
  return db('users')
  .where(filter)
  .first()
}

module.exports = {
  get,
  insert,
  findBy,
};
