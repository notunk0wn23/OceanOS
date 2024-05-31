// import { FSFileExistsError } from "./Errors.js";

class File {
    constructor(path, data) {
        this.path = path;
        this.data = data;
    }

    toString() {
        return `File(path='${this.path}', data='${this.data}')`;
    }
}

class Directory {
    constructor(path) {
        this.path = path;
        this.children = {};
    }

    addChild(name, child) {
        if (this.children[name]) {
            throw new Error(`File or directory already exists: ${name}`);
        }
        this.children[name] = child;
    }

    getChild(name) {
        return this.children.get(name);
    }

    toString() {
        return `Directory(path='${this.path}', children=${JSON.stringify(this.children)})`;
    }
}

class FileSystem {
    constructor() {
        this.root = new Directory("/");
    }

    resolvePath(path) {
        const components = path.strip("/").split("/");
        let current = this.root;
        for (const component of components) {
            if (component === "") continue;
            const child = current.getChild(component);
            if (!child) return null;
            current = child;
        }
        return current;
    }
}
