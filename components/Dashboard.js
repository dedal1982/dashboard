import ToDoWidget from "./ToDoWidget.js";
import QuoteWidget from "./QuoteWidget.js";
import CurrencyWidget from "./CurrencyWidget.js";

export default class Dashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.widgets = [];
    this.widgetCounter = 0;
  }

  addWidget(widgetType) {
    let widget;
    const id = `widget-${this.widgetCounter++}`;

    switch (widgetType) {
      case "todo":
        widget = new ToDoWidget({ title: "Список дел", id });
        break;

      case "quote":
        widget = new QuoteWidget({ title: "Цитата", id });
        break;

      case "currency":
        widget = new CurrencyWidget({ title: "Курсы валют", id });
        break;

      default:
        console.warn(`Unknown widget type: ${widgetType}`);
        return;
    }

    this.widgets.push({ id, widget });
    const widgetElement = widget.render();
    this.container.appendChild(widgetElement);
  }

  removeWidget(widgetId) {
    const index = this.widgets.findIndex((w) => w.id === widgetId);
    if (index !== -1) {
      this.widgets[index].widget.destroy();
      this.widgets.splice(index, 1);
    }
  }
}
