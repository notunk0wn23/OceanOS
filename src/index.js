import { Kernel } from "./modules/Kernel.js";
import { DisplayManager } from "./modules/DisplayManager.js";
let kernel = new Kernel("0");

kernel.boot();

kernel.initProcess({
    name: "BackgroundProcess",
    onLoad: function(fs, display) {
        console.log("Background Process loaded!");
    },
    window: {
        width: 500,
        height:400,
        title: "Example App", // Name shown in the titlebar
        children: [
            // All elements are located in here
            {
                type: "button", // Type, based off of the HTML tag
                text: "Hello World", // Inner text of the element
                geometry: {
                    // Contains position:weal and size data
                    x: "calc(50% - 50px)",
                    y: "calc(50% - 50px)",
                    width: 100,
                    height: 100,
                },
                style: {
                    marginTop: "-50px",
                },
                onLoad: function() {
                    // Run JS function when the element is added to the DOM
                    console.log("Button Loaded");
                },
                onClick: function() {
                    // Run JS function on click
                    console.log("Hello world button pressed");
                },
            },
        ],
    },
});
