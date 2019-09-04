export type CreateUserCommand = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type AuthenticateUserCommand = {
    email: string;
    password: string;
}

export type UpdateUserCommand = {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}

export class DeleteUserCommand {
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}