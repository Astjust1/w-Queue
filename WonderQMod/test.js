const wonderQ = require('./messageStore');

//IT LIVES
let id1 = wonderQ.addMessage({message:'haaan',data:12});
let id2 = wonderQ.addMessage('Yerrrr');

let store = wonderQ.getStore();

console.log(store);

wonderQ.deleteMessage(id1);


console.log(wonderQ._beingProcessed);
console.log(wonderQ._timeoutStore);