"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sensor = require("ds18b20-raspi");
class TemperatureSensor {
    constructor() {
        this.sensor = Sensor;
        let interval = setInterval(this.getTemperature, 1000);
    }
    getTemperature() {
        console.log(`Temperatura: ${Sensor.readSimpleC()}`);
        return Sensor.readSimpleC();
    }
}
exports.TemperatureSensor = TemperatureSensor;
