"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ADC = require("mcp3008.js");
class Adc {
    constructor() {
        this.adc = new ADC();
        this.adc.read(0, (value) => {
            console.log(`Wartość z mcp3008: ${value}`);
        });
    }
    getValueFromChanel(channel, callback) {
        this.adc.read(channel, callback);
    }
    startPolling(channel, callback, interval) {
        this.adc.poll(channel, interval, callback);
    }
    stopPolling(channel) {
        this.adc.stop(channel);
    }
}
exports.Adc = Adc;
