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

    // Контейнер для кнопок управления
    const controlsContainer = document.createElement("div");
    controlsContainer.style.display = "flex";
    controlsContainer.style.justifyContent = "flex-end";
    controlsContainer.style.gap = "5px";

    // Кнопка "Удалить"
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.onclick = () => this.destroy();

    // Кнопка "Свернуть"
    const collapseBtn = document.createElement("button");
    collapseBtn.textContent = "Свернуть";
    collapseBtn.onclick = () => this.minimize();

    controlsContainer.appendChild(collapseBtn);
    controlsContainer.appendChild(deleteBtn);

    // Элемент для управления виджетом
    const controlsWrapper = document.createElement("div");
    controlsWrapper.appendChild(controlsContainer);

    // Основное содержимое
    const contentDiv = document.createElement("div");
    contentDiv.className = "content";

    this.searchInput = document.createElement("input");
    this.searchInput.type = "text";
    this.searchInput.placeholder = "Поиск валюты...";
    this.searchInput.addEventListener("input", () => this.filterRates());

    this.refreshBtn = document.createElement("button");
    this.refreshBtn.textContent = "Обновить курсы";

    this.list = document.createElement("ul");

    contentDiv.appendChild(this.searchInput);
    contentDiv.appendChild(this.refreshBtn);
    contentDiv.appendChild(this.list);

    this.element.appendChild(header);
    this.element.appendChild(controlsWrapper);
    this.element.appendChild(contentDiv);

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

  minimize() {
    super.minimize();
  }
}
