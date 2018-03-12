"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
class WebSocketClient extends WebSocket {
    getCclientType() {
        return this.clientType;
    }
    setClientType(value) {
        this.clientType = value;
    }
    isClient() {
        return this.clientType === 'client';
    }
}
exports.WebSocketClient = WebSocketClient;
