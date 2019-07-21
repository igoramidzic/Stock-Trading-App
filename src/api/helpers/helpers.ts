import { Response } from "express";

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

export let serverError = (res: Response) => {
    const response = new ClientResponse(false, null);
    response.addMessage("Something went wrong");
    return res.status(500).json(response);
}