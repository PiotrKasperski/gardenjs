import * as WebSocket from 'ws';
import * as events from 'events';

export class MessageReciver {

    private webSocket: WebSocket;
    private emitter: events.EventEmitter;

    constructor(webSocket: WebSocket){

        this.webSocket = webSocket;

        this.emitter = new events.EventEmitter();

        this.webSocket.on('message', (message: string) =>{
            this.emitter.emit(this.messageParser(message).event, this.messageParser(message).data);
        })

        this.eventListeners();

    }

    private messageParser(message: string){
        return JSON.parse(message);;
    }

    private eventListeners(){

        this.emitter.on('getTime', (data: any) => {
            let date = new Date();
            this.webSocket.send(`{"time": "${date.getHours()}:${date.getMinutes()}"}`)
        })

    }

}