import {TemperatureSensor} from './hardware/temperatureSensor'
import {MoistureSensor} from './hardware/moistureSensor'
import * as Rx from 'rxjs/Rx'
import { WaterLevelSensor } from './hardware/waterLevelSensor';
import {RgbLed} from './hardware/rgbLed'
export class Sensors {
    private tempSensor = new TemperatureSensor();
    private moistureSensor = new MoistureSensor(5);
    private waterLevelSensor = new WaterLevelSensor();
    private sensorsObservable;

    constructor(){
    }

    public getSensorsValue(){
        return Rx.Observable
        .combineLatest(this.tempSensor.getTemperature(), this.moistureSensor.getMoistureObservable(), this.waterLevelSensor.getWaterLevel())
        .map(data =>{
            console.log(data)
            return {temperature: data[0], moisture: data[1], waterLevel: data[2]}
        })
      }

}