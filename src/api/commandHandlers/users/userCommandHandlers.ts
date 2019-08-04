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

export let updateUserDetails = (userId: string, user: User) => new Promise((resolve, reject) => {
    User.findByIdAndUpdate(userId, user, { new: true })
        .then((user: UserDocument) => {
            resolve(user)
        })
        .catch((error: any) => {
            reject(error)
        })
})

export let updateUserPassword = (userId: string, password: string) => new Promise((resolve, reject) => {
    User.findById(userId)
        .then((user: UserDocument) => {
            user.password = password;
            user.save().then(() => resolve(true));
        })
        .catch((error: any) => {
            reject(error);
        })
})