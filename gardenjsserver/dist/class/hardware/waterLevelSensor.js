"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rx = require("rxjs/Rx");
const adc_1 = require("./adc");
class WaterLevelSensor {
    constructor() {
        this.settings();
    }
    settings() {
        this.analogDigitalConverter = new adc_1.Adc();
    }
    getSensorStates() {
        let sensorInputsArray = [];
        for (let i = 1; i <= 7; i++)
            sensorInputsArray.push(this.analogDigitalConverter.getValueFromChanel(i));
        return this.sensorsInputObs =
            Rx.Observable
                .combineLatest(sensorInputsArray)
                .map(values => {
                values.forEach((value, index) => {
                    if (value > 0)
                        values[index] = 1;
                });
                return values;
            });
    }
    getWaterLevel() {
        let waterLevel = 0;
        return this.getSensorStates().map(values => {
            values.forEach(value => {
                waterLevel += value;
            });
            return waterLevel;
        });
    }
    isWater() {
        return this.getWaterLevel().map(waterLevel => {
            return waterLevel > 0;
        });
    }
}
exports.WaterLevelSensor = WaterLevelSensor;
//# sourceMappingURL=waterLevelSensor.js.map