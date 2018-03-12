import * as WebSocket from 'ws';

export class WebSocketClient extends WebSocket {
    
    private clientType: string;


	public getCclientType(): string {
		return this.clientType;
	}

	public setClientType(value: string) {
		this.clientType = value;
	}

    public isClient():boolean{
        return this.clientType === 'client';
    }
  

}