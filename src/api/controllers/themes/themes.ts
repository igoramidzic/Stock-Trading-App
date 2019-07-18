import { Router, Response, Request } from "express";
import { Theme, ClientResponse } from '../../helpers/helpers'

const routes: Router = Router()

/**
 * Get current theme
 */
routes.get("/active", (req: Request, res: Response) => {
    const result = {
        theme: Theme.OpenUp
    }
    res.status(200).json(new ClientResponse(true, result))
});

module.exports = routes;