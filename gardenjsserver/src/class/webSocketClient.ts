import * as WebSocket from 'ws';
import {MessageReciver} from './messageReciver'
import { setInterval } from 'timers';
import {LED} from './hardware/led'


export class WebSocketClient {

    private websocketServerAddress: string = "ws://gardenjswebsocketproxy.herokuapp.com/" //"ws://localhost:8080";
    private webSocketClient: WebSocket;
    private messageReciver: MessageReciver;
  private led: LED;
    
    constructor (){
        
        this.led = new LED(17)
        this.webSocketClient = new WebSocket(this.websocketServerAddress);
        this.setProxyClientType();
        this.messageReciver = new MessageReciver(this.webSocketClient);
        this.reconect();
    }

    private setProxyClientType() {
        this.webSocketClient.on('open', (webSocket: WebSocket) =>{
            this.led.start();
            this.webSocketClient.send(JSON.stringify({event: "setClientTypeAs", data: "serwer"}));
            this.webSocketClient.ping();
            //let interval = setInterval(this.ping, 2000)
        })
        this.webSocketClient.on('pong', () =>{
            let timeout = setTimeout(this.ping(), 50000);
        })
    }
    private reconect(){
        this.webSocketClient.on('close', (code: number, reason: string)=>{
           this.led.stop();
            console.log(`zamknieto polaczenie status: ${code}: ${reason}`)
            this.webSocketClient = new WebSocket(this.websocketServerAddress);
        })
        this.webSocketClient.on('error', (err: Error) =>{
            this.led.stop();
            console.log(`error : ${err}`)
            this.webSocketClient = new WebSocket(this.websocketServerAddress);

        })
    }
    private ping(){
        return () => this.webSocketClient.ping();
    }

}