import * as Sensor from 'ds18b20-raspi';
import * as Rx from 'rxjs/Rx'
import {ds18b20} from './ds18b20'


export class TemperatureSensor {
 

    private sensor;
    private temperatureObservable;
    private ds;

constructor (){
    this.ds = new ds18b20();
    this.sensor = Sensor;
    //let interval = setInterval(this.getTemperature, 1000);
   this.temperatureObservable = Rx.Observable.bindCallback(Sensor.readSimpleC)
}

public getTemperature(){
   return this.temperatureObservable().map(data =>{
       return data[1];
   });
   
}

}