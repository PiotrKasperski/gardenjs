"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class ds18b20 {
    constructor() {
        fs.readFile(`/sys/bus/w1/devices/28-00000a049409/w1_slave`, (err, data) => {
            if (err) {
                return console.log(err);
            }
        });
        fs.watchFile(`/sys/bus/w1/devices/28-00000a049409/w1_slave`, { interval: 1 }, (curr, prev) => {
            console.log(prev, curr);
            fs.readFile(`/sys/bus/w1/devices/28-00000a049409/w1_slave`, (err, data) => {
                if (err) {
                    return console.log(err);
                }
            });
        });
    }
}
exports.ds18b20 = ds18b20;
//# sourceMappingURL=ds18b20.js.map