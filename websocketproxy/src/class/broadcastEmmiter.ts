import * as events from 'events';
import * as WebSocket from 'ws';

import { Message } from '../interfaces/message';

export class BroadcastEmmiter {


    private emitter = new events.EventEmitter();
    private websocketServer: WebSocket.Server; 
    constructor(websocketServer: WebSocket.Server){

        this.websocketServer = websocketServer;
        this.eventsReciver();
    }

    public emit(instruction: Message, clientType: string){
        this.emitter.emit(instruction.event, instruction.data, clientType);
        //console.log(`emmiting ${instruction.event}`)
    }

    private eventsReciver(){

        this.emitter.on('setClientTypeAs',(data: string) =>{
            this.websocketServer.clients.forEach(client =>{
                //console.log(client.clientType);
                if(client.clientType === "client") client.send(`new client is connected`);
                
            })
            //console.log(`set client type as ${data}`)
        })

        this.emitter.on('sendForward', (data: string, clientType: string) =>{
            this.websocketServer.clients.forEach(client =>{
                if(client.clientType && client.clientType !== clientType) client.send(data);
            })
        })


    }

}