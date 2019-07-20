import { Router, Response, Request } from "express";

import * as userCommands from '../../commands/users/userCommands'
import * as userCommandHandlers from '../../commandHandlers/users/userCommandHandlers'
import { UserDocument } from "../../../models/users/userModel";
import { ClientResponse } from "../../helpers/helpers";

const routes: Router = Router()

/**
 * Authenticate a user
 */
routes.post('/login', (req: Request, res: Response) => {
    const message: userCommands.AuthenticateUserCommand = req.body

    userCommandHandlers.authenticateUser(message)
        .then((user: UserDocument) => {
            console.log(user)
            res.status(200).json(new ClientResponse(true, user))
        })
        .catch(error => {
            const result: ClientResponse = new ClientResponse(false, null)

            console.log(error)
            result.addMessage("Unable to log in with provided credentials.");
            res.status(404).json(result);
        })
})

/**
 * Create a new user
 */
routes.post('/create-user', (req: Request, res: Response) => {
    const message: userCommands.CreateUserCommand = req.body

    userCommandHandlers.createNewUser(message)
        .then((user: UserDocument) => {
            console.log(user)
            res.status(200).json({ user })
        })
        .catch(error => {
            const result: ClientResponse = new ClientResponse(false, null)

            console.log(error)
            result.addMessage("Something went wrong");
            res.status(400).json(result);
        })
})

module.exports = routes;