import { StockDetailsDocument } from "../../../models/stock/stockDetails";
import { UserDocument, User } from "../../../models/users/userModel";
import _ from 'lodash';
import { completeTutorialItem } from "../tutorial/tutorialCommandHandlers";
import { getTutorialItem } from "../../../api/queryHandlers/tutorial/tutorialQueryHandlers";
import { TutorialItems } from "../../../models/tutorial/tutorialModel";

export let addWatchStock = (user: UserDocument, stock: StockDetailsDocument) =>
    new Promise(async (resolve, reject) => {
        user.watchStocks.push(stock)
        user.save()
            .then(async (user: UserDocument) => {
                user.populate('watchStocks').execPopulate()
                    .then(async (user: UserDocument) => {
                        resolve(user.watchStocks);
                    })
                    .catch((err: any) => {
                        reject(err)
                    })

                try {
                    await completeTutorialItem(await getTutorialItem(TutorialItems.AddStockToWatchlist), user);
                } catch (error) { }
            })
            .catch((err: any) => {
                reject(err)
            })
    })

export let removeWatchStock = (user: UserDocument, stock: StockDetailsDocument) =>
    new Promise(async (resolve, reject) => {
        try {
            user = await user.populate('watchStocks').execPopulate()
        } catch (e) {
            reject(e)
        }

        User.findOneAndUpdate({ _id: user._id }, { $pullAll: { watchStocks: [stock._id] } }, { new: true })
            .populate('watchStocks').exec((err: any, user: UserDocument) => {
                if (err)
                    reject(err)
                resolve(user.watchStocks)
            })
    })