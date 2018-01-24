const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
   it('should return message object', ()=>{
    var message = generateMessage('Rishabh', 'Hello');
    expect(message.from).toBe('Rishabh');
    expect(message.text).toBe('Hello');
    expect(typeof message.createdAt).toBe('number');
});
});

describe('generateLocationMessage', ()=>{
    it('should return message object', ()=>{
   var message = generateLocationMessage('Oh yeah', 69, 666);
   expect(message.from).toBe('Oh yeah');
   expect(message.url).toBe('https://www.google.com/maps?q=69,666');
   expect(typeof message.createdAt).toBe('number');
});
});
