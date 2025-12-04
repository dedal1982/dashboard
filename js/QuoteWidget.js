import UIComponent from "./UIComponent.js";

export default class QuoteWidget extends UIComponent {
  constructor() {
    super({ title: "Цитата" });
    this.quotes = [
      "Будьте изменением, которое хотите видеть в мире.",
      "Делайте то, что любите, и вы никогда не будете работать.",
      "Успех — это сумма маленьких усилий, повторяемых день за днем.",
      "Верьте в себя и все получится.",
      "Жизнь — это то, что происходит, пока вы строите планы.",
    ];
    this.render();
  }

  render() {
    const container = document.createElement("div");
    container.className = "widget";

    this.quoteText = document.createElement("div");
    this.quoteText.textContent = this.getRandomQuote();

    const btn = document.createElement("button");
    btn.textContent = "Обновить цитату";
    btn.onclick = () => {
      this.quoteText.textContent = this.getRandomQuote();
    };

    container.appendChild(this.quoteText);
    container.appendChild(btn);
    this.element = container;
    return this.element;
  }

  getRandomQuote() {
    const idx = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[idx];
  }
}
