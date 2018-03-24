import {Relay} from './relay'
import * as Rx from 'rxjs/Rx'

export class Pump{
 private pumpRelay: Relay;
    
    constructor(){
       
    this.pumpRelay = new Relay(27);
    }

    public wateringLiters(liters: number){
        this.watering(((60*60*1000*liters)/110));
    }

    public wateringTime(time: number){
        this.watering(time);
    }
    
    private watering(time: number){
        let timeObservable = 
        Rx.Observable
        .timer(0,time)
        .timeInterval()
        .map((x)=>{
            this.pumpRelay.start();
            return x.interval;
        })
        .delay(time)
        .take(1);


        let sub =timeObservable.subscribe((x)=> {
            console.log(x);
            this.pumpRelay.stop();
        })
       
    }
}