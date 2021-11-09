const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom, addUserSuwit, removeUserSuwit, getUsersInSuwit } = require('./users');

const PORT = process.env.PORT || 5000

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        // socket.emit('message', { user:'admin', text: `${user.name}, welcome to the room ${user.room}`});
        
        socket.join(room);
        
        let datas = getUsersInRoom(room);

        console.log(user);
        
        io.to(user.room).emit('message', {datas});
        
        // io.to(user.room).emit('roomData', { room: user.room , users: getUsersInRoom(user.room)})
        
        callback();
    });
    
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user:user .name, text: message});
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

        if (message === 'Hi')    {
            io.to(user.room).emit('message', { user:'admin', text: `Hi ${user.name}, Salken`});
        }

        callback();
    });

    socket.on('suwit', ({name, cus}, callback) => {
        const { error, user } = addUserSuwit({ id: socket.id, name , cus});

        // if(error) return callback(error);

        let userSuwit = getUsersInSuwit();

        console.log(userSuwit);

        io.to('suwit').emit('result', {userSuwit});
        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        const userSuwit = removeUserSuwit(socket.id);

        const datas = getUsersInRoom('suwit')

        console.log(datas);

        io.to('suwit').emit('message', {datas});


        // if(user){
        //     io.to(user.room).emit('message', {user : 'admin', text: `${user.name} has left`})
        // }
    })
});

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));