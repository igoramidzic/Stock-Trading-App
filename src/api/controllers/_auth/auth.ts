import { Router, Response, Request } from "express"
import jwt from 'jsonwebtoken'
import { SECRET } from "../../../util/secrets";
import passport from 'passport';

import * as userQueries from '../../queries/users/userQueries'
import * as userQueryHandlers from '../../queryHandlers/users/userQueryHandlers'
import * as userCommands from '../../commands/users/userCommands'
import * as userCommandHandlers from '../../commandHandlers/users/userCommandHandlers'
import { UserDocument, User } from "../../../models/users/userModel"
import { ClientResponse, serverError } from "../../helpers/helpers"

const routes: Router = Router()

/**
 * Authenticate a user
 */

routes.post('/login', (req: Request, res: Response) => {

    const { email, password } = req.body;

    User.findOne({ email })
        .then((user: UserDocument) => {
            if (!user) {
                const response = new ClientResponse(false, null);
                response.addMessage("Unable to log in with provided credentials.")
                return res.status(401).json(response);
            }

            // Compare passwords
            user.comparePassword(password, (err: Error, isMatch: boolean) => {
                if (err) return serverError(res);

                if (!isMatch) {
                    const response = new ClientResponse(false, null);
                    response.addMessage("Unable to log in with provided credentials.")
                    return res.status(401).json(response);
                }

                const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: 1000 * 60 * 60 });
                return res.status(200).json(new ClientResponse(true, { user, token }));
            });
        })
        .catch(err => serverError(res));
})

/**
 * Create a new user
 */
routes.post('/create-user', async (req: Request, res: Response) => {
    const message: userCommands.CreateUserCommand = req.body;

    const credentialErrors: string[] = [];

    if (!message.firstName) credentialErrors.push("First name cannot be empty.")
    if (!message.lastName) credentialErrors.push("Last name cannot be empty.")
    if (!message.email) credentialErrors.push("Email cannot be empty.")
    if (!message.password || message.password.length < 8)
        credentialErrors.push("Password must be at least 8 characters long.")

    if (credentialErrors.length > 0)
        return res.status(400).json(new ClientResponse(false, null, credentialErrors));

    // Check if email is already taken
    let userExists;
    await userQueryHandlers.isEmailAlreadyTaken(new userQueries.EmailAlreadyTakenQuery(message.email))
        .then((isExists: boolean) => {
            userExists = isExists;
        })
        .catch(() => {
            return serverError(res);
        })

    if (userExists) {
        const response = new ClientResponse(false, null);
        response.addMessage("Email is already taken.");
        return res.status(400).json(response);
    }

    await userCommandHandlers.createNewUser(message)
        .then((user: UserDocument) => {
            const token = jwt.sign({ userId: user.id }, SECRET);
            return res.status(200).json(new ClientResponse(true, { user, token }));
        })
        .catch(() => serverError(res))
})

module.exports = routes;