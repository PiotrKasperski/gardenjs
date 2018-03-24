import * as onoff from "onoff";

export class Relay{
    private GPIO = onoff.Gpio;
    private relay: onoff.Gpio;

    constructor(relayGpioPin: number){
        this.relay=  new this.GPIO(relayGpioPin, 'out');
        this.relay.writeSync(1);

    }

    public start(){
        console.log(`start pumping warter`);
       this.relay.writeSync(0);

    };
    public stop(){
        console.log(`stop pumping water`);
        this.relay.writeSync(1);
    };

}