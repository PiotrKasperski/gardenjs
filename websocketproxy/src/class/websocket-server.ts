import * as WebSocket from 'ws';
import * as http from "http";

import {MessageReciver} from "./messageReciver";
import {BroadcastEmmiter} from "./broadcastEmmiter";
import {WebSocketClient} from "./webSocketClient";
export class WebsocketServer {

    private websocketServer: WebSocket.Server;
    private brodcastEmitter: BroadcastEmmiter; 
    private webSocketClient: WebSocketClient;

 constructor(server: http.Server){
    

    this.websocketServer = new WebSocket.Server({server: server},()=>{
        console.log('Server created');
    });
    this.brodcastEmitter = new BroadcastEmmiter(this.websocketServer);

    this.connection();

    }
 
    private connection(){
        this.websocketServer.on('connection', (websocket: WebSocket) =>{
           
            console.log(`New client connected!`);
            this.messages(websocket);
            websocket.send(JSON.stringify({event: "sendClientType"}))
        })
    }

    private messages(webSocket: WebSocket){
        webSocket.on('message',(message: string) =>{
            try {
                let messageReciver = new MessageReciver(message);
                
                if(messageReciver.getEvent() === 'setClientTypeAs' ){
                    webSocket.clientType = messageReciver.getData();
                }
                
                this.brodcastEmitter.emit(messageReciver.getInstruction());
            
            } catch (e) {
                console.log(e.message);
            }
        })
    }

 }

