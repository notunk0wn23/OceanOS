import { UIElement } from "./UIElement.js";
import { Window } from "./Window.js";

export class DisplayManager {
    constructor() {
        this.windows = [];
        this.windowContainer = document.createElement("window-area");
        this.windowContainer.style.positon = "relative";
        this.windowContainer.style.display = "block";

        this.windowContainer.style.width = "100%";
        this.windowContainer.style.height = "100%";

        document.body.appendChild(this.windowContainer);
    }

    initializeWindow(config, process) {
        const window = new Window(process, this, config);
        this.windowContainer.appendChild(window.element);
    }
}
