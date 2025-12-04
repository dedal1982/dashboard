import ToDoWidget from "./ToDoWidget.js";
import QuoteWidget from "./QuoteWidget.js";

export default class Dashboard {
  constructor(container) {
    this.container = container;
    this.widgets = {};
  }

  addWidget(type) {
    let widgetInstance;
    if (type === "todo") {
      widgetInstance = new ToDoWidget();
    } else if (type === "quote") {
      widgetInstance = new QuoteWidget();
    } else {
      console.warn("Неизвестный тип виджета");
      return;
    }
    this.widgets[widgetInstance.id] = widgetInstance;
    this.container.appendChild(widgetInstance.render());
  }

  removeWidget(widgetId) {
    const widget = this.widgets[widgetId];
    if (widget) {
      widget.destroy();
      delete this.widgets[widgetId];
    }
  }
}
