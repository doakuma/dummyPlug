class DpAlertSticky extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.addEventListener("click", this.handleAlert.bind(this));
  }

  connectedCallback() {
    this.createElement();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleAlert);
  }

  createElement() {
    // create a shadow root
    const shadow = this.shadowRoot;
    const linkStyle = document.createElement("link");
    const shadowStyle = document.createElement("style");
    // shadowStyle.textContent = slotStyle;
    linkStyle.setAttribute("rel", "stylesheet");
    linkStyle.setAttribute("href", "../../resources/styles/common.css");

    // get attributes
    const alertContent = this.getAttribute("alert-text");
    const alertIconType = this.getAttribute("alert-icon-type");
    const alertVariant = this.getAttribute("alert-variant");

    // create wrapper
    const wrapper = document.createElement("div");

    // create content
    const contentWrap = document.createDocumentFragment();
    const icon = document.createElement("div");
    const content = document.createElement("p");
    const buttons = document.createElement("div");
    const closeButton = document.createElement("button");
    const slotPrimary = document.createElement("slot");
    const slotSecondary = document.createElement("slot");

    // set attribute
    wrapper.setAttribute("class", "alert-sticky");
    wrapper.setAttribute("variant", alertVariant);
    icon.setAttribute("class", "dp-icon");
    icon.classList.add(`icon-${alertIconType}`);
    content.setAttribute("class", "alert-sticky-content");
    content.textContent = alertContent;
    slotPrimary.setAttribute("name", "alert-button-primary");
    slotSecondary.setAttribute("name", "alert-button-secondary");
    buttons.setAttribute("class", "dp-button-group");
    buttons.setAttribute("gap", "8");
    closeButton.setAttribute("class", "dp-button dp-button-icon dp-close");
    closeButton.setAttribute("size", "md");

    // append children
    /**
     * TODO: attirbute에 따른 appendchild 분기 처리 필요
     */
    buttons.appendChild(slotSecondary);
    buttons.appendChild(slotPrimary);
    buttons.appendChild(closeButton);
    contentWrap.appendChild(icon);
    contentWrap.appendChild(content);
    contentWrap.appendChild(buttons);

    // attach the created element to shadow dom
    shadow.appendChild(linkStyle);
    shadow.appendChild(shadowStyle);
    shadow.appendChild(wrapper);
    wrapper.appendChild(contentWrap);
  }

  handleAlert(target, handleType, origin, autohide) {
    if (!target) return;
    var _target = document.querySelector(target);

    // origin
    if (origin) {
      _target.setAttribute("origin", origin);
    }
    // handletype
    if (handleType === "open") {
      _target.classList.add("is-visible");
    } else {
      _target.classList.remove("is-visible");
    }

    // autohide : millisecond
    if (autohide) {
      setTimeout(function () {
        _target.classList.remove("is-visible");
      }, autohide * 1000);
    }
  }
}

const slotStyle = `
.alert-sticky {
  &[variant="dark"] {
    background-color: var(--color-primary-dark);
    .alert-sticky-content {
      color: var(--gray-50);
    }
    .dp-icon,
    .dp-button-icon {
      filter: var(--icon-use-in-dark);
    }
    ::slotted(.dp-button[variant="text"]) {
      color: var(--suface-primary) !important;
    }
    ::slotted(.dp-button[variant="outlined"]) {
      color: var(--suface-primary) !important;
      border-color: var(--suface-primary) !important;
    }
  }
  &[variant="light"] {
    background-color: var(--color-primary-light);
    .alert-sticky-content {
      color: var(--gray-50);
    }
    .dp-icon,
    .dp-button-icon {
      filter: var(--icon-use-in-dark);
    }
    ::slotted(.dp-button[variant="text"]) {
      color: var(--suface-primary) !important;
    }
    ::slotted(.dp-button[variant="outlined"]) {
      color: var(--suface-primary) !important;
      border-color: var(--suface-primary) !important;
    }
  }
}
`;

customElements.define("dp-alert-sticky", DpAlertSticky);
