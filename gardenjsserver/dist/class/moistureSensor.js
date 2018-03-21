"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adc_1 = require("./adc");
const Rx = require("rxjs/Rx");
class MoistureSensor {
    constructor(adcChannel) {
        this.adc = new adc_1.Adc();
        this.adcChannel = adcChannel;
        this.moistureObservable = Rx.Observable.bindCallback(this.getMoisture);
    }
    getMoisture(callback) {
        this.adc.getValueFromChanel(this.adcChannel, callback);
    }
    getMoistureObservable() {
        return this.moistureObservable();
    }
}
exports.MoistureSensor = MoistureSensor;
