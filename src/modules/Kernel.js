// import { FileSystem } from './modules/FileSystem.js'
import { Process } from "./Process.js";
import { DisplayManager } from "./DisplayManager.js";
import { FileSystem } from "./FileSystem.js";

export class Kernel {
  constructor(version) {
    this.processes = [];
    this.version = version | "0.0.0";
  }

  boot() {
    this.displayManager = new DisplayManager();
    this.fs = new FileSystem();
  }

  initProcess() {
    let pid = this.nextProcessID();
    this.processes[pid] = new Process(this, pid);
  }

  nextProcessID() {
    let id;
    for (let i = 0; i < this.processes.length; i++) {
      if (this.processes[i] == undefined) {
        id = i;
        break;
      }
    }

    if (id == undefined) {
      id = this.processes.length + 1;
    }

    return id;
  }
}
