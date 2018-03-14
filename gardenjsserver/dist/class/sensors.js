"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const temperatureSensor_1 = require("./temperatureSensor");
class Sensors {
    constructor() {
        this.tempSensor = new temperatureSensor_1.TemperatureSensor();
    }
    getSensorsValue() {
        return {
            temerature: 25,
            moisture: 60,
            waterLevel: 2
        };
    }
}
exports.Sensors = Sensors;
