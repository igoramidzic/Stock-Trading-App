import { User, UserDocument } from "../../../models/users/userModel";
import _ from "lodash";
import mongoose from "mongoose";
import { StockDetailsDocument } from "../../../models/stock/stockDetails";

export let getWatchedStocks = (userId: string): Promise<StockDetailsDocument[]> => new Promise((resolve, reject) => {
    User.findById(userId).populate('watchStocks').exec((err: any, user: UserDocument) => {
        if (err)
            reject(err)
        resolve(user.watchStocks);
    })
});

export let getIfWatchingStock = (userId: string, stockId: mongoose.Types.ObjectId): Promise<boolean> => new Promise((resolve, reject) => {
    User.findById(userId).populate('watchStocks').exec((err: any, user: UserDocument) => {
        if (err)
            reject(err)

        resolve(_.findIndex(user.watchStocks, { _id: stockId }) >= 0 ? true : false);
    })
});