const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

beforeEach(() => {
  return db("issues").truncate();
  // await db("users").truncate();
});

beforeEach(() => {
  return db("users").truncate();
  // await db("users").truncate();
});

const testUserLogin = {
  email: "emkay@mail.com",
  password: "ALongAssPassword",
};

const testUserRegister = {
  first_name: "ALengthyName",
  last_name: "aLastName",
  email: "emkay@mail.com",
  password: "ALongAssPassword",
  phone: "01299345"
};

const testIssue = {
  description: "aLongDescription",
  longitude: 23.0,
  latitude: -123.0,
  user_id: 1
};

describe("Issues endpoints", () => {
  describe("[GET] /api/issues", () => {
    test("returns 200 OK status code when", () => {
      return request(server)
        .get("/api/issues")
        .expect(200);
    });

    test("returns an array", async () => {
      const response = await request(server).get("/api/issues");

      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe("[POST] /api/issues", () => {
    test("endpoint is restricted", () => {
      request(server)
        .post("/api/issues")
        .send(testIssue)
        .expect(401)
        .expect({ error: true, message: "No credentials passed" });
    });
    // test("returns 201 Created", async () => {
    //   await request(server)
    //     .post("/api/auth/register")
    //     .send(testUserRegister);

    //   const response = await request(server)
    //     .post("/api/auth/login")
    //     .send(testUserLogin);

    //   const { token } = response.body;

    //   // console.log(response.body);

    //   request(server)
    //     .post("/api/issues")
    //     .send(testIssue)
    //     .set("Authorization", token)
    //     .expect(201);
    // });
    // test("returns project created", async () => {

    //  const reg =  await request(server)
    //     .post("/api/auth/register")
    //     .send(testUserRegister);

    //   const response = await request(server)
    //     .post("/api/auth/login")
    //     .send(testUserLogin);

    //   const { token } = response.body;

    //   // testIssue.user_id = reg.body.data.user_id

    //   const postResponse = await request(server)
    //     .post("/api/issues")
    //     .set("Authorization", token)
    //     .send(testIssue)

    //     console.log(postResponse.body);

        
    //   delete postResponse.body.data.issue_id;

    //   const projectCreated = postResponse.body.data;
    //   expect(projectCreated).toEqual(testIssue);
    // });
  });
});
