const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', ()=>{
   it('should return message object', ()=>{
    var message = generateMessage('Rishabh', 'Hello');
    expect(message.from).toBe('Rishabh');
    expect(message.text).toBe('Hello');
    expect(typeof message.createdAt).toBe('number');
});
});
