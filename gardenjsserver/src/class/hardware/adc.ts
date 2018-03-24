import * as ADC from 'mcp3008.js';
import * as Rx from 'rxjs/Rx'
import { Observable } from 'rx';

export class Adc {
   private adc = new ADC();

constructor(){
        this.adc.read(0 , (value) =>{
            console.log(`Wartość z mcp3008: ${value}`)
        });
    }
    private getValueFromChanelCb(channel: number, cb:()=> number){
        this.adc.read(channel, cb);
        
    }
    public getValueFromChanel(channel: number): Rx.Observable<number>{
       let bindCallback:any = Rx.Observable.bindCallback(this.adc.read);
       return bindCallback(channel);
        
    }
    public startPolling(channel: number,callback: (value: number) => void ,interval:number){
        this.adc.poll(channel, interval, callback)
    }
    public stopPolling(channel: number){
        this.adc.stop(channel);
    }

}