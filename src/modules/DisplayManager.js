import { UIElement } from "./UIElement.js";
import { Window } from "./Window.js";

export class DisplayManager {
    constructor() {
        document.body.style.margin = "0px"
        this.wallpaperElement = document.createElement("img")
        this.wallpaperElement.src = "https://wallpapercave.com/wp/EpnMhl1.png"
        this.wallpaperElement.style.width = "100%"
        this.wallpaperElement.style.height = "100%"
        this.wallpaperElement.style.margin = "0px"
        this.wallpaperElement.style.position = "absolute"
        this.wallpaperElement.style.zIndex = "-100"
        document.body.appendChild(this.wallpaperElement)

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
    
    setWallpaper(src) {
        this.wallpaperElement.src = src
    }
}
