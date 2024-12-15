const request = require("supertest");
const app = require("../src/app");

describe("PUT /shopping-list/updateList/:id", () => {
  it('returns a "status": "success" and a updated shopping list', async () => {
    const response = await request(app)
      .put("/shopping-list/updateList/1")
      .set("x-user-profile", "admin")
      .set("Content-Type", "application/json")
      .send({
        name: "Grocery Shopping",
        items: [
          { name: "Milk", amount: 2, unit: "l" },
          { name: "Bread", amount: 1, unit: "pcs" },
          { name: "Eggs", amount: 12, unit: "pcs" },
        ],
        owner: "user1",
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "success",
      message: "Shopping list updated successfully",
      data: {
        name: "Grocery Shopping",
        items: [
          { name: "Milk", amount: 2, unit: "l" },
          { name: "Bread", amount: 1, unit: "pcs" },
          { name: "Eggs", amount: 12, unit: "pcs" },
        ],
        owner: "user1",
      },
    });
  });
  it("returns a 403 status code if the user is not authorized", async () => {
    const response = await request(app)
      .put("/shopping-list/updateList/1")
      .set("x-user-profile", "user");
    expect(response.status).toBe(403);
  });
  it("returns a 404 status code if the shopping list is not found", async () => {
    const response = await request(app)
      .put("/shopping-list/updateList/0")
      .set("x-user-profile", "admin");
    expect(response.status).toBe(404);
  });
});
