import * as WebSocket from 'ws';
import {MessageReciver} from './messageReciver'
import { setInterval } from 'timers';


export class WebSocketClient {

    private websocketServerAddress: string = "ws://gardenjswebsocketproxy.herokuapp.com/" //"ws://localhost:8080";
    private webSocketClient: WebSocket;
    private messageReciver: MessageReciver;
    
    constructor (){

        this.webSocketClient = new WebSocket(this.websocketServerAddress);
        this.setProxyClientType();
        this.messageReciver = new MessageReciver(this.webSocketClient);
        this.reconect();
    }

    private setProxyClientType() {
        this.webSocketClient.on('open', (webSocket: WebSocket) =>{
            this.webSocketClient.send(JSON.stringify({event: "setClientTypeAs", data: "serwer"}));
            console.log(`websocket client: ${this.webSocketClient}`)
            this.webSocketClient.ping();
            //let interval = setInterval(this.ping, 2000)
        })
        this.webSocketClient.on('pong', () =>{
            console.log(`pong`);
            let timeout = setTimeout(this.ping(), 50000);
        })
    }
    private reconect(){
        this.webSocketClient.on('close', (code: number, reason: string)=>{
            console.log(`zamknieto polaczenie status: ${code}: ${reason}`)
            this.webSocketClient = new WebSocket(this.websocketServerAddress);
        })
        this.webSocketClient.on('error', (err: Error) =>{
            console.log(`error : ${err}`)
            this.webSocketClient = new WebSocket(this.websocketServerAddress);

        })
    }
    private ping(){
        console.log(`ping`);
        return () => this.webSocketClient.ping();
    }

}