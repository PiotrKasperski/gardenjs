"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const webSocketClient_1 = require("./class/webSocketClient");
const http = require("http");
//const server = new Server;
//const app = server.bootstrap().app;
const app = express();
const httpPort = process.env.PORT || 6669;
const httpServer = http.createServer(app);
const webSocketClient = new webSocketClient_1.WebSocketClient();
httpServer.listen(httpPort, () => {
    console.log(`Server started on port ${httpServer.address().port}`);
});
