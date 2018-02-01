class Users{
    constructor() {
        this.users = [];
        }

        addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }



    removeUser(id) {
var user = this.users.filter((user)=>user.id===id)[0];
if(user) {
    this.users = this.users.filter((user)=>user.id!==id);
}

return user;

    }

    getUser(id) {
        var users = this.users.filter((user)=> user.id===id);
        return users;
    }

    getUsersList(room){
   var users = this.users.filter((user)=> user.room===room);
   var namesList = users.map((user)=> user.name);
   return namesList;
    }

}

module.exports = {Users};





// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//
//     }
//     getUserDescription() {
//         return (`${this.name} is ${this.age} year(s) old`);
//     }
//
// }
//
// var me = new Person('Rishabh',19);
// var description = me.getUserDescription();
// console.log(description)