import { UIElement } from "./UIElement.js";

export class Process {
    constructor(kernel, pid, content) {
        if (pid == undefined || pid == null) {
            this.pid = kernel.nextProcessID();
        } else {
            if (kernel.processes[pid] == undefined) {
                this.pid = pid;
            } else {
                throw new Error("Process already exists!");
            }
        }

        this.name = content.window;
        if (content.window) {
            kernel.displayManager.initializeWindow(content.window)
        }
    }

    kill() {
        kernel.processes[this.pid] = undefined;
    }
}
