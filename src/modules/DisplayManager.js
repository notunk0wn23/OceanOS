import { UIElement } from "./UIElement.js";

export class DisplayManager {
  constructor() {
    this.windows = [];
    this.windowContainer = document.createElement("window-area")
    this.windowContainer.positon = "relative"
    this.windowContainer.display = "inline-block"

    this.windowContainer.style.width = "90%"
    this.windowContainer.style.minHeight = "500px"

    document.body.appendChild(this.windowContainer)
  }

  initializeWindow(window) {
    let localWindow = window;
    let windowElement = document.createElement("window");
    let titlebar = document.createElement("window-title");
    let contentContainer = document.createElement("window-content");

    windowElement.style.display = "block"
    contentContainer.style.display = "block"
    titlebar.style.display = "block"

    titlebar.style.backgroundColor = "#2c2c2c"
    titlebar.style.width = "100%"
    titlebar.style.height = "25px";

    localWindow.element = windowElement;

    localWindow.element.style.overflow = "hidden";
    localWindow.element.style.position = "relative";
    localWindow.element.style.width = window.width + "px";
    localWindow.element.style.height = window.height + "px";

    contentContainer.width = "100%"
    contentContainer.height = localWindow.element.style.height;

    // Dragging 
    let offsetX, offsetY;

    titlebar.addEventListener("mousedown", onMouseDown);

    function onMouseDown(e) {
      offsetX = e.clientX - localWindow.element.offsetLeft;
      offsetY = e.clientY -  localWindow.element.offsetTop;
      localWindow.element.addEventListener("mousemove", onMouseMove);
      localWindow.element.addEventListener("mouseup", onMouseUp);
      localWindow.element.addEventListener("mouseleave", onMouseUp);
    }

    function onMouseMove(e) {
      localWindow.element.style.left = `${e.clientX - offsetX}px`;
      localWindow.element.style.top = `${e.clientY - offsetY}px`;
    }

    function onMouseUp() {
      localWindow.element.removeEventListener("mousemove", onMouseMove);
      localWindow.element.removeEventListener("mouseup", onMouseUp);
      localWindow.element.removeEventListener("mouseleave", onMouseUp);
    }
    if (localWindow.style) {
      Object.assign(windowElement.style, localWindow.style);
    }

    localWindow.children.forEach((component) =>
      this.renderComponent(component, contentContainer),
    );

    this.windows.push(localWindow);
    localWindow.element.appendChild(titlebar)
    localWindow.element.appendChild(contentContainer)
    this.windowContainer.appendChild(localWindow.element);
  }

  renderComponent(component, container) {
    const element = document.createElement(component.type);
    if (component.text) {
      element.textContent = component.text;
    }
    element.style.position = "relative"; // Ensure absolute positioning for geometry
    if (component.geometry) {
      if (typeof component.geometry.x == "number") {
        element.style.left = component.geometry.x + "px";
      } else {
        element.style.left = component.geometry.x;
      }
      if (typeof component.geometry.y == "number") {
        element.style.top = component.geometry.y + "px";
      } else {
        element.style.top = component.geometry.y;
      }
      element.style.width = component.geometry.width + "px";
      element.style.height = component.geometry.height + "px";
    }
    if (component.style) {
      Object.assign(element.style, component.style);
    }

    if (component.onClick) {
      element.addEventListener("click", component.onClick);
    }
    if (component.children) {
      component.children.forEach((child) => this.renderComponent(child));
    }

    container.appendChild(element);
    if (component.onLoad) {
      component.onLoad();
    }
  }
}
