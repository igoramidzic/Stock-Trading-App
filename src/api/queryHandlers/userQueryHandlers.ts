import { User, UserDocument } from "../../models/users/userModel";
import { AllUsersQuery } from "../queries/userQueries";

export let getAllUsers = (query: AllUsersQuery) => new Promise((resolve, reject) => {
    User.find()
        .then((users: UserDocument[]) => {
            resolve(users);
        })
        .catch(error => {
            reject();
        });
});