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

export let authenticateUser = (command: userCommands.AuthenticateUserCommand) => new Promise((resolve, reject) => {
    resolve({ firstName: "Igor", lastName: "Amidzic", email: "amidzicigor46@gmail.com" });
})