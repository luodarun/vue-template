/* eslint-disable no-unused-vars */
const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();
const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();
const handleClick = e => {
  var selfContextMenuDiv = window.document.querySelector(".selfContextMenu");
  selfContextMenuDiv && window.document.body.removeChild(selfContextMenuDiv);
};
export default {
  bind(el, binding, vnode) {
    on(el, "contextmenu", e => {
      console.log("vnode", e);
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        window.event.returnValue = false;
      }
      var selfContextMenuDiv = window.document.querySelector(
        ".selfContextMenu"
      );
      selfContextMenuDiv &&
        window.document.body.removeChild(selfContextMenuDiv);
      var div = document.createElement("div");
      div.className = "selfContextMenu";
      div.style.width = "120px";
      div.style.background = "#fff";
      div.style.position = "absolute";
      div.style.top = e.pageY + "px";
      div.style.left = e.pageX + 10 + "px";
      div.style.boxShadow = "0 2px 12px 0 rgba(0, 0, 0, 0.22)";
      let tempMenu = binding.value();
      for (let i = 0; i < tempMenu.length; i++) {
        var childDiv = document.createElement("div");
        childDiv.style.height = "30px";
        childDiv.style.lineHeight = "30px";
        childDiv.style.padding = "0 20px";
        childDiv.innerText = tempMenu[i].name;
        on(childDiv, "mouseenter", function(mouseenterEvent) {
          this.style.background = "#f0f2f5";
        });
        on(childDiv, "mouseleave", function(mouseleaveEvent) {
          this.style.background = "#fff";
        });
        on(childDiv, "click", function(clickEvent) {
          tempMenu[i].callbackFn(clickEvent);
          window.document.body.removeChild(div);
        });
        div.appendChild(childDiv);
      }
      window.document.body.appendChild(div);
    });
    on(window.document.body, "click", handleClick);
  },
  unbind() {
    off(window.document.body, "click", handleClick);
  }
};
