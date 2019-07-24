import errorHandler from "errorhandler";
import * as http from 'http'
import app from "./app";
import socketio from 'socket.io'

const server = http.createServer(app)

// Start socketio
const io = socketio(server)

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Set socketio to app
 */
app.set('socketio', io);

/**
 * Start default socketio emitters
 */
import { socketEmitters } from './socketio/socketio';
socketEmitters(io)

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
