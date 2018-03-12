"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageReciver {
    constructor(payload) {
        let data = JSON.parse(payload);
        if (!data.event || data.event !== "setClientTypeAs") {
            data.event = "sendForward";
            data.data = payload;
        }
        this.instructionSet = data;
    }
    getInstruction() {
        return this.instructionSet;
    }
    getEvent() {
        return this.instructionSet.event;
    }
    getData() {
        return this.instructionSet.data;
    }
}
exports.MessageReciver = MessageReciver;
