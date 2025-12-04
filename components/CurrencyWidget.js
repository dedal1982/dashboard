import UIComponent from "./UIComponent.js";

export default class CurrencyWidget extends UIComponent {
  constructor({ title, id, baseCurrency = "USD" }) {
    super({ title, id });
    this.baseCurrency = baseCurrency;
    this.rates = {};
    this.filteredRates = {};
  }

  render = () => {
    this.element = document.createElement("div");
    this.element.className = "widget currency";

    const header = document.createElement("h3");
    header.textContent = this.title.title || "Без названия";
    console.log("Title:", this.title);

    this.searchInput = document.createElement("input");
    this.searchInput.type = "text";
    this.searchInput.placeholder = "Поиск валюты...";
    this.searchInput.addEventListener("input", () => this.filterRates());

    this.refreshBtn = document.createElement("button");
    this.refreshBtn.textContent = "Обновить курсы";

    this.list = document.createElement("ul");

    this.element.appendChild(header);
    this.element.appendChild(this.searchInput);
    this.element.appendChild(this.refreshBtn);
    this.element.appendChild(this.list);

    this.refreshBtn.addEventListener("click", () => this.fetchRates());

    this.fetchRates();

    return this.element;
  };

  fetchRates = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${this.baseCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        this.rates = data.rates;
        this.filterRates();
      })
      .catch((error) => {
        this.list.innerHTML = "<li>Ошибка загрузки данных</li>";
      });
  };

  filterRates = () => {
    const query = this.searchInput.value.toLowerCase();
    this.filteredRates = {};

    for (const [currency, rate] of Object.entries(this.rates)) {
      if (currency.toLowerCase().includes(query)) {
        this.filteredRates[currency] = rate;
      }
    }
    this.renderRates();
  };

  renderRates = () => {
    this.list.innerHTML = "";
    for (const [currency, rate] of Object.entries(this.filteredRates)) {
      const li = document.createElement("li");
      li.textContent = `${currency}: ${rate}`;
      this.list.appendChild(li);
    }
  };

  destroy() {
    super.destroy();
  }
}
