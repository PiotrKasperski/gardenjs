"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ADC = require("mcp3008.js");
const Rx = require("rxjs/Rx");
class Adc {
    constructor() {
        this.adc = new ADC();
        this.adc.read(0, (value) => {
            console.log(`Wartość z mcp3008: ${value}`);
        });
    }
    getValueFromChanelCb(channel, cb) {
        this.adc.read(channel, cb);
    }
    getValueFromChanel(channel) {
        let bindCallback = Rx.Observable.bindCallback(this.adc.read);
        return bindCallback(channel);
    }
    startPolling(channel, callback, interval) {
        this.adc.poll(channel, interval, callback);
    }
    stopPolling(channel) {
        this.adc.stop(channel);
    }
}
exports.Adc = Adc;
//# sourceMappingURL=adc.js.map