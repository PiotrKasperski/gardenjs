"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
class MessageReciver {
    constructor(webSocket) {
        this.webSocket = webSocket;
        this.emitter = new events.EventEmitter();
        this.webSocket.on('message', (message) => {
            this.emitter.emit(this.messageParser(message).event, this.messageParser(message).data);
        });
        this.eventListeners();
    }
    messageParser(message) {
        return JSON.parse(message);
        ;
    }
    eventListeners() {
        this.emitter.on('getTime', (data) => {
            let date = new Date();
            this.webSocket.send(`{"time": "${date.getHours()}:${date.getMinutes()}"}`);
        });
    }
}
exports.MessageReciver = MessageReciver;
