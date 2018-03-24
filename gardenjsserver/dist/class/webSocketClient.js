"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const messageReciver_1 = require("./messageReciver");
const led_1 = require("./hardware/led");
class WebSocketClient {
    constructor() {
        this.websocketServerAddress = "ws://gardenjswebsocketproxy.herokuapp.com/";
        this.led = new led_1.LED(17);
        this.webSocketClient = new WebSocket(this.websocketServerAddress);
        this.setProxyClientType();
        this.messageReciver = new messageReciver_1.MessageReciver(this.webSocketClient);
        this.reconect();
    }
    setProxyClientType() {
        this.webSocketClient.on('open', (webSocket) => {
            this.led.start();
            this.webSocketClient.send(JSON.stringify({ event: "setClientTypeAs", data: "serwer" }));
            this.webSocketClient.ping();
        });
        this.webSocketClient.on('pong', () => {
            let timeout = setTimeout(this.ping(), 50000);
        });
    }
    reconect() {
        this.webSocketClient.on('close', (code, reason) => {
            this.led.stop();
            console.log(`zamknieto polaczenie status: ${code}: ${reason}`);
            this.webSocketClient = new WebSocket(this.websocketServerAddress);
        });
        this.webSocketClient.on('error', (err) => {
            this.led.stop();
            console.log(`error : ${err}`);
            this.webSocketClient = new WebSocket(this.websocketServerAddress);
        });
    }
    ping() {
        return () => this.webSocketClient.ping();
    }
}
exports.WebSocketClient = WebSocketClient;
//# sourceMappingURL=webSocketClient.js.map