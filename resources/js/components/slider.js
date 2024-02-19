class DpSlider extends HTMLElement {
  constructor(selector, props = {}) {
    super();

    console.debug("dp-slider", selector, props);
  }
}

customElements.define("dp-slider", DpSlider);
