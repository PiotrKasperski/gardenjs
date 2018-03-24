import {Adc} from './adc'
import * as Rx from 'rxjs/Rx'
import * as onoff from "onoff";


export class MoistureSensor{
    private adc: Adc;
    private adcChannel: number;
    private moistureObservable;
    private defaultMoisture: number;
    private pwrGpioPin: onoff.Gpio;

    constructor(pwrGpioPin: number, defaultMoisture?: number ) {
        this.pwrGpioPin = new onoff.Gpio(pwrGpioPin, 'out');
        this.adc = new Adc();
        this.adcChannel = 0;
        this.moistureObservable = this.getMoisture();
        if(defaultMoisture) this.defaultMoisture = defaultMoisture;

    }
    private powerOn(){
        this.pwrGpioPin.writeSync(1);
    }
    private powerOff(){
        this.pwrGpioPin.writeSync(0);
    }

    private getMoisture() {
        return this.adc.getValueFromChanel(this.adcChannel);
    }

    public getMoistureObservable(): Rx.Observable<number>{
        this.getMoisture().subscribe((value)=>{
            console.log(`moisture: ${value}`)
        })
        return this.getMoisture().map(value =>{ return 1020-value});
    }
    public isWet():Rx.Observable<boolean>{
        return this.getMoistureObservable()
        .map( moisture =>{
            return (this.defaultMoisture < moisture)
        });
    }

}