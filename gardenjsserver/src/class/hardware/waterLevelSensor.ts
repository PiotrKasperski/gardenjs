import * as Rx from 'rxjs/Rx'
import {Adc} from './adc'
import { Observable } from 'rx';
export class WaterLevelSensor {
 // private sensorInputsArray: Array<Rx.Observable<number>>;
  private analogDigitalConverter: Adc;
  private sensorsInputObs:Rx.Observable<Array<number>>;
  private observableArray;

    constructor(){
        this.settings();
        //this.setSensorChanels();
    }

    private settings(){
        this.analogDigitalConverter = new Adc();
    }

    private getSensorStates(){
        let sensorInputsArray: Array<Rx.Observable<number>> = [];
        for (let i=1 ; i<=7; i++) sensorInputsArray.push(this.analogDigitalConverter.getValueFromChanel(i));
       return this.sensorsInputObs = 
        Rx.Observable
        .combineLatest(sensorInputsArray)
        .map(values =>{
           values.forEach((value, index)=>{
                if (value> 0) values[index]=1;
                }
            );
         return values
       })
      
    }

    public getWaterLevel(): Rx.Observable<number>{
        let waterLevel: number =0;
        return this.getSensorStates().map(values =>{
            values.forEach(value =>{
                waterLevel+=value;
            })
            return waterLevel
        });
    }
   
    public isWater():any{
        return this.getWaterLevel().map(waterLevel =>{
            return waterLevel > 0
        })
    }

}