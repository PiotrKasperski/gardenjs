import {TemperatureSensor} from './temperatureSensor'

export class Sensors {
    private tempSensor = new TemperatureSensor();

    constructor(){

    }

    public getSensorsValue(){
        return {
            temerature: 25,
            moisture: 60,
            waterLevel: 2
        } 
    }

}