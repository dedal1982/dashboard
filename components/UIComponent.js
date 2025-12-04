export default class UIComponent {
  constructor(title, id) {
    if (new.target === UIComponent) {
      throw new TypeError(
        "Cannot instantiate abstract class UIComponent directly"
      );
    }
    this.title = title;
    this.id = id;
    this.element = null; // DOM-элемент компонента
  }

  render() {
    // Пока возвращает пустой div
    this.element = document.createElement("div");
    this.element.id = this.id;
    return this.element;
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.element = null;
  }
}
