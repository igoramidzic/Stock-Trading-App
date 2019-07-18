import socketio from 'socket.io'

import server from './server'

const io = socketio(server)

io.origins((origin, callback) => {
    // if (origin !== 'https://foo.example.com') {
    //     return callback('origin not allowed', false);
    // }
    callback(null, true);
});

console.log("heeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
io.on('connection', () => {
    console.log("Connsdfasdfected!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("Connsdfasdfected!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("Connsdfasdfected!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("Connsdfasdfected!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("Connsdfasdfected!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("Connsdfasdfected!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("Connsdfasdfected!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("Connsdfasdfected!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("Connsdfasdfected!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("Connsdfasdfected!!!!!!!!!!!!!!!!!!!!!!!!!!")
})

setInterval(() => {
    io.emit('hello', { hello: 'world' })
}, 3000)