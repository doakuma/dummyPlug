/**
 * data and function for Buttons
 * data: buttonData
 * function DrawButtons
 */
var buttonData = {
  contained: [
    {
      className: "dp-button",
      size: "xs",
      variant: "contained",
      color: "",
      label: "Button",
    },
    {
      className: "dp-button",
      size: "md",
      variant: "contained",
      color: "",
      label: "Button",
    },
    {
      className: "dp-button",
      size: "lg",
      variant: "contained",
      color: "",
      label: "Button",
    },
  ],
  outlined: [
    {
      className: "dp-button",
      size: "xs",
      variant: "outlined",
      color: "",
      label: "Button",
    },
    {
      className: "dp-button",
      size: "md",
      variant: "outlined",
      color: "",
      label: "Button",
    },
    {
      className: "dp-button",
      size: "lg",
      variant: "outlined",
      color: "",
      label: "Button",
    },
  ],
  text: [
    {
      className: "dp-button",
      size: "xs",
      variant: "text",
      color: "",
      label: "Button",
    },
    {
      className: "dp-button",
      size: "md",
      variant: "text",
      color: "",
      label: "Button",
    },
    {
      className: "dp-button",
      size: "lg",
      variant: "text",
      color: "",
      label: "Button",
    },
  ],
  disabled: [
    {
      className: "dp-button",
      size: "md",
      variant: "contained",
      color: "",
      label: "Button",
      isDisabled: true,
    },
    {
      className: "dp-button",
      size: "md",
      variant: "outlined",
      color: "",
      label: "Button",
      isDisabled: true,
    },
    {
      className: "dp-button",
      size: "md",
      variant: "text",
      color: "",
      label: "Button",
      isDisabled: true,
    },
  ],
  withIcons: [
    {
      className: "dp-button",
      size: "md",
      variant: "outlined",
      color: "",
      label: "Button",
      hasIcons: true,
      iconName: "rss-simple",
    },
    {
      className: "dp-button",
      size: "md",
      variant: "contained",
      color: "",
      label: "Button",
      hasIcons: true,
      iconName: "rss-simple",
    },
  ],
  onlyIcons: [
    {
      className: "dp-button",
      size: "xs",
      variant: "outlined",
      color: "",
      label: "",
      hasIcons: true,
      iconName: "rss-simple",
    },
    {
      className: "dp-button",
      size: "md",
      variant: "contained",
      color: "",
      label: "",
      hasIcons: true,
      iconName: "rss-simple",
    },
    {
      className: "dp-button",
      size: "lg",
      variant: "outlined",
      color: "",
      label: "",
      hasIcons: true,
      iconName: "rss-simple",
    },
  ],
  colorsPrimary: [
    {
      className: "dp-button",
      size: "md",
      variant: "contained",
      color: "primary",
      label: "Button",
    },
    {
      className: "dp-button",
      size: "md",
      variant: "outlined",
      color: "primary",
      label: "Button",
    },
    {
      className: "dp-button",
      size: "md",
      variant: "text",
      color: "primary",
      label: "Button",
    },
    {
      className: "dp-button",
      size: "md",
      variant: "outlined",
      color: "primary",
      label: "Button",
      hasIcons: true,
      iconName: "rss-simple",
    },
    {
      className: "dp-button",
      size: "md",
      variant: "contained",
      color: "primary",
      label: "",
      hasIcons: true,
      iconName: "rss-simple",
    },
    {
      className: "dp-button",
      size: "md",
      variant: "outlined",
      color: "primary",
      label: "",
      hasIcons: true,
      iconName: "rss-simple",
    },
  ],
  // use in buttons
  buttonGroup: [
    {
      className: "dp-button",
      size: "",
      variant: "",
      color: "",
      label: "Button",
    },
    {
      className: "dp-button",
      size: "",
      variant: "",
      color: "",
      label: "Button",
    },
    {
      className: "dp-button",
      size: "",
      variant: "",
      color: "",
      label: "Button",
    },
  ],
};

var badgeData = [
  {
    colorName: "primary",
    badges: [
      {
        variant: "contained",
        size: "md",
        shade: "light",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "contained",
        size: "md",
        shade: "dark",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "outlined",
        size: "md",
        shade: "light",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "outlined",
        size: "md",
        shade: "dark",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
    ],
  },
  {
    colorName: "secondary",
    badges: [
      {
        variant: "contained",
        size: "md",
        shade: "light",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "contained",
        size: "md",
        shade: "dark",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "outlined",
        size: "md",
        shade: "light",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "outlined",
        size: "md",
        shade: "dark",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
    ],
  },
  {
    colorName: "error",
    badges: [
      {
        variant: "contained",
        size: "md",
        shade: "light",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "contained",
        size: "md",
        shade: "dark",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "outlined",
        size: "md",
        shade: "light",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "outlined",
        size: "md",
        shade: "dark",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
    ],
  },
  {
    colorName: "warning",
    badges: [
      {
        variant: "contained",
        size: "md",
        shade: "light",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "contained",
        size: "md",
        shade: "dark",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "outlined",
        size: "md",
        shade: "light",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "outlined",
        size: "md",
        shade: "dark",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
    ],
  },
  {
    colorName: "info",
    badges: [
      {
        variant: "contained",
        size: "md",
        shade: "light",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "contained",
        size: "md",
        shade: "dark",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "outlined",
        size: "md",
        shade: "light",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "outlined",
        size: "md",
        shade: "dark",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
    ],
  },
  {
    colorName: "success",
    badges: [
      {
        variant: "contained",
        size: "md",
        shade: "light",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "contained",
        size: "md",
        shade: "dark",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "outlined",
        size: "md",
        shade: "light",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
      {
        variant: "outlined",
        size: "md",
        shade: "dark",
        clssName: "dp-badge",
        badgeText: "Badge",
      },
    ],
  },
];

var avatarData = [
  {
    avatarImg: "../../resources/images/@img_avatar.png",
    avatarName: "Jenny Lane",
    avatarSize: {
      aw: 48,
      ah: 48,
    },
  },
  {
    avatarImg: "../../resources/images/@img_avatar.png",
    avatarName: "Jenny Lane",
    avatarSize: {
      aw: 48,
      ah: 48,
    },
  },
  {
    avatarImg: "../../resources/images/@img_avatar.png",
    avatarName: "Jenny Lane",
    avatarSize: {
      aw: 48,
      ah: 48,
    },
  },
  {
    avatarImg: "",
    avatarName: "Jenny Lane",
    avatarSize: {
      aw: 48,
      ah: 48,
    },
  },
  {
    avatarImg: "../../resources/images/@img_avatar.png",
    avatarName: "Jenny Lane",
    avatarSize: {
      aw: 48,
      ah: 48,
    },
  },
];

var chipsData = [
  // {
  //   label: "chip",
  //   size: "md",
  //   variant: "contained",
  //   color: "secondary",
  //   oncustomclick: () => handleClick(),
  //   deletable: true,
  //   href: "#",
  //   disabled: false,
  //   icon: "check-circle",
  //   avatar: {
  //   img: "../../resources/images/@img_avatar.png",
  //   size: "24",
  //   alt: "Jenny Lane",
  //   },
  // },
  {
    label: "with Avatar",
    size: "md",
    variant: "contained",
    color: "primary",
    oncustomclick: () => handleClick(),
    href: "",
    disabled: false,
    icon: "",
    avatar: {
      img: "../../resources/images/@img_avatar.png",
      size: "24",
      alt: "Jenny Lane",
    },
  },
  {
    label: "Deletable",
    size: "md",
    variant: "contained",
    color: "secondary",
    oncustomclick: () => handleClick(),
    deletable: true,
    // href: "#",
    // disabled: false,
    // icon: "check-circle",
    // avatar: {
    // img: "../../resources/images/@img_avatar.png",
    // size: "24",
    // alt: "Jenny Lane",
    // },
  },
  {
    label: "Linkable",
    size: "md",
    variant: "outlined",
    color: "error",
    // oncustomclick: () => handleClick(),
    href: "#",
    // disabled: false,
    // icon: "check-circle",
    // avatar: {
    //   img: "../../resources/images/@img_avatar.png",
    //   size: "24",
    //   alt: "Jenny Lane",
    // },
  },
  {
    label: "Disabled",
    size: "md",
    variant: "contained",
    color: "warning",
    oncustomclick: () => handleClick(),
    // href: "#",
    disabled: true,
    // icon: "check-circle",
    // avatar: {
    //   img: "../../resources/images/@img_avatar.png",
    //   size: "24",
    //   alt: "Jenny Lane",
    // },
  },
  {
    label: "With Icon",
    size: "md",
    variant: "contained",
    color: "info",
    // oncustomclick: () => handleClick(),
    // href: "#",
    // disabled: false,
    icon: "check-circle",
    // avatar: {
    //   img: "../../resources/images/@img_avatar.png",
    //   size: "24",
    //   alt: "Jenny Lane",
    // },
  },
  {
    label: "Default",
    size: "md",
    variant: "contained",
    color: "success",
    // oncustomclick: () => handleClick(),
    // href: "#",
    // disabled: false,
    // icon: "check-circle",
    // avatar: {
    //   img: "../../resources/images/@img_avatar.png",
    //   size: "24",
    //   alt: "Jenny Lane",
    // },
  },
];

var tooltipData = [
  {
    size: "md",
    label: "Tooltip top",
    origin: "top",
    isarrow: "true",
    title: "Tooltip Component",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis veritatis reprehenderit eveniet excepturi, nulla obcaecati cumque quibusdam earum! Odit quasi accusantium placeat accusamus natus iure eius labore quaerat ducimus sed!",
    isclickable: "false",
    isrich: "false",
  },
  {
    size: "md",
    label: "Tooltip topRight",
    origin: "topRight",
    isarrow: "true",
    title: "Tooltip Component",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis veritatis reprehenderit eveniet excepturi, nulla obcaecati cumque quibusdam earum! Odit quasi accusantium placeat accusamus natus iure eius labore quaerat ducimus sed!",
    isclickable: "false",
    isrich: "false",
  },
  {
    size: "md",
    label: "Tooltip right",
    origin: "right",
    isarrow: "true",
    title: "Tooltip Component",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis veritatis reprehenderit eveniet excepturi, nulla obcaecati cumque quibusdam earum! Odit quasi accusantium placeat accusamus natus iure eius labore quaerat ducimus sed!",
    isclickable: "false",
    isrich: "false",
  },
  {
    size: "md",
    label: "Tooltip bottomRight",
    origin: "bottomRight",
    isarrow: "true",
    title: "Tooltip Component",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis veritatis reprehenderit eveniet excepturi, nulla obcaecati cumque quibusdam earum! Odit quasi accusantium placeat accusamus natus iure eius labore quaerat ducimus sed!",
    isclickable: "false",
    isrich: "false",
  },
  {
    size: "md",
    label: "Tooltip bottom",
    origin: "bottom",
    isarrow: "true",
    title: "Tooltip Component",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis veritatis reprehenderit eveniet excepturi, nulla obcaecati cumque quibusdam earum! Odit quasi accusantium placeat accusamus natus iure eius labore quaerat ducimus sed!",
    isclickable: "false",
    isrich: "false",
  },
  {
    size: "md",
    label: "Tooltip bottomLeft",
    origin: "bottomLeft",
    isarrow: "true",
    title: "Tooltip Component",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis veritatis reprehenderit eveniet excepturi, nulla obcaecati cumque quibusdam earum! Odit quasi accusantium placeat accusamus natus iure eius labore quaerat ducimus sed!",
    isclickable: "false",
    isrich: "false",
  },
  {
    size: "md",
    label: "Tooltip left",
    origin: "left",
    isarrow: "true",
    title: "Tooltip Component",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis veritatis reprehenderit eveniet excepturi, nulla obcaecati cumque quibusdam earum! Odit quasi accusantium placeat accusamus natus iure eius labore quaerat ducimus sed!",
    isclickable: "false",
    isrich: "false",
  },
  {
    size: "md",
    label: "Tooltip topleft",
    origin: "topLeft",
    isarrow: "true",
    title: "Tooltip Component",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis veritatis reprehenderit eveniet excepturi, nulla obcaecati cumque quibusdam earum! Odit quasi accusantium placeat accusamus natus iure eius labore quaerat ducimus sed!",
    isclickable: "true",
    isrich: "false",
  },
];

function DrawTooltip(target, rich) {
  var wrapper = document.querySelector(`#${target}`);
  tooltipData.forEach(function (item, idx) {
    var _tooltip = document.createElement("dp-tooltip");
    Object.entries(item).forEach(function ([key, value]) {
      _tooltip.setAttribute(key, value);
      if (rich) {
        _tooltip.setAttribute("isrich", rich);
      }
    });
    wrapper.appendChild(_tooltip);
  });
}

function DrawButtons(target, buttons, colors) {
  var wrapper = document.querySelector(target);
  var data = buttonData[buttons];
  data.forEach(function (item) {
    var _btn = document.createElement("button");
    var _icon = document.createElement("i");
    var {
      className,
      size,
      variant,
      color,
      label,
      hasIcons,
      iconName,
      isDisabled,
    } = item;
    console.debug("item", item);
    _btn.setAttribute("class", className);
    if (size) {
      _btn.setAttribute("size", size);
    }
    if (variant) {
      _btn.setAttribute("variant", variant);
    }
    if (color) {
      _btn.setAttribute("color", colors);
    }
    if (isDisabled) {
      _btn.setAttribute("disabled", isDisabled);
    }
    if (hasIcons) {
      if (label) {
        _btn.classList.add("dp-button-icon-with");
      } else {
        _btn.classList.add("dp-button-icon");
      }
      _icon.setAttribute("class", "dp-icon");
      _icon.classList.add(`icon-${iconName}`);
      _btn.textContent = label;
      _btn.appendChild(_icon);
    } else {
      _btn.textContent = label;
    }
    wrapper.appendChild(_btn);
  });
}

function DrawBadges(target) {
  var _target = document.querySelector(target);

  badgeData.forEach(function (item) {
    var { colorName, badges } = item;
    var wrapper = document.createElement("div");
    wrapper.textContent = colorName;
    wrapper.setAttribute("class", "box-section-cont");
    badges.forEach(function (badge) {
      var { variant, size, shade, clssName, badgeText } = badge;
      var _badge = document.createElement("span");
      _badge.setAttribute("class", clssName);
      _badge.setAttribute("size", size);
      _badge.setAttribute("shade", shade);
      _badge.setAttribute("variant", variant);
      _badge.setAttribute("color", colorName);
      _badge.textContent = badgeText;
      wrapper.appendChild(_badge);
    });
    _target.appendChild(wrapper);
  });
}
function DrawAvatarGroup(target, colors) {
  var _target = document.querySelector(target);
  var wrapper = document.createElement("div");
  wrapper.setAttribute("class", "box-section-cont");
  var groupMax = _target.getAttribute("max");
  var groupTotal = _target.getAttribute("total");
  var groupLength = groupMax
    ? avatarData.length - groupMax
    : groupTotal
    ? groupTotal - avatarData.length
    : avatarData.length;
  var groups = groupMax ? avatarData.slice(groupLength) : avatarData;
  var moreInfo = document.createElement("span");
  moreInfo.setAttribute("class", "dp-avatar more");

  if (groupMax) {
    moreInfo.textContent = `+${groupLength}`;
    _target.appendChild(moreInfo);
  }
  if (groupTotal) {
    moreInfo.textContent = `+${groupLength}`;
    _target.appendChild(moreInfo);
  }

  groups.forEach(function (item) {
    var { avatarImg, avatarName, avatarSize } = item;
    var avatar = document.createElement("span");
    avatar.setAttribute("class", "dp-avatar");
    avatar.setAttribute(
      "style",
      `--aw: ${avatarSize.aw}; --ah: ${avatarSize.ah}; `
    );
    moreInfo.setAttribute(
      "style",
      `--aw: ${avatarSize.aw}; --ah: ${avatarSize.ah}; `
    );
    if (colors) {
      avatar.setAttribute("color", colors);
    }

    if (avatarImg) {
      var avatarImgs = document.createElement("img");
      avatarImgs.setAttribute("src", avatarImg);
      avatarImgs.setAttribute("alt", avatarName);
      avatar.appendChild(avatarImgs);
    } else {
      avatar.textContent = "JL";
    }
    _target.appendChild(avatar);
  });
  // _target.appendChild(wrapper);
}
function DrawChips(target, colors) {
  var _target = document.querySelector(target);

  chipsData.forEach(function (item) {
    var {
      label,
      size,
      variant,
      color,
      oncustomclick,
      href,
      disabled,
      icon,
      avatar,
      deletable,
    } = item;
    var wrapper = document.createElement("dp-chip");
    wrapper.setAttribute("label", label);
    wrapper.setAttribute("size", size);
    wrapper.setAttribute("variant", variant);
    wrapper.setAttribute("color", colors);
    if (oncustomclick) {
      wrapper.setAttribute("oncustomclick", oncustomclick);
    }
    if (href) {
      wrapper.setAttribute("href", href);
    }
    if (deletable) {
      wrapper.setAttribute("deletable", deletable);
    }
    if (disabled) {
      wrapper.setAttribute("disabled", disabled);
    }
    if (icon) {
      wrapper.setAttribute("icon", icon);
    }
    if (avatar) {
      var { img, size, alt } = avatar;
      wrapper.setAttribute("avatar-img", img);
      wrapper.setAttribute("avatar-size", size);
      wrapper.setAttribute("avatar-alt", alt);
    }
    _target.appendChild(wrapper);
  });
}
