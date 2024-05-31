export class UIElement {
    constructor(type) {
        this.DOMElement = document.createElement(type == null ? "div" : type);
    }

    setText(string) {
        this.DOMElement.innerText = string;
    }

    setParameter(param, val) {
        switch (param) {
            case "class":
                this.DOMElement.class = val;
            case "id":
                this.DOMElement.id = val;
            case "src":
                this.DOMElement.src = val;
            case "href":
                this.DOMElement.href = val;
            case "type":
                this.DOMElement.type = val;
            case "width":
                this.DOMElement.width = val;
            case "height":
                this.DOMElement.height = val;
            case "alt":
                this.DOMElement.alt = val;
            case "title":
                this.DOMElement.title = val;
            case "lang":
                this.DOMElement.lang = val;
        }
    }

    remove() {
        this.DOMElement.remove();
    }
}
