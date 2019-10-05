import { TutorialItem, TutorialItemDocument } from "../../../models/tutorial/tutorialModel";
import { UserDocument, User } from "../../../models/users/userModel";
import { getTutorialItems } from "../../../api/queryHandlers/tutorial/tutorialQueryHandlers";

export let createTutorialItem = (identifier: number, description: string, order: number, link?: string): Promise<TutorialItemDocument> =>
    new Promise(async (resolve, reject) => {
        TutorialItem.create({ identifier, description, link, order })
            .then((tutorialItem: TutorialItemDocument) => {
                resolve(tutorialItem);
            })
            .catch((err: any) => {
                reject(err)
            })
    })

export let completeTutorialItem = (tutorialItem: TutorialItemDocument, user: UserDocument): Promise<TutorialItemDocument[]> =>
    new Promise(async (resolve, reject) => {
        user.tutorialItems.push(tutorialItem);

        try {
            await User.findOneAndUpdate({ _id: user._id }, user);
            resolve(await getTutorialItems(user));
        } catch (error) {
            reject(error)
        }
    })

export let hideTutorial = (user: UserDocument): Promise<boolean> =>
    new Promise(async (resolve, reject) => {
        user.hideTutorial = true;

        try {
            await User.findOneAndUpdate({ _id: user._id }, user);
            resolve(true);
        } catch (error) {
            reject(error)
        }
    })

export let showTutorial = (user: UserDocument): Promise<boolean> =>
    new Promise(async (resolve, reject) => {
        user.hideTutorial = false;

        try {
            await User.findOneAndUpdate({ _id: user._id }, user);
            resolve(false);
        } catch (error) {
            reject(error)
        }
    })