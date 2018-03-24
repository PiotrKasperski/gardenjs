"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onoff = require("onoff");
class LED {
    constructor(ledGpioPin) {
        this.led = new onoff.Gpio(ledGpioPin, 'out');
    }
    start() {
        this.led.writeSync(1);
    }
    stop() {
        this.led.writeSync(0);
    }
}
exports.LED = LED;
//# sourceMappingURL=led.js.map