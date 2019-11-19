const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

beforeEach(() => {
  db("issues").truncate();
});

const testUser = {
  email: "emkay5sasa@mail.com",
  password: "ALongAssPassword"
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
    test("returns 201 Created", async () => {
      const response = await request(server).post('api/auth/login').send(testUser)
      const { token } = response.body

      request(server).post('api/issues').send(testIssue).set('Authorization', token)
      .expect(201)
    });
    test("returns project created", async () => {
      const response = await request(server).post('api/auth/login').send(testUser)
      const { token } = response.body

      const postResponse = await request(server).post('api/issues').send(testIssue).set('Authorization', token)
      delete postResponse.body.project_id
      const projectCreated = postResponse.body
      expect(postResponse.body).toEqual(projectCreated)
    });
  });
});
