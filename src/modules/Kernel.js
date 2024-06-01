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

    initProcess(process) {
        let pid = this.nextProcessID();
        this.processes[pid] = new Process(this, pid, process);
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
    getTime(type) {

        const now = new Date()
        let hours = now.getHours()
        let minutes = now.getMinutes()
        let period = 'AM'

        if (!use24hrs) {
            period = (hours >= 12) ? 'PM' : 'AM'
            if (hours === 0) {
                hours = 12
            } else if (hours > 12) {
                hours %= 12
            }
        }

        hours = (hours < 10) ? `0${hours}` : hours
        minutes = (minutes < 10) ? `0${minutes}` : minutes

        return use24hrs
            ? `${hours}:${minutes}`
            : `${hours}:${minutes} ${period}`
    }
}
