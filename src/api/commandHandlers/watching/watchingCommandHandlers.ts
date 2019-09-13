import { StockDetailsDocument } from "../../../models/stock/stockDetails";
import { UserDocument, User } from "../../../models/users/userModel";
import _ from 'lodash';

export let addWatchStock = (user: UserDocument, stock: StockDetailsDocument) =>
    new Promise(async (resolve, reject) => {

        user.watchStocks.push(stock)
        user.save()
            .then((user: UserDocument) => {
                user.populate('watchStocks').execPopulate()
                    .then((user: UserDocument) => {
                        resolve(user.watchStocks);
                    })
                    .catch((err: any) => {
                        reject(err)
                    })
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