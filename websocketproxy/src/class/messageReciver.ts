import {Message} from '../interfaces/message';

export class MessageReciver{
    
        private instructionSet: Message;

        constructor(payload: string){

            let data = JSON.parse(payload);

            if(!data.event || data.event !=="setClientTypeAs") {
                data.event = "sendForward";
                data.data = payload;
            }
            
            this.instructionSet = data;
        }

        public getInstruction(): Message {
            return this.instructionSet;
        }
        public getEvent(): String {
            return this.instructionSet.event;
        }
        public getData(): any {
            return this.instructionSet.data;
        }
    
}