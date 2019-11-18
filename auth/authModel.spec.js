const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

beforeEach(() => {
  return db("users").truncate();
});

const testUser = {
  first_name: "ALengthyName",
  last_name: "aLastName",
  email: "emkay@mail.com",
  password: "ALongAssPassword",
  phone: "01299345"
};

describe("auth endpoints", () => {
  describe("register endpoint", () => {
    test("/register returns 201 Created", () => {
      return request(server)
        .post("/api/auth/register")
        .send(testUser)
        .expect(201);
    });
    test("/register returns actual user", async () => {
      const response = await request(server)
        .post("/api/auth/register")
        .send(testUser);

      console.log(process.env.DB_ENV);

      expect(response.body.data.email).toBe(testUser.email);
      expect(response.body.data.phone).toBe(testUser.phone);
    });
    // test("/register does not store password in plain text", async () => {
    //   const response = await request(server)
    //     .post("/api/auth/register")
    //     .send(testUser);

    //   expect(response.body.data.password).not.toBe(
    //     undefined && testUser.password
    //   );
    // });
  });

  describe("login endpoint", () => {
    test("/login returns 200 OK", async () => {
      await request(server)
        .post("/api/auth/register")
        .send(testUser);

      return request(server)
        .post("/api/auth/login")
        .send(testUser)
        .expect(200);
    });
    test("/login returns a token", async () => {
      await request(server)
        .post("/api/auth/register")
        .send(testUser);
      const response = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      expect(response.body.token).not.toBe(null || undefined);
    });
    test("/login returns user whose email was passed in", async () => {
      await request(server)
        .post("/api/auth/register")
        .send(testUser);

      const response = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      expect(response.body.data.email).toBe(testUser.email);
    });
  });
});
