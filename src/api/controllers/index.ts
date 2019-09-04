import { Router, Request, Response } from "express"

const routes: Router = Router()

// Public
routes.use('/auth', require('./_auth/auth'))

// Auth Protected
routes.use((req: Request, res: Response, next: any) => {
    req.user ? next() : res.status(401).json({ error: 'login is required' });
}), routes.use('/themes', require('./themes/themes')),
    routes.use('/self', require('./self/self')),
    routes.use('/stock', require('./stock/stock')),
    routes.use('/bankAccounts', require('./bankAccount/bankAccount')),
    routes.use('/account', require('./account/account')),
    routes.use('**', (req, res) => {
        res.status(404).json({
            error: 'Api endpoint does not exist'
        })
    })

module.exports = routes