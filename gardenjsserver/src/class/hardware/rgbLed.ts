import * as pigpio from 'pigpio'
export class RgbLed{

    private rgbPins = {red: null, green: null, blue: null};
    constructor(redPin: number, greenPin: number, bluePin:number){
        
        pigpio.initialize(); // pigpio C library initialized here

        process.on('SIGINT', function () {
         
          pigpio.terminate(); // pigpio C library terminated here
      
          console.log('Terminating...');
        });
        
      this.rgbPins.red = new pigpio.Gpio(redPin, {mode: pigpio.Gpio.OUTPUT});
    this.rgbPins.green = new pigpio.Gpio(greenPin, {mode: pigpio.Gpio.OUTPUT});
    this.rgbPins.blue = new pigpio.Gpio(bluePin, {mode: pigpio.Gpio.OUTPUT});
      this.rgbPins.red.pwmWrite(0);
      this.rgbPins.blue.pwmWrite(255);
      this.rgbPins.green.pwmWrite(255);
      let dutyCycle =0;
          
     
    }
}