import { Router, Response, Request } from "express";
import { ClientResponse, serverError } from '../../helpers/helpers'
import { getTransactions } from "../../../api/queryHandlers/transaction/transactionQueryHandlers";
import { TransactionDocument } from "../../../models/transaction/transactionModel";

const routes: Router = Router()

/**
 * Get transactions
 */
routes.get("/", async (req: Request, res: Response) => {
    getTransactions(req.user._id)
        .then((transactions: TransactionDocument[]) => {
            return res.status(200).json(new ClientResponse(true, { transactions }))
        })
        .catch((err: any) => {
            return serverError(res)
        })
});

module.exports = routes;