"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sensor = require("ds18b20-raspi");
const Rx = require("rxjs/Rx");
const ds18b20_1 = require("./ds18b20");
class TemperatureSensor {
    constructor() {
        this.ds = new ds18b20_1.ds18b20();
        this.sensor = Sensor;
        this.temperatureObservable = Rx.Observable.bindCallback(Sensor.readSimpleC);
    }
    getTemperature() {
        return this.temperatureObservable().map(data => {
            return data[1];
        });
    }
}
exports.TemperatureSensor = TemperatureSensor;
//# sourceMappingURL=temperatureSensor.js.map