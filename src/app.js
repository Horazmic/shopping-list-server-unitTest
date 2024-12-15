const express = require("express");

const shoppingListRoutes = require("./routes/shopping-list");
const app = express();

app.use(express.json());

app.use("/shopping-list", shoppingListRoutes);

module.exports = app;
