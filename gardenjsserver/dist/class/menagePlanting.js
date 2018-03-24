"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const waterLevelSensor_1 = require("./hardware/waterLevelSensor");
const pump_1 = require("./hardware/pump");
const moistureSensor_1 = require("./hardware/moistureSensor");
const Rx = require("rxjs/Rx");
const settings_1 = require("./settings");
class MenagePlanting {
    constructor() {
        this.settings();
        this.loop();
        this.interval.subscribe((x) => {
            console.log(`checking ${x}`);
        });
    }
    settings() {
        this.Settings = new settings_1.Settings();
        this.waterLevelSensor = new waterLevelSensor_1.WaterLevelSensor();
        this.moistureSensor = new moistureSensor_1.MoistureSensor(0, this.Settings.getDefaultMoisture());
        this.pump = new pump_1.Pump();
        this.setIntervalChecking(this.Settings.getCheckingInterval());
    }
    loop() {
        this.needWatering().subscribe(needWatering => {
            if (needWatering)
                this.pump.wateringTime(2000);
        });
    }
    needWatering() {
        return this.moistureSensor.isWet().combineLatest([this.waterLevelSensor.isWater()], (isWet, isWater) => {
            return (!isWet && isWater);
        });
    }
    setIntervalChecking(time) {
        this.interval =
            Rx.Observable
                .timer(0, time)
                .timeInterval()
                .map((interval) => {
                this.loop();
                return interval.interval.toString();
            })
                .delay(time);
    }
    intervalChecking(timeInMinutes) {
        return setInterval(this.loop(), timeInMinutes * 60 * 1000);
    }
}
exports.MenagePlanting = MenagePlanting;
//# sourceMappingURL=menagePlanting.js.map