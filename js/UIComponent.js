export default class UIComponent {
  constructor(config = {}) {
    this.id = config.id || `widget-${Date.now()}`;
    this.title = config.title || "";
    this.element = null;
  }

  render() {
    throw new Error("render() должен быть реализован");
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.remove();
    }
  }

  minimize() {
    this.element.classList.toggle("minimized");
  }

  close() {
    this.destroy();
  }
}
