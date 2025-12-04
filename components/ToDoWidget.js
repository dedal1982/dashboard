// components/ToDoWidget.js
import UIComponent from "./UIComponent.js";

export default class ToDoWidget extends UIComponent {
  constructor(title, id) {
    super(title, id);
    this.tasks = [];
  }

  render() {
    this.element = document.createElement("div");
    this.element.className = "widget todo";

    const header = document.createElement("h3");
    header.textContent = this.title;

    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Новая задача";

    const addBtn = document.createElement("button");
    addBtn.textContent = "Добавить";

    this.list = document.createElement("ul");

    addBtn.addEventListener("click", () => this.addTask());

    this.element.appendChild(header);
    this.element.appendChild(this.input);
    this.element.appendChild(addBtn);
    this.element.appendChild(this.list);

    return this.element;
  }

  addTask() {
    const taskText = this.input.value.trim();
    if (taskText) {
      this.tasks.push(taskText);
      this.renderTask(taskText);
      this.input.value = "";
    }
  }

  renderTask(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.addEventListener("click", () => {
      this.deleteTask(li, taskText);
    });

    li.appendChild(deleteBtn);
    this.list.appendChild(li);
  }

  deleteTask(li, taskText) {
    this.tasks = this.tasks.filter((t) => t !== taskText);
    this.list.removeChild(li);
  }

  destroy() {
    super.destroy();
  }
}
