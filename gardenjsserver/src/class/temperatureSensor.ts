import * as Sensor from 'ds18b20-raspi';

export class TemperatureSensor {
    private sensor;
constructor (){
    this.sensor = Sensor;
    let interval = setInterval(this.getTemperature, 1000);
}

private getTemperature(){
    console.log(`Temperatura: ${Sensor.readSimpleC()}`)
    return Sensor.readSimpleC();
}


}