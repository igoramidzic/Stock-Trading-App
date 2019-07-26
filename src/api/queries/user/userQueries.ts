export class AllUsersQuery { };

export class EmailAlreadyTakenQuery {
    email: string;

    constructor(email: string) {
        this.email = email;
    }
}