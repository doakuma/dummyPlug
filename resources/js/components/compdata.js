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
