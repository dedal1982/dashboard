import UIComponent from "./UIComponent.js";

export default class QuoteWidget extends UIComponent {
  constructor({ title, id }) {
    super(title, id);
    this.quote = "";
  }

  render = () => {
    this.element = document.createElement("div");
    this.element.className = "widget quote";

    const header = document.createElement("h3");
    header.textContent = this.title;

    // Контейнер для кнопок управления
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

    controlsContainer.appendChild(collapseBtn);
    controlsContainer.appendChild(deleteBtn);

    // Обертка для кнопок
    const controlsWrapper = document.createElement("div");
    controlsWrapper.appendChild(controlsContainer);

    // Основное содержимое
    const contentDiv = document.createElement("div");
    contentDiv.className = "content";

    this.quoteText = document.createElement("p");
    this.quoteText.textContent = "Здесь будет цитата";

    const refreshBtn = document.createElement("button");
    refreshBtn.className = "add-btn";
    refreshBtn.textContent = "Обновить цитату";

    refreshBtn.addEventListener("click", () => this.loadQuote());

    contentDiv.appendChild(this.quoteText);
    contentDiv.appendChild(refreshBtn);

    this.element.appendChild(header);
    this.element.appendChild(controlsWrapper);
    this.element.appendChild(contentDiv);

    this.loadQuote();

    return this.element;
  };

  loadQuote = () => {
    const quotes = [
      "Жизнь — это 10% того, что с тобой происходит, и 90% того, как ты на это реагируешь.",
      "Лучший способ предсказать будущее — создать его.",
      "Успех — это способность идти от неудачи к неудаче, не теряя энтузиазма.",
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    this.quoteText.textContent = `"${randomQuote}"`;
  };

  destroy() {
    super.destroy();
  }

  minimize() {
    super.minimize();
  }
}
