import * as Sensor from 'ds18b20-raspi';
import * as Rx from 'rxjs/Rx'


export class TemperatureSensor {
 

    private sensor;
    private temperatureObservable;

constructor (){
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