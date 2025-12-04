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

    this.quoteText = document.createElement("p");
    this.quoteText.textContent = "Здесь будет цитата";

    const refreshBtn = document.createElement("button");
    refreshBtn.textContent = "Обновить цитату";

    refreshBtn.addEventListener("click", () => this.loadQuote());

    this.element.appendChild(header);
    this.element.appendChild(this.quoteText);
    this.element.appendChild(refreshBtn);

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
}
