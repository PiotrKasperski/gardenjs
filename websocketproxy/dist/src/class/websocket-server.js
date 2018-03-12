"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const messageReciver_1 = require("./messageReciver");
const broadcastEmmiter_1 = require("./broadcastEmmiter");
class WebsocketServer {
    constructor(server) {
        this.websocketServer = new WebSocket.Server({ server: server }, () => {
            console.log('Server created');
        });
        this.brodcastEmitter = new broadcastEmmiter_1.BroadcastEmmiter(this.websocketServer);
        this.connection();
    }
    connection() {
        this.websocketServer.on('connection', (websocket) => {
            console.log(`New client connected!`);
            this.messages(websocket);
            websocket.send(JSON.stringify({ event: "sendClientType" }));
        });
    }
    messages(webSocket) {
        webSocket.on('message', (message) => {
            try {
                let messageReciver = new messageReciver_1.MessageReciver(message);
                if (messageReciver.getEvent() === 'setClientTypeAs') {
                    webSocket.clientType = messageReciver.getData();
                }
                this.brodcastEmitter.emit(messageReciver.getInstruction());
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
}
exports.WebsocketServer = WebsocketServer;
