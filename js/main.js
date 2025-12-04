import Dashboard from "./Dashboard.js";

const dashboard = new Dashboard(document.getElementById("dashboard"));

document.getElementById("addTodo").addEventListener("click", () => {
  dashboard.addWidget("todo");
});
document.getElementById("addQuote").addEventListener("click", () => {
  dashboard.addWidget("quote");
});
