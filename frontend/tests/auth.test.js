const request = require("supertest");
const app = require("../app"); // ajuste o caminho conforme necessário
let server;

beforeAll((done) => {
  server = app.listen(done);
});

afterAll((done) => {
  server.close(done);
});

describe("Auth Endpoints", () => {
  it("should login and return a token", async () => {
    const res = await request(server).post("/api/login").send({
      email: "user@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should fail with incorrect credentials", async () => {
    const res = await request(server).post("/api/login").send({
      email: "user@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toEqual(401);
  });
});
