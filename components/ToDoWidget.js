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
    header.textContent = this.title.title;

    const controlsContainer = document.createElement("div");
    controlsContainer.style.display = "flex";
    controlsContainer.style.justifyContent = "flex-end";
    controlsContainer.style.gap = "5px";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "X";
    deleteBtn.onclick = () => this.destroy();

    const collapseBtn = document.createElement("button");
    collapseBtn.textContent = "Свернуть";
    collapseBtn.onclick = () => this.minimize();

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

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        li.style.textDecoration = "line-through";
      } else {
        li.style.textDecoration = "";
      }
    });

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";

    deleteBtn.onclick = () => this.deleteTask(li, taskText);

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
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

  minimize() {
    super.minimize();
  }
}
