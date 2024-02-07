class DpTooltip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.tooltipButton = document.createElement("button");
    this.tooltipWrap = document.createElement("div");
    this.tooltipTitle = document.createElement("div");
    this.tooltipContent = document.createElement("div");
    this.visible = false;

    const attributeNodeArray = [...this.attributes];
    this.state = attributeNodeArray.reduce(function (attrs, attribute) {
      attrs[attribute.name] = attribute.value;
      return attrs;
    }, {});

    console.debug("this.state", this.state, this.state.isclickable);

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
    const { top, left, height } = this.tooltipButton.getBoundingClientRect();
    const tooltipWidth = this.tooltipWrap.offsetWidth;
    const tooltipHeight = this.tooltipWrap.offsetHeight;

    // 툴팁 위치 계산
    const x = left + (this.tooltipButton.offsetWidth - tooltipWidth) / 2;
    const y = top + height + 10;
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
    const { title, content, isrich } = this.state;
    isrich && this.tooltipWrap.setAttribute("variant", "rich");
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
    document.body.appendChild(this.tooltipWrap);
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
