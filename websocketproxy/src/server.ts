import * as express from "express";

export class Server {

public app: express.Application;

public bootstrap(): Server {
    return new Server();
}

constructor(){
  
    this.app = express();

    this.config();

    this.routes();

    this.api();
    
}

public api() {

}

public config() {

}

public routes(){

}

}