const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

let token;

const testUser = {
  first_name: "ALengthyName",
  last_name: "ALengthyName",
  email: "emkay5@mail.com",
  password: "aPassword",
  phone: "01299345"
};

const testUserLogin = {
  email: "emkay5@mail.com",
  password: "aPassword"
};

beforeAll(async () => {
  await db("users").truncate();

  await request(server)
    .post("/api/auth/register")
    .send(testUser);

  const res = await request(server)
    .post("/api/auth/login")
    .send(testUserLogin);
  token = res.body.token;
  console.log(token);

});

describe("User endpoints", () => {
  describe("/profile", () => {
    test("Get profile is authenticated", () => {
      request(server)
        .get("/api/user/profile")
        .expect(401);
    });

    test("Delete User works", async () => {
      console.log(token);
      
      const res = await request(server)
        .delete("/api/user/profile")
        .set({ Authorization: token });
        console.log(res.body);
        
      expect(res.status).toBe(200);
    });

    test('[PUT] /profile is validated', async () => {
      delete testUser.email
      const res = await request(server)
      .put('/api/user/profile')
      .send(testUser)
      .set({ Authorization: token })

      expect(res.status).toBe(400)
      expect(res.body).toEqual({error: true, message: `Missing required param(s)`})
    })

    test('[PUT] Edit profile works', async () => {
      const editedUser = {
        ...testUser,
        email: `${testUser.email}s`
      }

      const res = await request(server)
      .put('/api/user/profile')
      .send(editedUser)
      .set({ Authorization: token })

      console.log(res.body)

      expect(res.status).toBe(200)

    })
  });
});
