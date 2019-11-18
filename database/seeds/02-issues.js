
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('issues').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('issues').insert([
        { description: 'A very very pertinent issue', longitude: 123.9, latitude: 9.0, user_id: 1, },
        { description: 'A very very pertinent issue', longitude: 123.9, latitude: 9.0, user_id: 1, },
        { description: 'A very very pertinent issue', longitude: 123.9, latitude: 9.0, user_id: 1, }
      ]);
    });
};
