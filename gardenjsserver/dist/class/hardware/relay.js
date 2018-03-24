"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onoff = require("onoff");
class Relay {
    constructor(relayGpioPin) {
        this.GPIO = onoff.Gpio;
        this.relay = new this.GPIO(relayGpioPin, 'out');
        this.relay.writeSync(1);
    }
    start() {
        console.log(`start pumping warter`);
        this.relay.writeSync(0);
    }
    ;
    stop() {
        console.log(`stop pumping water`);
        this.relay.writeSync(1);
    }
    ;
}
exports.Relay = Relay;
//# sourceMappingURL=relay.js.map