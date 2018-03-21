"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sensor = require("ds18b20-raspi");
const Rx = require("rxjs/Rx");
class TemperatureSensor {
    constructor() {
        this.sensor = Sensor;
        //let interval = setInterval(this.getTemperature, 1000);
        this.temperatureObservable = Rx.Observable.bindCallback(Sensor.readSimpleC);
    }
    getTemperature() {
        return this.temperatureObservable().map(data => {
            return data[1];
        });
    }
}
exports.TemperatureSensor = TemperatureSensor;
