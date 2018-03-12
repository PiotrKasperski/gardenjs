"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const messageReciver_1 = require("./messageReciver");
class WebSocketClient {
    constructor() {
        this.websocketServerAddress = "ws://localhost:8080";
        this.webSocketClient = new WebSocket(this.websocketServerAddress);
        this.setProxyClientType();
        this.messageReciver = new messageReciver_1.MessageReciver(this.webSocketClient);
    }
    setProxyClientType() {
        this.webSocketClient.on('open', (webSocket) => {
            this.webSocketClient.send(JSON.stringify({ event: "setClientTypeAs", data: "serwer" }));
        });
    }
}
exports.WebSocketClient = WebSocketClient;
