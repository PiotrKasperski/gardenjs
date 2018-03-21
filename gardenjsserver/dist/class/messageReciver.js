"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
const sensors_1 = require("./sensors");
const Rx = require("rxjs/Rx");
class MessageReciver {
    constructor(webSocket) {
        this.set(webSocket);
        this.webSocket.on('message', (message) => {
            this.emitter.emit(this.messageParser(message).event, this.messageParser(message).data);
        });
        this.eventListeners();
    }
    set(webSocket) {
        this.webSocket = webSocket;
        this.emitter = new events.EventEmitter();
        this.sensors = new sensors_1.Sensors();
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
            console.log(`sensor value emmiter`);
            let intervalObserver = Rx.Observable
                .interval(500)
                .flatMap(() => {
                return this.sensors.getSensorsValue().map(data => {
                    this.webSocket.send(JSON.stringify({ event: "sensorsValue", data: JSON.stringify(data) }));
                    return JSON.stringify(data);
                });
            })
                .distinctUntilChanged()
                .subscribe(data => {
                console.log(data);
            });
        });
    }
}
exports.MessageReciver = MessageReciver;
