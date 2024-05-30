import { FSFileExistsError } from "./Errors.js";

class File {
  constructor(name, location, content) {
    if (location.children.includes(name)) {
      throw new FSFileExistsError("File Already Exists");
    }
    this.name = name | "Document.txt";
    this.content = content | "";
  }
}

class Folder {
  constructor() {
    if (location.children.includes(name)) {
      throw new FSFileExistsError("File Already Exists");
      
    }
  }
}
