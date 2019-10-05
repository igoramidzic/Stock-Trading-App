import { Router, Response, Request } from "express";
import { createTutorialItem, completeTutorialItem } from "../../../api/commandHandlers/tutorial/tutorialCommandHandlers";
import { TutorialItemDocument, TutorialItems } from "../../../models/tutorial/tutorialModel";
import { serverError, ClientResponse } from "../../../api/helpers/helpers";
import { getTutorialItems, getTutorialItem } from "../../../api/queryHandlers/tutorial/tutorialQueryHandlers";

const routes: Router = Router()

/**
 * Get TutorialItems
 */
routes.get("/", async (req: Request, res: Response) => {
    let tutorialItems: TutorialItemDocument[];

    try {
        tutorialItems = await getTutorialItems(req.user);
    } catch (error) {
        return serverError(res);
    }
    return res.status(200).json(new ClientResponse(true, { tutorialItems }));
});

/**
 * Create TutorialItem
 */
routes.post("/", async (req: Request, res: Response) => {
    const { identifier, description, link, order } = req.body;
    const errors: string[] = [];

    if (!identifier) errors.push("Identifier cannot be empty.")
    if (!description) errors.push("Description cannot be empty.")
    if (!order) errors.push("Order cannot be empty.")
    if (link != null && link.length == 0) errors.push("If link is provided, it cannot be empty.")

    if (errors.length > 0)
        return res.status(400).json(new ClientResponse(false, null, errors));

    let tutorialItem: TutorialItemDocument;
    try {
        tutorialItem = await createTutorialItem(identifier, description, order, link);
    } catch (error) {
        return serverError(res);
    }

    if (!tutorialItem)
        return serverError(res);

    return res.status(200).json(new ClientResponse(true, { tutorialItem }));
});

module.exports = routes;