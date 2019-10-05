import { UserDocument } from "../../../models/users/userModel";
import { TutorialItemDocument, TutorialItem, TutorialItems } from "../../../models/tutorial/tutorialModel";

export let getTutorialItems = (user: UserDocument): Promise<TutorialItemDocument[]> => new Promise((resolve, reject) => {
    user.populate('tutorialItems')
        .execPopulate().then((user: UserDocument) => {
            TutorialItem.find({}).sort('order')
                .then((tutorialItems: TutorialItemDocument[]) => {
                    let mappedItems: TutorialItemDocument[] = tutorialItems.map((item) => {
                        item = {
                            ...item.toJSON(), completed: user.tutorialItems.findIndex((userItem) => {
                                return userItem._id.equals(item._id)
                            }) >= 0 ? true : false
                        }
                        return item;
                    })
                    resolve(mappedItems)
                })
                .catch((err: any) => {
                    reject(err);
                })
        })
        .catch((err: any) => {
            console.log(err)
        })
});

export let getTutorialItem = (identifier: TutorialItems): Promise<TutorialItemDocument> => new Promise((resolve, reject) => {
    TutorialItem.findOne({ identifier })
        .then((tutorialItem: TutorialItemDocument) => {
            resolve(tutorialItem)
        })
        .catch((err: any) => {
            reject(err);
        })
});