import { Kernel } from "./modules/Kernel.js"
import { DisplayManager } from "./modules/DisplayManager.js"
let kernel = new Kernel("0")


kernel.boot()

const app = {
    width: 500,
    height: 250,
    title: "Example App",
    style: {
        backgroundColor: "black"
    },
    children: [
        {
            type: "button",
            text: "Hello World",
            geometry: {
                x: "40%",
                y: "30%",
                width: 100,
                height: 75,
            },
            onLoad: function() {
                console.log("Hello world button loaded");
            },
            onClick: function() {
                console.log(this.geometry.x);
            },
        },
    ],
};

kernel.displayManager.initializeWindow(app)
