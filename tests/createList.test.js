const request = require("supertest");
const app = require("../src/app");

describe("POST /shopping-list/createList", () => {
  it('returns a "status": "success" and a created shopping list', async () => {
    const response = await request(app)
      .post("/shopping-list/createList")
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
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      status: "success",
      message: "Shopping list created successfully",
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
  it("returns a 400 status code if the request body is empty", async () => {
    const response = await request(app)
      .post("/shopping-list/createList")
      .set("x-user-profile", "admin")
      .set("Content-Type", "application/json")
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      status: "error",
      message: "Request body cannot be empty",
      data: {},
    });
  });
  it("returns a 400 status code if the request body is invalid", async () => {
    const response = await request(app)
      .post("/shopping-list/createList")
      .set("x-user-profile", "admin")
      .set("Content-Type", "application/json")
      .send({
        name: "",
        items: [
          { name: "Milk", amount: 2, unit: "l" },
          { name: "Bread", amount: 1, unit: "pcs" },
          { name: "Eggs", amount: 12, unit: "pcs" },
        ],
        owner: "user1",
      });
    expect(response.status).toBe(400);
  });
  it('returns a "status": "success" and a created shopping list', async () => {
    const response = await request(app)
      .post("/shopping-list/createList")
      .set("x-user-profile", "user")
      .set("Content-Type", "application/json");
    expect(response.status).toBe(403);
  });
});
