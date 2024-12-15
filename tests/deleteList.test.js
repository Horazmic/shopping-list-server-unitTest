const request = require("supertest");
const app = require("../src/app");

describe("DELETE /shopping-list/deleteList/:id", () => {
  it('returns a "status": "success" and a deleted shopping list', async () => {
    const response = await request(app)
      .delete("/shopping-list/deleteList/1")
      .set("x-user-profile", "admin");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "success",
      message: "Shopping list deleted successfully",
    });
  });
  it("returns a 403 status code if the user is not authorized", async () => {
    const response = await request(app)
      .delete("/shopping-list/deleteList/1")
      .set("x-user-profile", "user");
    expect(response.status).toBe(403);
  });
  it("returns a 404 status code if the shopping list is not found", async () => {
    const response = await request(app)
      .delete("/shopping-list/deleteList/0")
      .set("x-user-profile", "admin");
    expect(response.status).toBe(404);
  });
});
