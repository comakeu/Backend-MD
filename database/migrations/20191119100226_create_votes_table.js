exports.up = function(knex) {
  return knex.schema.createTable("votes", table => {
    table
      .integer("issue_id")
      .notNullable()
      .references("issue_id")
      .inTable("issues");
    table
      .integer("user_id")
      .notNullable()
      .references("user_id")
      .inTable("users");
    table.primary(["issue_id", "user_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("votes");
};
