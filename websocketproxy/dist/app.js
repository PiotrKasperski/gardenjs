"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./src/server");
const websocket_server_1 = require("./src/class/websocket-server");
const http = require("http");
const server = new server_1.Server;
const app = server.bootstrap().app;
const httpPort = process.env.PORT || 8080;
const httpServer = http.createServer(app);
const websocketServer = new websocket_server_1.WebsocketServer(httpServer);
httpServer.listen(httpPort, () => {
    console.log(`Server started on port ${httpServer.address().port}`);
});
