import UIComponent from "./UIComponent.js";

export default class CurrencyWidget extends UIComponent {
  constructor({ title = "Курсы валют", rates = null, id }) {
    super({ title, id });
    this.rates = rates || {
      USD: "95.45",
      EUR: "102.30",
      GBP: "118.20",
    };
  }

  render() {
    this.element = document.createElement("div");
    this.element.className = "widget currency";

    const header = document.createElement("h3");
    header.textContent = this.title.title;

    const controlsContainer = document.createElement("div");
    controlsContainer.style.display = "flex";
    controlsContainer.style.justifyContent = "flex-end";
    controlsContainer.style.gap = "5px";

    const refreshBtn = document.createElement("button");
    refreshBtn.className = "refresh-currency-btn";
    refreshBtn.textContent = "Обновить курсы";

    const minimizeBtn = document.createElement("button");
    minimizeBtn.className = "minimize-btn";
    minimizeBtn.textContent = "—";

    refreshBtn.onclick = () => this.updateRates();
    minimizeBtn.onclick = () => this.minimize();

    controlsContainer.appendChild(minimizeBtn);
    controlsContainer.appendChild(refreshBtn);

    const contentDiv = document.createElement("div");
    contentDiv.className = "content";

    this.ratesContainer = document.createElement("div");
    this.ratesContainer.className = "currency-info";

    this.renderRates();

    const note = document.createElement("div");
    note.className = "currency-note";

    this.element.appendChild(header);
    this.element.appendChild(controlsContainer);
    this.element.appendChild(contentDiv);
    contentDiv.appendChild(this.ratesContainer);
    contentDiv.appendChild(note);

    return this.element;
  }

  renderRates() {
    this.ratesContainer.innerHTML = `
      <div class="currency-rates">
        <div class="currency-rate">
          <span>USD/RUB:</span>
          <span>${this.rates.USD}</span>
        </div>
        <div class="currency-rate">
          <span>EUR/RUB:</span>
          <span>${this.rates.EUR}</span>
        </div>
        <div class="currency-rate">
          <span>GBP/RUB:</span>
          <span>${this.rates.GBP}</span>
        </div>
      </div>
    `;
  }

  updateRates() {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((response) => response.json())
      .then((data) => {
        const usdRate = data.Valute.USD.Value.toFixed(2);
        const eurRate = data.Valute.EUR.Value.toFixed(2);
        const gbpRate = data.Valute.GBP.Value.toFixed(2);

        this.rates = {
          USD: usdRate,
          EUR: eurRate,
          GBP: gbpRate,
        };
        this.renderRates();

        if (typeof this.onStateChange === "function") {
          this.onStateChange();
        }
      })
      .catch((error) => {
        console.error("Ошибка получения курса валют:", error);
      });
  }

  minimize() {
    if (this.element) {
      this.element.classList.toggle("minimized");
    }
  }
}
