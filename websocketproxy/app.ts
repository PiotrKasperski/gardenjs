import { Server } from "./src/server";

import * as http from "http";
import { normalize } from "path";

const server = new Server;

const app = server.bootstrap().app;

const httpPort = process.env.PORT || 8080;
const httpServer = http.createServer(app);
httpServer.listen(httpPort, ()=>{
    console.log(`Server started on port ${httpServer.address().port} :)`)
})



