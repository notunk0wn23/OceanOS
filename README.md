# OceanOS
OceanOS is an operating system written in Javascript made for the web.

## Running Locally
 - Clone the repository `git clone https://github.com/notunk0wn23/OceanOS/`
 - Open the repo
 - Install vite `npm install --save-dev vite`
 - Start it locally `npm start dev`

## Processes

## Window system 
Similar to processes, The window system uses JSON to define apps and windows. Here's an example:
```javascript
const app = {
    width: 100,
    height: 100,
    title: "Example App", // Name shown in the titlebar
    children: [ // All elements are located in here
        {
            type: "button", // Type, based off of the HTML tag
            text: "Hello World", // Inner text of the element
            geometry: { // Contains positional and size data
                x: 50,
                y: 0,
                width: 100,
                height: 100,
            },
            onLoad: function() { // Run JS function when the element is added to the DOM
                console.log("Button Loaded")
            },
            onClick: function() { // Run JS function on click
                console.log("Hello world button pressed");
            },
        },
    ],
};
```
