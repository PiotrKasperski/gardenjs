

export class Settings{

    private checkingInterval = 20000;
    private defaultMoisture = 800;
    
    constructor(){
       
    }
    public getCheckingInterval():number{
        return this.checkingInterval;
    }
    public getDefaultMoisture():number{
        return this.defaultMoisture;
    }

}