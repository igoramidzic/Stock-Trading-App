import { User, UserDocument } from "../../../models/users/userModel";
import { AllUsersQuery } from "../../queries/user/userQueries";

export let isEmailAlreadyTaken = (email: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
        User.findOne({ email })
            .then((user: UserDocument) => {
                resolve(user ? true : false);
            })
            .catch(error => {
                reject(error);
            })
    });

export let getAllUsers = (query: AllUsersQuery) => new Promise((resolve, reject) => {
    User.find()
        .then((users: UserDocument[]) => {
            resolve(users);
        })
        .catch(error => {
            reject();
        });
});