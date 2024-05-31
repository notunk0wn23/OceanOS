class File {
    constructor(name, content = '') {
        this.name = name;
        this.content = content;
    }
}

class Directory {
    constructor(name) {
        this.name = name;
        this.children = {};
    }

    addFile(file) {
        if (this.children[file.name]) {
            throw new Error(`File or directory named ${file.name} already exists.`);
        }
        this.children[file.name] = file;
    }

    addDirectory(directory) {
        if (this.children[directory.name]) {
            throw new Error(`File or directory named ${directory.name} already exists.`);
        }
        this.children[directory.name] = directory;
    }

    getFile(fileName) {
        if (!this.children[fileName] || this.children[fileName] instanceof Directory) {
            throw new Error(`File named ${fileName} does not exist.`);
        }
        return this.children[fileName];
    }

    getDirectory(directoryName) {
        if (!this.children[directoryName] || this.children[directoryName] instanceof File) {
            throw new Error(`Directory named ${directoryName} does not exist.`);
        }
        return this.children[directoryName];
    }
}

export class FileSystem {
    constructor() {
        this.root = new Directory('/');
    }

    createFile(path, content = '') {
        const parts = path.split('/').filter(part => part);
        const fileName = parts.pop();
        let currentDirectory = this.root;

        for (const part of parts) {
            if (!currentDirectory.children[part]) {
                currentDirectory.addDirectory(new Directory(part));
            }
            currentDirectory = currentDirectory.getDirectory(part);
        }

        currentDirectory.addFile(new File(fileName, content));
    }

    readFile(path) {
        const parts = path.split('/').filter(part => part);
        const fileName = parts.pop();
        let currentDirectory = this.root;

        for (const part of parts) {
            currentDirectory = currentDirectory.getDirectory(part);
        }

        return currentDirectory.getFile(fileName).content;
    }

    writeFile(path, content) {
        const parts = path.split('/').filter(part => part);
        const fileName = parts.pop();
        let currentDirectory = this.root;

        for (const part of parts) {
            currentDirectory = currentDirectory.getDirectory(part);
        }

        const file = currentDirectory.getFile(fileName);
        file.content = content;
    }

    deleteFile(path) {
        const parts = path.split('/').filter(part => part);
        const fileName = parts.pop();
        let currentDirectory = this.root;

        for (const part of parts) {
            currentDirectory = currentDirectory.getDirectory(part);
        }

        if (!currentDirectory.children[fileName]) {
            throw new Error(`File named ${fileName} does not exist.`);
        }

        delete currentDirectory.children[fileName];
    }
}
