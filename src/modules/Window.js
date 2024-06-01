const dragElement = function(element, container) {
    let posX = 0,
        posY = 0;

    element
        .querySelector("window-title")
        ?.addEventListener("mousedown", dragMouseDown);

    function dragMouseDown(e) {
        e.preventDefault();
        closeAll();

        posX = e.clientX;
        posY = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();

        const dx = e.clientX - posX;
        const dy = e.clientY - posY;

        const newTop = element.offsetTop + dy;
        const newLeft = element.offsetLeft + dx;

        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        if (newTop >= 0 && newTop + element.offsetHeight <= containerHeight) {
            element.style.top = `${newTop}px`;
        }

        if (newLeft >= 0 && newLeft + element.offsetWidth <= containerWidth) {
            element.style.left = `${newLeft}px`;
        }

        posX = e.clientX;
        posY = e.clientY;
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        container.onmouseleave = null;
    }

    function closeAll() {
        closeDragElement();
        container.onmouseenter = null;
    }
};

const renderComponent = function(component, container, processConfig) {
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
        element.addEventListener("onclick", component.onClick);
    }
    if (component.children) {
        component.children.forEach((child) => this.renderComponent(child));
    }

    container.appendChild(element);
    if (component.onLoad) {
        component.onLoad(processConfig, element);
    }
};

export class Window {
    constructor(process, display, config) {
        //this.process = process;
        this.display = display;

        this.focused = true;

        this.width = config.width;
        this.height = config.height;

        this.element = document.createElement("window");
        this.titlebar = document.createElement("window-title");
        this.content = document.createElement("window-content");

        this.element.style.display = "block";
        this.titlebar.style.display = "block";
        this.content.style.display = "block";

        this.element.style.overflow = "hidden";
        this.element.style.position = "absolute";
        this.element.style.resize = "both"
        this.element.style.width = String(this.width) + "px";
        this.element.style.height = String(this.height) + "px";
        this.element.style.backgroundColor = "red"
        this.element.style.borderRadius = "10px";

        this.titlebar.style.backgroundColor = "#1c1c1c";
        this.titlebar.style.width = "100%";
        this.titlebar.style.height = "25px";
        this.titlebar.style.color = "white"
        this.titlebar.style.lineHeight = "25px"
        this.titlebar.style.textAlign = "center"
        this.titlebar.borderRadius = "10px 10px 0px 0px"
        this.titlebar.textContent = config.title
        

        this.content.style.backgroundColor = "#2c2c2c"
        this.content.style.width = "100%";
        this.content.style.height = "calc(100% - 25px)";

        if (config.style) {
            Object.assign(this.element, config.style);
        }

        config.children.forEach((component) => {
            renderComponent(component, this.content, config)
        })

        this.element.appendChild(this.titlebar);
        this.element.appendChild(this.content);

        dragElement(this.element, display.windowContainer);
    }
}
