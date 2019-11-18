exports.seed = function(knex) {
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
};
