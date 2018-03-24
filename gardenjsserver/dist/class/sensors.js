"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const temperatureSensor_1 = require("./hardware/temperatureSensor");
const moistureSensor_1 = require("./hardware/moistureSensor");
const Rx = require("rxjs/Rx");
const waterLevelSensor_1 = require("./hardware/waterLevelSensor");
class Sensors {
    constructor() {
        this.tempSensor = new temperatureSensor_1.TemperatureSensor();
        this.moistureSensor = new moistureSensor_1.MoistureSensor(5);
        this.waterLevelSensor = new waterLevelSensor_1.WaterLevelSensor();
    }
    getSensorsValue() {
        return Rx.Observable
            .combineLatest(this.tempSensor.getTemperature(), this.moistureSensor.getMoistureObservable(), this.waterLevelSensor.getWaterLevel())
            .map(data => {
            console.log(data);
            return { temperature: data[0], moisture: data[1], waterLevel: data[2] };
        });
    }
}
exports.Sensors = Sensors;
//# sourceMappingURL=sensors.js.map