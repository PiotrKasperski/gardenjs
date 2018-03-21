import {TemperatureSensor} from './temperatureSensor'
import {MoistureSensor} from './moistureSensor'
import * as Rx from 'rxjs/Rx'

export class Sensors {
    private tempSensor = new TemperatureSensor();
    private moistureSensor = new MoistureSensor(0);
    private sensorsObservable;
    constructor(){
    }

    public getSensorsValue(){
        return Rx.Observable
        .forkJoin(this.tempSensor.getTemperature(), this.moistureSensor.getMoistureObservable())
        .map(data =>{
            return {temperature: data[0], moisture: data[1]}
        })
      }

}