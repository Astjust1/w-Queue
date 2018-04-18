const uuidv4 = require('uuid/v4');

class WonderQ{
    constructor(){
        this._TIMER = 100; //timer in seconds DEFAULTS TO 100
        //To store message objects key=>id value=>message{}
        this._messageStore = new Map();

        this._beingProcessed = new Map();
        //Stores ids of setTimeouts key=>message.id value=>timeout.id
        //makes it easy to keep track of timer listeners in order to remove them
        this._timeoutStore = new Map();

        this._numConsumers = 0;
        this._numProducers = 0;
    }
    //PRIVATE METHODS
   _createTimer(){
        let timer = setTimeout((key) => {
            //when the timer expires

            //get the message
            let message = this._beingProcessed.get(key);
            //put it back into global store
            this._messageStore.set(key,message);
            //clear timer and delete reference
            let storedTimer = this._timeoutStore.get(key);
            clearTimeout(storedTimer);
            this._timeoutStore.delete(key);
        }, this._TIMER);
        return timer;
    }


    //PUBLIC METHODS
    //Gets messages for consumer and moves them to being processed
    //also starts a timer for each entry and adds that to the timer store
    getStore(){
        //console.log(this._messageStore);
        const retVal = new Map();
        this._messageStore.forEach((val,key,map)=>{
            this._beingProcessed.set(key,val);
            retVal.set(key,val);
            let timer = this._createTimer(key);
            this._timeoutStore.set(key,timer);
        })
        this._messageStore.clear();
        console.log(retVal);
        console.log(this._messageStore);
        console.log(this._beingProcessed);
        console.log(this._timeoutStore);
        return retVal;
    }

    addMessage(message){
        const id = uuidv4();
        this._messageStore.set(id,message);
       // console.log(`${id}:${message}`);
        return id;
    }
    //for monitoring purposes
    incrementCount(type){
        switch (type.toLowerCase()) {
            case 'consumer':
                this._numConsumers++;
                break;
            case 'producer':
                this._numProducers++;
                break;
            default:
                break;
        }
    }
//for monitoring purposes
    decrementCount(type){
        switch (type.toLowerCase()) {
            case 'consumer':
                this._numConsumers--;
                break;
            case 'producer':
                this._numProducers--;
                break;
            default:
                break;
        }
    }

    deleteMessage(id){
        this._beingProcessed.delete(id);
        this._timeoutStore.delete(id);
    }
    
    setTimerValue(time){
        this._TIMER = time;
    }
}

module.exports = new WonderQ();