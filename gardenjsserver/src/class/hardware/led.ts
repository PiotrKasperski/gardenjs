import * as onoff from "onoff";

export class LED {
    private led: onoff.Gpio;
    constructor(ledGpioPin:number){
        this.led = new onoff.Gpio(ledGpioPin, 'out');
    }
    public start(){
        this.led.writeSync(1);
    }
    public stop(){
        this.led.writeSync(0);
    }
   
}