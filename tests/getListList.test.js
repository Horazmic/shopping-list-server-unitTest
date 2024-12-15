const request = require("supertest");
const app = require("../src/app");

describe("GET /shopping-list/getList/list", () => {
  it('returns a "status": "success" and a list of shopping lists', async () => {
    const response = await request(app)
      .get("/shopping-list/getList/list")
      .set("x-user-profile", "admin");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "success",
      lists: expect.arrayContaining([
        expect.objectContaining({
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
      ]),
    });
  });
  it("returns a 403 status code if the user is not authorized", async () => {
    const response = await request(app)
      .get("/shopping-list/getList/list")
      .set("x-user-profile", "user");
    expect(response.status).toBe(403);
  });
});
