"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const messageReciver_1 = require("./messageReciver");
class WebSocketClient {
    constructor() {
        this.websocketServerAddress = "ws://gardenjswebsocketproxy.herokuapp.com/"; //"ws://localhost:8080";
        this.webSocketClient = new WebSocket(this.websocketServerAddress);
        this.setProxyClientType();
        this.messageReciver = new messageReciver_1.MessageReciver(this.webSocketClient);
    }
    setProxyClientType() {
        this.webSocketClient.on('open', (webSocket) => {
            this.webSocketClient.send(JSON.stringify({ event: "setClientTypeAs", data: "serwer" }));
            console.log(`websocket client: ${this.webSocketClient}`);
            this.webSocketClient.ping();
            //let interval = setInterval(this.ping, 2000)
        });
        this.webSocketClient.on('pong', () => {
            console.log(`pong`);
            let timeout = setTimeout(this.ping(), 50000);
        });
    }
    ping() {
        console.log(`ping`);
        return () => this.webSocketClient.ping();
    }
}
exports.WebSocketClient = WebSocketClient;
