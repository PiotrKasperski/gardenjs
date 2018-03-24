import {WaterLevelSensor} from './hardware/waterLevelSensor'
import {Pump} from './hardware/pump'
import {MoistureSensor} from './hardware/moistureSensor'
import * as Rx from 'rxjs/Rx'
import {Settings} from './settings'

export class MenagePlanting {

    private waterLevelSensor: WaterLevelSensor;
    private moistureSensor: MoistureSensor;
    private pump: Pump;
    private interval: Rx.Observable<any>;
    private Settings: Settings;

    constructor(){

        this.settings();
        //this.interval = this.intervalChecking(2);
        this.loop();

        this.interval.subscribe((x)=>{
            console.log(`checking ${x}`);
        })
    }

    private settings(){
        this.Settings = new Settings();
        this.waterLevelSensor = new WaterLevelSensor();
        this.moistureSensor = new MoistureSensor(0, this.Settings.getDefaultMoisture());
        this.pump = new Pump();
        this.setIntervalChecking(this.Settings.getCheckingInterval());
    }

    private loop(){
        this.needWatering().subscribe(needWatering =>{
            if (needWatering) this.pump.wateringTime(2000);
        }) 
    }
    private needWatering():Rx.Observable<void>{
        
        return this.moistureSensor.isWet().combineLatest([this.waterLevelSensor.isWater()], (isWet, isWater)=>{
            return (!isWet&& isWater)
        })//.map(isWet =>{ return isWet && this.waterLevelSensor.isWater()})
        
    }
    private setIntervalChecking(time: number){
        this.interval = 
        Rx.Observable
        .timer(0, time)
        .timeInterval()
        .map((interval)=>{
            this.loop();
            return interval.interval.toString();
        })
        .delay(time)
    }   

    private intervalChecking(timeInMinutes: number){
        return setInterval(this.loop(), timeInMinutes * 60 * 1000)
    }

}