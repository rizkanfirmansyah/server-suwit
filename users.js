const users = [];
const userSuwits = [];

const addUser = ({ id, name, room}) => {
    // name = name.trim().toLowerCase();
    // room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room  && user.name === name);

    if(existingUser){
        return {error : 'Username is taken'}
    }

    const user = { id, name, room};

    users.push(user);

    return { user }

}

const addUserSuwit = ({id, name, cus}) => {
    // name = name.trim().toLowerCase();
    // room = room.trim().toLowerCase();

    const existingUserSuwit = userSuwits.find((userSuwit) => userSuwit.name === name);

    // console.log(existingUserSuwit);

    if(existingUserSuwit){
        return {error : 'Username is taken'}
    }

    const userSuwit = {id, name, cus};

    userSuwits.push(userSuwit);

    return { userSuwits }

}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1) [0];
    }
}

const removeUserSuwit = (id) => {
    const index = userSuwits.findIndex((user) => user.id === id);

    if(index !== -1) {
        return userSuwits.splice(index, 1) [0];
    }
}

const getUser = (id) => users.find((user) => user.id === id );

const getUsersInRoom = (room) => users.filter((user) => user.room == room);

const getUsersInSuwit = () => userSuwits;

module.exports = { addUser, removeUser, getUser, getUsersInRoom, addUserSuwit, removeUserSuwit, getUsersInSuwit};