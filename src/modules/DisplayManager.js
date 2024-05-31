import { UIElement } from "./UIElement.js";
/*
 * OK so everything af
 *
 *
 *
 *
 *
 * */

const app = {
    width: 100,
    height: 100,
    title: "Example App",
    children: [
        {
            type: "button",
            text: "Hello World",
            geometry: {
                x: 0,
                y: 0,
                width: 50,
                height: 100,
            },
            onClick: function() {
                console.log("Hello world button pressed");
            },
        },
    ],
};

export class DisplayManager {
    constructor() {
        this.windows = [];
    }

    initializeWindow(window) {
        let localWindow = window;
        let windowElement = document.createElement("div");
        localWindow.element = windowElement;

        localWindow.element.style.overflow = "hidden";
        localWindow.element.style.width = window.width + "px";
        localWindow.element.style.height = window.height + "px";

        localWindow.children.forEach((component) =>
            this.renderComponent(component, localWindow.element),
        );

        this.windows.push(localWindow);
        document.body.appendChild(localWindow.element);
    }

    renderComponent(component, container) {
        const element = document.createElement(component.type);
        if (component.text) {
            element.textContent = component.text;
        }
        element.style.position = "relative"; // Ensure absolute positioning for geometry
        if (component.geometry) {
            element.style.left = component.geometry.x + "px";
            element.style.top = component.geometry.y + "px";
            element.style.width = component.geometry.width + "px";
            element.style.height = component.geometry.height + "px";
        }
        if (component.style) {
            Object.assign(element.style, component.style);
        }
        if (component.children) {
            component.children.forEach((child) => this.renderComponent(child));
        }
        container.appendChild(element);
    }
}
