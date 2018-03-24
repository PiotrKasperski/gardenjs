
import * as fs from 'fs';
export class ds18b20 {
    constructor(){
        fs.readFile(`/sys/bus/w1/devices/28-00000a049409/w1_slave`, (err, data) => {
            if (err) {
                return console.log(err);
            }
            //console.log(`w1 data: ${data.toString().substr(data.toString().search('t=') + 2, 5)}`)
        })
        fs.watchFile(`/sys/bus/w1/devices/28-00000a049409/w1_slave`,{interval: 1}, (curr, prev) =>{
            console.log(prev, curr);
            fs.readFile(`/sys/bus/w1/devices/28-00000a049409/w1_slave`, (err, data) => {
            if (err) {
                return console.log(err);
            }
            //console.log(`w1 data: ${data.toString().substr(data.toString().search('t=') + 2, 5)}`)
        })
        })
        
    }
}