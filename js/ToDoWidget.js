import UIComponent from "./UIComponent.js";

export default class ToDoWidget extends UIComponent {
  constructor() {
    super({ title: "Список дел" });
    this.tasks = [];
    this.render();
  }

  render() {
    const container = document.createElement("div");
    container.className = "widget";

    container.innerHTML = `
      <h2>${this.title}</h2>
      <input type="text" placeholder="Добавить задачу" id="${this.id}-input"/>
      <button id="${this.id}-add">Добавить</button>
      <ul id="${this.id}-list"></ul>
    `;

    // Обработчик добавления
    const input = container.querySelector(`#${this.id}-input`);
    const btnAdd = container.querySelector(`#${this.id}-add`);
    btnAdd.addEventListener("click", () => {
      const taskText = input.value.trim();
      if (!taskText) return;
      this.addTask(taskText);
      input.value = "";
    });

    this.element = container;
    return this.element;
  }

  addTask(text) {
    const task = { text, completed: false, id: `task-${Date.now()}` };
    this.tasks.push(task);
    this.updateList();
  }

  updateList() {
    const list = this.element.querySelector(`#${this.id}-list`);
    list.innerHTML = "";
    this.tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.text;
      if (task.completed) li.style.textDecoration = "line-through";

      // Отметка выполненного
      li.onclick = () => {
        task.completed = !task.completed;
        this.updateList();
      };

      // Удаление
      const delBtn = document.createElement("button");
      delBtn.textContent = "✗";
      delBtn.onclick = (e) => {
        e.stopPropagation();
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
        this.updateList();
      };
      li.appendChild(delBtn);

      list.appendChild(li);
    });
  }
}
