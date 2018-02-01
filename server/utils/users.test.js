const {Users} = require('./users');
const expect= require('expect');

describe('Users test', ()=>{

var users;
beforeEach(()=>{
    users = new Users();
users.users = [{
    id:'1', name: 'Rishabh', room:"oho"
}, {
    id:'2', name:'Arjun', room:'aha'
}, {
    id:'3', name:'Manas', room:'oho'
}];
});


it('should add new user', ()=>{
        var users = new Users();

        var user = {
            id : 123,
            name: 'Rishabh',
            room: 'Oh yeah'
        };

       var resUser =  users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user]);
});

it('should get user with id', ()=>{
   var users1 = users.getUser('1');
   expect(users1[0].name).toEqual('Rishabh');
});


it('should not get user if incorrect id', ()=>{
    var users2 = users.getUser('23');
 expect(users2).toEqual([]);
});


it('should get users list', ()=>{
    var namesList = users.getUsersList('oho');
    var namesList1 = users.getUsersList('aha');

    expect(namesList).toEqual(['Rishabh', 'Manas']);
    expect(namesList1).toEqual(['Arjun']);
});

it('should remove user',()=>{
var user = users.removeUser('1');
expect(users.users.length).toBe(2);
expect(user.name).toBe('Rishabh');
});

it('shouldnt remove user because id incorrect', ()=>{
    var user = users.removeUser('22');
    expect(users.users.length).toBe(3);

});















});

