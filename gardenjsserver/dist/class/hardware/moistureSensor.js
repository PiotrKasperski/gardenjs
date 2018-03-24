"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adc_1 = require("./adc");
const onoff = require("onoff");
class MoistureSensor {
    constructor(pwrGpioPin, defaultMoisture) {
        this.pwrGpioPin = new onoff.Gpio(pwrGpioPin, 'out');
        this.adc = new adc_1.Adc();
        this.adcChannel = 0;
        this.moistureObservable = this.getMoisture();
        if (defaultMoisture)
            this.defaultMoisture = defaultMoisture;
    }
    powerOn() {
        this.pwrGpioPin.writeSync(1);
    }
    powerOff() {
        this.pwrGpioPin.writeSync(0);
    }
    getMoisture() {
        return this.adc.getValueFromChanel(this.adcChannel);
    }
    getMoistureObservable() {
        this.getMoisture().subscribe((value) => {
            console.log(`moisture: ${value}`);
        });
        return this.getMoisture().map(value => { return 1020 - value; });
    }
    isWet() {
        return this.getMoistureObservable()
            .map(moisture => {
            return (this.defaultMoisture < moisture);
        });
    }
}
exports.MoistureSensor = MoistureSensor;
//# sourceMappingURL=moistureSensor.js.map