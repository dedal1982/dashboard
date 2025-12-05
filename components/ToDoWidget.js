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
    deleteBtn.textContent = "✕";
    deleteBtn.onclick = () => this.destroy();

    const collapseBtn = document.createElement("button");
    collapseBtn.className = "collapse-btn";
    collapseBtn.textContent = "—";
    collapseBtn.onclick = () => this.minimize();

    controlsContainer.appendChild(collapseBtn);
    controlsContainer.appendChild(deleteBtn);

    const contentDiv = document.createElement("div");
    contentDiv.className = "content";

    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Новая задача";

    const addBtn = document.createElement("button");
    addBtn.className = "add-btn";
    addBtn.textContent = "Добавить";

    this.list = document.createElement("ul");
    this.list.classList.add("task-list");

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

    // Создаем span для текста задачи
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        taskSpan.style.textDecoration = "line-through";
      } else {
        taskSpan.style.textDecoration = "";
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "task-btn";
    deleteBtn.textContent = "Удалить";

    deleteBtn.onclick = () => this.deleteTask(li, taskText);

    // Вставляем чекбокс, текст и кнопку в li
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);

    this.list.appendChild(li);
  };

  deleteTask = (liElement, taskText) => {
    this.list.removeChild(liElement);
    this.tasks = this.tasks.filter((task) => task !== taskText);
  };

  destroy() {
    super.destroy();
  }

  minimize() {
    super.minimize();
  }
}
