class DpChip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.createElement();
    this.addEventListener("click", this.handleOnClick);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.handleOnClick);
  }

  // 사용자 정의 이벤트 핸들러 처리
  set oncustomclick(handler) {
    this._oncustomclick = handler;
  }
  get oncustomclick() {
    return this._oncustomclick;
  }

  handleOnClick = (event) => {
    console.debug("event", this, event);
    if (typeof this._oncustomclick === "function") {
      this._oncustomclick(event);
    }
  };

  // draw doms;
  createElement() {
    const shadow = this.shadowRoot;
    const linkStyle = document.createElement("link");
    linkStyle.setAttribute("rel", "stylesheet");
    linkStyle.setAttribute("href", "../../resources/styles/common.css");

    // get attributes
    const isClickable = this.getAttribute("oncustomclick");
    const isLinkable = this.getAttribute("href");
    const attributeNodeArray = [...this.attributes];
    const attrs = attributeNodeArray.reduce(function (attrs, attribute) {
      attrs[attribute.name] = attribute.value;
      return attrs;
    }, {});

    // create container
    let wrapper = isClickable
      ? document.createElement("button")
      : isLinkable
      ? document.createElement("a")
      : document.createElement("span");

    const icon = document.createElement("i");
    const avatarWrapper = document.createElement("span");
    const avatarImg = document.createElement("img");
    avatarWrapper.setAttribute("class", "dp-avatar");
    icon.setAttribute("class", "dp-icon");
    Object.entries(attrs).forEach(function ([key, value]) {
      if (key === "label") {
        wrapper.textContent = value;
      }
      if (key === "oncustomclick") {
        wrapper.setAttribute("onclick", value);
      }
      if (key === "deletable") {
        icon.classList.add("icon-close");
        wrapper.appendChild(icon);
      }
      if (key === "icon") {
        icon.classList.add("icon-check-circle");
        wrapper.insertBefore(icon, wrapper.firstChild);
      }
      wrapper.setAttribute(key, value);
      if (key.includes("avatar")) {
        createAvatar(key, value);
        wrapper.removeAttribute(key);
      }
      wrapper.setAttribute("class", "dp-chip");
    });
    shadow.appendChild(linkStyle);
    shadow.appendChild(wrapper);

    function createAvatar(key, value) {
      switch (key) {
        case "avatar-size":
          avatarWrapper.setAttribute("style", `--aw:${value}; --ah:${value}`);
          break;
        case "avatar-img":
          avatarImg.setAttribute("src", value);
          break;
        case "avatar-alt":
          avatarWrapper.setAttribute("alt", value);
          break;
        default:
          break;
      }
      avatarWrapper.appendChild(avatarImg);
      wrapper.insertBefore(avatarWrapper, wrapper.firstChild);
    }
  }
}

customElements.define("dp-chip", DpChip);
