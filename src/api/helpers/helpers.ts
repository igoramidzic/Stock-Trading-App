export enum Theme {
    OpenUp = 1,
    OpenDown = 2,
    ClosedUp = 3,
    ClosedDown = 4
}

export class ClientResponse {
    isSuccess: boolean;
    result: object;
    messages: string[];

    constructor(isSuccess: boolean, result: object, messages?: string[]) {
        this.isSuccess = isSuccess;
        this.result = result;
        this.messages = messages ? messages : [];
    }

    addMessage(message: string): void {
        this.messages.push(message);
    }
}