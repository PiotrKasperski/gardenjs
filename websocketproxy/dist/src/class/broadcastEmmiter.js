"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
class BroadcastEmmiter {
    constructor(websocketServer) {
        this.emitter = new events.EventEmitter();
        this.websocketServer = websocketServer;
        this.eventsReciver();
    }
    emit(instruction) {
        this.emitter.emit(instruction.event, instruction.data);
        console.log(`emmiting ${instruction.event}`);
    }
    eventsReciver() {
        this.emitter.on('setClientTypeAs', (data) => {
            this.websocketServer.clients.forEach(client => {
                console.log(client.clientType);
                if (client.clientType === "client")
                    client.send(`new client is connected`);
            });
            console.log(`set client type as ${data}`);
        });
    }
}
exports.BroadcastEmmiter = BroadcastEmmiter;
