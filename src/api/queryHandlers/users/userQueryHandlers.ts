import { User, UserDocument } from "../../../models/users/userModel";
import { AllUsersQuery, EmailAlreadyTakenQuery } from "../../queries/users/userQueries";

export let isEmailAlreadyTaken = (query: EmailAlreadyTakenQuery) => new Promise((resolve, reject) => {
    User.findOne(query)
        .then((user: UserDocument) => {
            resolve(user ? true : false);
        })
        .catch(error => {
            console.log(error)
            reject(error);
        });
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