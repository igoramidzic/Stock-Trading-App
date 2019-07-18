import { Router, Response, Request } from "express";

import * as userQueries from "../../queries/userQueries";
import * as userQueryHandlers from "../../queryHandlers/userQueryHandlers";
import * as userCommands from '../../commands/userCommands'
import * as userCommandHandlers from '../../commandHandlers/userCommandHandlers'
import { UserDocument } from "../../../models/users/userModel";

const routes: Router = Router()

/**
 * Get all users
 */
routes.get("/", (req: Request, res: Response) => {
  const message: userQueries.AllUsersQuery = {};
  userQueryHandlers.getAllUsers(message)
    .then((users: UserDocument[]) => res.json({ users }))
    .catch(error => res.send(error));
});

/**
 * Create a new user
 */
routes.post('/', (req: Request, res: Response) => {
  const message: userCommands.CreateUserCommand = req.body

  userCommandHandlers.createNewUser(message)
    .then((user: UserDocument) => {
      console.log(user)
      res.status(200).json({ user })
    })
    .catch(error => {
      res.status(400).json({ error: 'Something went wrong' })
    })
})

module.exports = routes;