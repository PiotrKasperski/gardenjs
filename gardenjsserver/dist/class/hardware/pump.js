"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const relay_1 = require("./relay");
const Rx = require("rxjs/Rx");
class Pump {
    constructor() {
        this.pumpRelay = new relay_1.Relay(27);
    }
    wateringLiters(liters) {
        this.watering(((60 * 60 * 1000 * liters) / 110));
    }
    wateringTime(time) {
        this.watering(time);
    }
    watering(time) {
        let timeObservable = Rx.Observable
            .timer(0, time)
            .timeInterval()
            .map((x) => {
            this.pumpRelay.start();
            return x.interval;
        })
            .delay(time)
            .take(1);
        let sub = timeObservable.subscribe((x) => {
            console.log(x);
            this.pumpRelay.stop();
        });
    }
}
exports.Pump = Pump;
//# sourceMappingURL=pump.js.map