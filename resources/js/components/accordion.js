class DpAccordion extends HTMLElement {
  constructor() {
    super();
    // component 내부 이벤트 바인딩
    this.attachShadow({ mode: "open" });
    this.shadowRoot.addEventListener("click", this.handleAccordion.bind(this));
  }

  /**
   * TODO: [] 타이틀 영역과 컨텐츠 영역 분리   *
   * TODO: [] SLOT 선언하여 컨텐츠 합성   *
   */
  connectedCallback() {
    this.createElement();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleAccordion);
  }

  // draw doms
  createElement() {
    // create a shadow root
    const shadow = this.shadowRoot;
    const linkStyle = document.createElement("link");
    linkStyle.setAttribute("rel", "stylesheet");
    linkStyle.setAttribute("href", "../../resources/styles/common.css");

    // get attributes
    const hederTitleContent = this.getAttribute("acc-title");
    const contents = this.getAttribute("acc-content");
    const isFlat = this.getAttribute("acc-isflat");
    const isDisable = this.getAttribute("acc-isDisable");
    const isExpand = this.getAttribute("acc-isExpand");

    // create wrapper
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "accordion");

    // create header
    const headerWrapper = document.createElement("div");
    const headerTitle = document.createElement("span");
    const handler = document.createElement("button");

    shadow.appendChild(handler);
    headerWrapper.setAttribute("class", "accordion-header");
    headerTitle.setAttribute("class", "accordion-header-title");
    handler.setAttribute("class", "accordion-header-button");
    headerTitle.textContent = hederTitleContent;
    headerWrapper.appendChild(headerTitle);
    headerWrapper.appendChild(handler);

    // create content
    const content = document.createElement("div");
    const contentsInner = document.createDocumentFragment();
    content.setAttribute("class", "accordion-content");
    contentsInner.textContent = contents; // .appendChild(contents);
    content.appendChild(contentsInner);

    // type change
    if (isFlat !== null && isFlat == "true") {
      wrapper.classList.add("accordion-flat");
    }
    if (isDisable !== null && isDisable == "true") {
      wrapper.classList.add("is-disabled");
    }
    if (isExpand !== null && isExpand == "true") {
      wrapper.classList.add("is-expand");
    }

    // attach the created element to shadow dom
    shadow.appendChild(linkStyle);
    shadow.appendChild(wrapper);
    wrapper.appendChild(headerWrapper);
    wrapper.appendChild(content);
  }
  // event handlers
  handleAccordion(event) {
    if (event.target.matches(".accordion-header-button")) {
      const accordionSection = event.target.closest(".accordion");
      if (!accordionSection.classList.contains("is-disabled")) {
        accordionSection.classList.toggle("is-expand");
      }
    }
  }
}

customElements.define("dp-accordion", DpAccordion);
