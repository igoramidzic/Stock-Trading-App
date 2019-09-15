import { Router, Response, Request } from "express";
import { ClientResponse, serverError } from '../../helpers/helpers'
import { getAccount } from "../../../api/queryHandlers/account/accountQueryHandlers";
import { AccountDocument } from "../../../models/account/account";

const routes: Router = Router()

/**
 * Get account
 */
routes.get("/", (req: Request, res: Response) => {
    getAccount(req.user._id)
        .then((account: AccountDocument) => {
            return res.status(200).json(new ClientResponse(true, { account }))
        })
        .catch(() => {
            return serverError(res)
        })
});

module.exports = routes;