import * as WebSocket from 'ws';
import {MessageReciver} from './messageReciver'


export class WebSocketClient {

    private websocketServerAddress: string = "ws://localhost:8080";
    private webSocketClient: WebSocket;
    private messageReciver: MessageReciver;
    
    constructor (){

        this.webSocketClient = new WebSocket(this.websocketServerAddress);
        this.setProxyClientType();
        this.messageReciver = new MessageReciver(this.webSocketClient);
    }

    private setProxyClientType() {
        this.webSocketClient.on('open', (webSocket: WebSocket) =>{
            this.webSocketClient.send(JSON.stringify({event: "setClientTypeAs", data: "serwer"}));
        })
    }

}