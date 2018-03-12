import * as express from "express";

import {WebSocketClient} from "./class/webSocketClient"
import * as http from "http";
import { normalize } from "path";


//const server = new Server;

//const app = server.bootstrap().app;

const app = express();

const httpPort = process.env.PORT || 6669;
const httpServer = http.createServer(app);

const webSocketClient = new WebSocketClient();

httpServer.listen(httpPort, ()=>{
    console.log(`Server started on port ${httpServer.address().port}`)
})



