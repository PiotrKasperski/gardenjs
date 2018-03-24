import * as WebSocket from 'ws';
import * as events from 'events';
import {Sensors} from './sensors'
import * as Rx from 'rxjs/Rx'

export class MessageReciver {

    private webSocket: WebSocket;
    private emitter: events.EventEmitter;
    private sensors: Sensors;

    constructor(webSocket: WebSocket){

       this.set(webSocket);

        this.webSocket.on('message', (message: string) =>{
            this.emitter.emit(this.messageParser(message).event, this.messageParser(message).data);
        })

        this.eventListeners();
        this.sensorsValuesSender().subscribe(()=>{});
      }
    private set(webSocket: WebSocket) {

        this.webSocket = webSocket;

        this.emitter = new events.EventEmitter();

        this.sensors = new Sensors();

    }

    private messageParser(message: string){
        return JSON.parse(message);;
    }

    private eventListeners(){

        this.emitter.on('getTime', (data: any) => {
            let date = new Date();
            this.webSocket.send(`{"time": "${date.getHours()}:${date.getMinutes()}"}`)
        })
       
        this.emitter.on('getSensorsValue' , () => {
            console.log(`sensor value emmiter`);
        })

    }
    private sensorsValuesSender():Rx.Observable<string>{
        return Rx.Observable
        .interval(1000)
        .flatMap( () => {
            return this.sensors.getSensorsValue().map(data =>{
                console.log(data)
                this.webSocket.send(JSON.stringify({event: "sensorsValue", data: JSON.stringify(data) }))
                return JSON.stringify(data);
            });
        })
        .distinctUntilChanged()
    }
}