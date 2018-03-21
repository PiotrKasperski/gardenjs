"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const temperatureSensor_1 = require("./temperatureSensor");
const moistureSensor_1 = require("./moistureSensor");
const Rx = require("rxjs/Rx");
class Sensors {
    constructor() {
        this.tempSensor = new temperatureSensor_1.TemperatureSensor();
        this.moistureSensor = new moistureSensor_1.MoistureSensor(0);
    }
    getSensorsValue() {
        return Rx.Observable
            .forkJoin(this.tempSensor.getTemperature(), this.moistureSensor.getMoistureObservable())
            .map(data => {
            return { temperature: data[0], moisture: data[1] };
        });
    }
}
exports.Sensors = Sensors;
