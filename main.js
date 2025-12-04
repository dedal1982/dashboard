import Dashboard from "./components/Dashboard.js";

const dashboard = new Dashboard("dashboard-container");

document.getElementById("add-todo-btn").addEventListener("click", () => {
  dashboard.addWidget("todo");
});

document.getElementById("addQuote").addEventListener("click", () => {
  dashboard.addWidget("quote");
});

document.getElementById("addCurrency").addEventListener("click", () => {
  dashboard.addWidget("currency");
});
