"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
const sensors_1 = require("./sensors");
class MessageReciver {
    constructor(webSocket) {
        this.set(webSocket);
        this.webSocket.on('message', (message) => {
            this.emitter.emit(this.messageParser(message).event, this.messageParser(message).data);
            setInterval(this.intervalFunction, 5000);
        });
        this.eventListeners();
    }
    set(webSocket) {
        this.webSocket = webSocket;
        this.emitter = new events.EventEmitter();
        this.sensors = new sensors_1.Sensors();
    }
    intervalFunction() {
        if (this.webSocket)
            this.webSocket.send(JSON.stringify(this.sensors.getSensorsValue()));
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
        this.emitter.on('getSensorsValue', () => {
            setInterval(this.intervalFunction, 5000);
        });
    }
}
exports.MessageReciver = MessageReciver;
