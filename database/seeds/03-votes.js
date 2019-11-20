
exports.seed = function(knex) {
  return knex('votes').insert([
    { issue_id: 1, user_id: 1},
    { issue_id: 1, user_id: 2},
    { issue_id: 1, user_id: 3}
  ]);
};
