import * as ADC from 'mcp3008.js';


export class Adc {
   private adc = new ADC();

constructor(){
        this.adc.read(0 , (value) =>{
            console.log(`Wartość z mcp3008: ${value}`)
        });
    }
    public getValueFromChanel(channel: number, callback: (value: number) => void ){
        this.adc.read(channel, callback);
    }
    public startPolling(channel: number,callback: (value: number) => void ,interval:number){
        this.adc.poll(channel, interval, callback)
    }
    public stopPolling(channel: number){
        this.adc.stop(channel);
    }

}