import UIComponent from "./UIComponent.js";

export default class ToDoWidget extends UIComponent {
  constructor({ title, id }) {
    super({ title, id });
    this.tasks = [];
  }

  render = () => {
    this.element = document.createElement("div");
    this.element.className = "widget todo";

    const header = document.createElement("h3");
    header.textContent = this.title;

    const controlsContainer = document.createElement("div");
    controlsContainer.style.display = "flex";
    controlsContainer.style.justifyContent = "flex-end";
    controlsContainer.style.gap = "5px";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.onclick = () => this.destroy();

    const collapseBtn = document.createElement("button");
    collapseBtn.textContent = "Свернуть";
    collapseBtn.onclick = () => {
      const content = this.element.querySelector(".content");
      if (content) {
        content.style.display = content.style.display === "none" ? "" : "none";
      }
    };

    controlsContainer.appendChild(collapseBtn);
    controlsContainer.appendChild(deleteBtn);

    const contentDiv = document.createElement("div");
    contentDiv.className = "content";

    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Новая задача";

    const addBtn = document.createElement("button");
    addBtn.textContent = "Добавить";

    this.list = document.createElement("ul");

    addBtn.addEventListener("click", () => this.addTask());

    contentDiv.appendChild(this.input);
    contentDiv.appendChild(addBtn);
    contentDiv.appendChild(this.list);

    this.element.appendChild(header);
    this.element.appendChild(controlsContainer);
    this.element.appendChild(contentDiv);

    return this.element;
  };

  addTask = () => {
    const taskText = this.input.value.trim();
    if (taskText) {
      this.tasks.push(taskText);
      this.renderTask(taskText);
      this.input.value = "";
    }
  };

  renderTask = (taskText) => {
    const li = document.createElement("li");
    li.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.addEventListener("click", () => {
      this.deleteTask(li, taskText);
    });

    li.appendChild(deleteBtn);
    this.list.appendChild(li);
  };

  deleteTask = (li, taskText) => {
    this.tasks = this.tasks.filter((t) => t !== taskText);
    this.list.removeChild(li);
  };

  destroy() {
    super.destroy();
  }
}
