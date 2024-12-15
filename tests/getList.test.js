const request = require("supertest");
const app = require("../src/app");

describe("GET /shopping-list/getList/:id", () => {
  it('returns a "status": "success" and a shopping list', async () => {
    const response = await request(app)
      .get("/shopping-list/getList/1")
      .set("x-user-profile", "admin");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "success",
      list: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        items: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            amount: expect.any(Number),
            unit: expect.any(String),
          }),
        ]),
        owner: expect.any(String),
      }),
    });
  });
  it("returns a 403 status code if the user is not authorized", async () => {
    const response = await request(app)
      .get("/shopping-list/getList/1")
      .set("x-user-profile", "user");
    expect(response.status).toBe(403);
  });
  it("returns a 404 status code if the shopping list is not found", async () => {
    const response = await request(app)
      .get("/shopping-list/getList/0")
      .set("x-user-profile", "admin");
    expect(response.status).toBe(404);
  });
});
