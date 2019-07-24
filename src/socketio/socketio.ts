import { Socket } from "socket.io";

export const socketEmitters: any = (io: Socket) => {
    setInterval(() => {
        io.emit('theme-update', Math.floor(Math.random() * 4) + 1)
    }, 10000)
}