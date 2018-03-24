"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const webSocketClient_1 = require("./class/webSocketClient");
const http = require("http");
const menagePlanting_1 = require("./class/menagePlanting");
const app = express();
const httpPort = process.env.PORT || 6669;
const httpServer = http.createServer(app);
try {
    const webSocketClient = new webSocketClient_1.WebSocketClient();
}
catch (e) {
    console.error(e);
}
const menage = new menagePlanting_1.MenagePlanting();
httpServer.listen(httpPort, () => {
    console.log(`Server started on port ${httpServer.address().port}`);
});
//# sourceMappingURL=app.js.map