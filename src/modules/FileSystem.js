export class FileSystem {
  constructor() {
    this.root = new Directory("/");
  }

  // Get a specific file or directory by path
  get(path) {
    const parts = path.split("/"); // Split path by "/" separator
    let current = this.root;
    for (let i = 1; i < parts.length; i++) {
      const name = parts[i];
      current = current.get(name);
      if (!current) {
        return null; // Path not found
      }
    }
    return current;
  }
}

class Directory {
  constructor(name) {
    this.name = name;
    this.children = {}; // Key: child name, Value: child object (File or Directory)
  }

  // Add a file or directory to the current directory
  add(child) {
    if (child.name in this.children) {
      throw new Error("File or directory already exists");
    }
    this.children[child.name] = child;
  }

  // Get a file or directory by name from the current directory
  get(name) {
    return this.children[name];
  }
}

class File {
  constructor(name, content) {
    this.name = name;
    this.content = content;
  }
}


