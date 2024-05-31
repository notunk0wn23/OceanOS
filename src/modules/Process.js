import { UIElement } from "./UIElement.js";

export class Process {
    constructor(kernel, pid) {
        if (pid == undefined || pid == null) {
            this.pid = kernel.nextProcessID();
        } else {
            if (kernel.processes[pid] == undefined) {
                this.pid = pid;
            } else {
                throw new Error("Process already exists!");
            }
        }
    }

    kill() {
        kernel.processes[this.pid] = undefined;
    }
}
