import {Adc} from './adc'
import * as Rx from 'rxjs/Rx'

export class MoistureSensor{
    private adc: Adc;
    private adcChannel: number;
    private moistureObservable;

    constructor(adcChannel) {
        this.adc = new Adc();
        this.adcChannel = adcChannel;
        this.moistureObservable = Rx.Observable.bindCallback(this.getMoisture)

    }

    private getMoisture(callback: (temperature: number) => void) {
        this.adc.getValueFromChanel(this.adcChannel, callback)
    }
    public getMoistureObservable(){
        return this.moistureObservable();
    }

}