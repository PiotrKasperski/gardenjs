"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pigpio = require("pigpio");
class RgbLed {
    constructor(redPin, greenPin, bluePin) {
        this.rgbPins = { red: null, green: null, blue: null };
        pigpio.initialize();
        process.on('SIGINT', function () {
            pigpio.terminate();
            console.log('Terminating...');
        });
        this.rgbPins.red = new pigpio.Gpio(redPin, { mode: pigpio.Gpio.OUTPUT });
        this.rgbPins.green = new pigpio.Gpio(greenPin, { mode: pigpio.Gpio.OUTPUT });
        this.rgbPins.blue = new pigpio.Gpio(bluePin, { mode: pigpio.Gpio.OUTPUT });
        this.rgbPins.red.pwmWrite(0);
        this.rgbPins.blue.pwmWrite(255);
        this.rgbPins.green.pwmWrite(255);
        let dutyCycle = 0;
    }
}
exports.RgbLed = RgbLed;
//# sourceMappingURL=rgbLed.js.map