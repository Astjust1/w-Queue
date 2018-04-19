const uuidv4 = require('uuid/v4');


class WonderQ{
    constructor(){
        this._TIMER = 10000; //timer in milliseconds DEFAULTS TO 100
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
   _createTimer(key,duration){
       //console.log(`starting timer ${key}`);
        let timer = setTimeout(function(key){
            //when the timer expires
           // console.log(this);
            //get the message
           // console.log(this._beingProcessed);
            let message = this._beingProcessed.get(key);
            console.log(`Timer expired: ${key}=>${message}`);
           // console.log(this._messageStore);
               //put it back into global store
               this._messageStore.set(key, message);
               //clear timer and delete reference
               this._deleteTimer(key);
           // console.log(this._timeoutStore);
        }.bind(this,key), duration || this._TIMER);
 // console.log(timer);
        return timer;
    }

    _deleteTimer(key){
        let storedTimer = this._timeoutStore.get(key);
        //console.log(this._timeoutStore);
        clearTimeout(storedTimer);
        this._timeoutStore.delete(key);
        //console.log(this._timeoutStore);
    }


    //PUBLIC METHODS
    //Gets messages for consumer and moves them to being processed
    //also starts a timer for each entry and adds that to the timer store
    getStore(){
        //console.log(this._messageStore);
        //const retVal = new Map();
        let retVal = {};
        this._messageStore.forEach((val,key,map)=>{
            this._beingProcessed.set(key,val);
            //console.log(this._beingProcessed);
            //console.log(val);
            //retVal.set(key,val);
            retVal[key] = val;
            let timer = this._createTimer(key);
            //console.log(timer);
            this._timeoutStore.set(key,timer);
        })
        this._messageStore.clear();
      //  console.log(retVal);
       // console.log(this._messageStore);
       // console.log(this._beingProcessed);
       // console.log(this._timeoutStore);
        return retVal;
    }

    addMessage(message){
        const id = uuidv4();
        this._messageStore.set(id,message);
        console.log(`Adding: ${id}=>${message}`);
        return id;
    }
    //for monitoring purposes
    incrementCount(type){
        switch (type.toLowerCase()) {
            case 'consumer':
                this._numConsumers++;
                console.log(`Number of consumers is ${this._numConsumers}`);
                break;
            case 'producer':
                this._numProducers++;
                console.log(`Number of producers is ${this._numProducers}`);
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
                console.log(`Number of consumers is ${this._numConsumers}`);
                break;
            case 'producer':
                this._numProducers--;
                console.log(`Number of producers is ${this._numProducers}`);
                break;
            default:
                break;
        }
    }

    deleteMessage(id){
        console.log(`deleting=> ${id}`);
        this._beingProcessed.delete(id);
        this._deleteTimer(id);
    }
    
    setTimerValue(time){
        this._TIMER = time;
    }

    notifyExpiry(socket){

    }
}
//singleton
module.exports = new WonderQ();