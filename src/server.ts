import errorHandler from "errorhandler";
import * as http from 'http'
import app from "./app";
import socketio from 'socket.io'

const server = http.createServer(app)

// Start socketio
const io = socketio(server)

io.on('connection', () => {
  console.log("New user connected")
})

setInterval(() => {
  io.emit('theme-update', Math.floor(Math.random() * 4) + 1)
}, 5000)

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
server.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
