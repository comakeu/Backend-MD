exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          first_name: "Maaruf",
          last_name: " Dauda",
          email: "emkay",
          password: "aLongPassword",
          phone: "aPhone"
        },
        {
          first_name: "Maaruf",
          last_name: " Dauda",
          email: "emkay1",
          password: "aLongPassword",
          phone: "aPhone"
        },
        {
          first_name: "Maaruf",
          last_name: " Dauda",
          email: "emkay2",
          password: "aLongPassword",
          phone: "aPhone"
        }
      ]);
    });
};
