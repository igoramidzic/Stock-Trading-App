import { User, UserDocument } from '../../../models/users/userModel'
import * as userCommands from '../../commands/users/userCommands'

export let createNewUser = (command: userCommands.CreateUserCommand) => new Promise((resolve, reject) => {
    User.create(command)
        .then((user: UserDocument) => {
            resolve(user)
        })
        .catch((error: any) => {
            reject(error)
        })
})