export default class UIComponent {
  constructor(title, id) {
    if (new.target === UIComponent) {
      throw new TypeError(
        "Cannot instantiate abstract class UIComponent directly"
      );
    }
    this.title = title;
    this.id = id;
    this.element = null;
  }

  render() {
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
