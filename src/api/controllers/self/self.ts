import { Router, Response, Request } from "express";
import { Theme, ClientResponse } from '../../helpers/helpers'

const routes: Router = Router()

/**
 * Get current user details
 */
routes.get("/", (req: Request, res: Response) => {
    res.status(200).json(new ClientResponse(true, { user: req.user }))
});

module.exports = routes;