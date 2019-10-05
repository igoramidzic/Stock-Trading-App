export type TutorialItem = {
    _id?: string;
    description?: string;
    identifier?: number;
    link?: string;
    order?: number;
    completed?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}