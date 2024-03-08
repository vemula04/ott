const request = require("supertest");
const app = require("../app");
describe("Movies Test Suite", () => {
  it("GET /movies`: List all the movies in the lobby", async () => {
    // expect(true).toBe(true);
    const res = await request(app).get("/movies").send();
    
    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty("get");
  });
});
