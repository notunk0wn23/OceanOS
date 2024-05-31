import { Kernel } from "./modules/Kernel.js"
import { DisplayManager } from "./modules/DisplayManager.js"
let kernel = new Kernel("0")


kernel.boot()

const app = {
    width: 100,
    height: 100,
    title: "Example App",
    children: [
        {
            type: "button",
            text: "Hello World",
            geometry: {
                x: 50,
                y: 0,
                width: 100,
                height: 100,
            },
            onClick: function() {
                console.log("Hello world button pressed");
            },
        },
    ],
};

kernel.displayManager.initializeWindow(app)
