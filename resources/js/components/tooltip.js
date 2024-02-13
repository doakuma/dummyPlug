class DpTooltip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.tooltipButton = document.createElement("button");
    this.tooltipWrap = document.createElement("div");
    this.tooltipTitle = document.createElement("div");
    this.tooltipContent = document.createElement("div");
    this.visible = false;

    this.state = {
      size: "",
      label: "",
      origin: "",
      isarrow: "",
      title: "",
      content: "",
      isclickable: "",
      isrich: "",
    };

    // regist document clck event
    document.addEventListener("click", this.onDocumentclick.bind(this));
  }

  // show tooltip
  showTooltip() {
    this.visible = true;

    this.createTooltip();
    this.setPosition();
  }
  // hide tooltip
  hideTooltip() {
    this.visible = false;
    // this.tooltipWrap.removeAttribute("isVisible");
    this.removeTooltip();
  }
  // tooltip position
  setPosition() {
    const { origin } = this.state;
    const { top, left, height } = this.tooltipButton.getBoundingClientRect();
    let x = 0;
    let y = 0;
    const tooltipWidth = this.tooltipWrap.offsetWidth;
    const tooltipHeight = this.tooltipWrap.offsetHeight;
    const tooltipButtonWidth = this.tooltipButton.offsetWidth;
    const tooltipButtonHeight = this.tooltipButton.offsetHeight;

    // 툴팁 위치 계산
    switch (origin) {
      case "right":
        x = left + tooltipButtonWidth + 10;
        y = top + tooltipButtonHeight / 2 - tooltipHeight / 2;
        break;
      case "bottom":
        x = left + (tooltipButtonWidth - tooltipWidth) / 2;
        y = top + height + 10;
        break;
      case "left":
        x = left - tooltipWidth - 10;
        y = top + tooltipButtonHeight / 2 - tooltipHeight / 2;
        break;
      case "topLeft":
        x = left - tooltipWidth - 10;
        y = top - tooltipHeight + tooltipButtonHeight / 2;
        break;
      case "topRight":
        x = left + tooltipButtonWidth + 10;
        y = top - tooltipHeight + tooltipButtonHeight / 2;
        break;
      case "bottomRight":
        x = left + tooltipButtonWidth + 10;
        y = top + tooltipButtonHeight / 2;
        break;
      case "bottomLeft":
        x = left - tooltipWidth - 10;
        y = top + tooltipButtonHeight / 2;
        break;
      default:
        x = left + (tooltipButtonWidth - tooltipWidth) / 2;
        y = top - tooltipHeight - 10;
        break;
    }

    // 툴팁 위치 설정
    this.tooltipWrap.style.left = `${x}px`;
    this.tooltipWrap.style.top = `${y}px`;
  }
  // create element
  createElement() {
    const shadow = this.shadowRoot;
    const linkStyle = document.createElement("link");
    linkStyle.setAttribute("rel", "stylesheet");
    linkStyle.setAttribute("href", "../../resources/styles/common.css");
    const attributeNodeArray = [...this.attributes];
    const attrs = attributeNodeArray.reduce(function (attrs, attribute) {
      attrs[attribute.name] = attribute.value;
      return attrs;
    }, {});

    if (attrs) {
      this.state = { ...attrs };
    }
    // clickable 일 때 클릭 이벤트 등록 아니면 mouseenter / mouseleave 이벤트 등록
    if (this.state.isclickable === "true") {
      this.tooltipButton.addEventListener("click", this.handleClick.bind(this));
    } else {
      this.tooltipButton.addEventListener(
        "mouseenter",
        this.showTooltip.bind(this)
      );
      this.tooltipButton.addEventListener(
        "mouseleave",
        this.hideTooltip.bind(this)
      );
    }

    this.tooltipButton.setAttribute("class", "dp-button");
    this.tooltipButton.textContent = this.state.label;
    this.tooltipButton.setAttribute("size", this.state.size);
    this.tooltipButton.setAttribute("variant", "contained");
    shadow.appendChild(linkStyle);
    shadow.appendChild(this.tooltipButton);
  }
  // create tooltip
  createTooltip() {
    this.tooltipWrap.setAttribute("class", "dp-tooltip");
    this.tooltipWrap.setAttribute("isVisible", this.visible);
    const { title, content, isrich, isarrow } = this.state;
    isrich === "true" && this.tooltipWrap.setAttribute("variant", "rich");
    this.tooltipTitle.setAttribute("class", "dp-tooltip-subhead");
    this.tooltipContent.setAttribute("class", "dp-tooltip-cont");
    if (isrich === "true") {
      this.tooltipTitle.textContent = title;
      this.tooltipContent.textContent = content;
    } else {
      this.tooltipContent.textContent = title;
    }
    this.tooltipWrap.appendChild(this.tooltipTitle);
    this.tooltipWrap.appendChild(this.tooltipContent);
    isarrow && this.createArrow();
    document.body.appendChild(this.tooltipWrap);
  }
  createArrow() {
    const { origin } = this.state;
    const arrow = document.createElement("span");
    arrow.setAttribute("origin", origin);
    arrow.setAttribute("class", "dp-tooltip-arrow");
    this.tooltipWrap.appendChild(arrow);
  }
  // remove tooltip
  removeTooltip() {
    document.body.removeChild(this.tooltipWrap);
  }
  // handle click event
  handleClick() {
    // console.debug("handleClick");
    this.showTooltip();
  }
  // remove tooltip when click outside tooltip area
  onDocumentclick(event) {
    const isTooltip = event.target.closest(".dp-tooltip-cont");
    const isButton = event
      .composedPath()
      .some((element) => element === this.tooltipButton);
    if (!isTooltip && !isButton && this.visible) {
      this.hideTooltip();
    }
  }
  // connected
  connectedCallback() {
    this.createElement();
  }
  // change attributes
  attributeChangeCallback(size, label, isRich, title, content) {
    console.debug("attributeChangeCallback", label, isRich, title, content);
    // if (name === "title" || name === "isrich" || name === "content") {
    //   // this._hideTooltip();
    //   this.createTooltip();
    // }
  }
  // declare component
  static get observedAttributes() {
    return ["size", "label", "isRich", "title", "content"];
  }
}

customElements.define("dp-tooltip", DpTooltip);
