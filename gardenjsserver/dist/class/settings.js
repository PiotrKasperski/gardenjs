"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Settings {
    constructor() {
        this.checkingInterval = 20000;
        this.defaultMoisture = 800;
    }
    getCheckingInterval() {
        return this.checkingInterval;
    }
    getDefaultMoisture() {
        return this.defaultMoisture;
    }
}
exports.Settings = Settings;
//# sourceMappingURL=settings.js.map