const cleaner = require('knex-cleaner');

exports.seed = async function(knex) {
  await knex.raw('SET foreign_key_checks = 0');
  await cleaner.clean(knex, {
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'], // don't empty migration tables
  });
  await knex.raw('SET foreign_key_checks = 1');

};