import * as WebSocket from 'ws';
import * as events from 'events';
import {Sensors} from './sensors'

export class MessageReciver {

    private webSocket: WebSocket;
    private emitter: events.EventEmitter;
    private sensors: Sensors;

    constructor(webSocket: WebSocket){

       this.set(webSocket);

        this.webSocket.on('message', (message: string) =>{
            this.emitter.emit(this.messageParser(message).event, this.messageParser(message).data);
            setInterval( this.intervalFunction , 5000)
        })

        this.eventListeners();

       

    }
    private set(webSocket: WebSocket) {

        this.webSocket = webSocket;

        this.emitter = new events.EventEmitter();

        this.sensors = new Sensors();

    }
    private intervalFunction(){
       if(this.webSocket) this.webSocket.send(JSON.stringify(this.sensors.getSensorsValue()));
    }

    private messageParser(message: string){
        return JSON.parse(message);;
    }

    private eventListeners(){

        this.emitter.on('getTime', (data: any) => {
            let date = new Date();
            this.webSocket.send(`{"time": "${date.getHours()}:${date.getMinutes()}"}`)
        })

        this.emitter.on('getSensorsValue', () => {
            setInterval( this.intervalFunction , 5000)
        })

    }

}