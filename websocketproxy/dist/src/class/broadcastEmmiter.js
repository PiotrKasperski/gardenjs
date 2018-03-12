"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
class BroadcastEmmiter {
    constructor(websocketServer) {
        this.emitter = new events.EventEmitter();
        this.websocketServer = websocketServer;
        this.eventsReciver();
    }
    emit(instruction, clientType) {
        this.emitter.emit(instruction.event, instruction.data, clientType);
        //console.log(`emmiting ${instruction.event}`)
    }
    eventsReciver() {
        this.emitter.on('setClientTypeAs', (data) => {
            this.websocketServer.clients.forEach(client => {
                //console.log(client.clientType);
                if (client.clientType === "client")
                    client.send(`new client is connected`);
            });
            //console.log(`set client type as ${data}`)
        });
        this.emitter.on('sendForward', (data, clientType) => {
            this.websocketServer.clients.forEach(client => {
                if (client.clientType && client.clientType !== clientType)
                    client.send(data);
            });
        });
    }
}
exports.BroadcastEmmiter = BroadcastEmmiter;
