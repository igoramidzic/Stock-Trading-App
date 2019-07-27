import { Router } from "express"

const routes: Router = Router()


// Auth Protected
routes.use('/themes', (req: any, res: any, next: any) => {
    req.user ? next() : res.status(401).json({ error: 'login is required' });
}, require('./self/self'), require('./themes/themes'))
routes.use('/self', (req: any, res: any, next: any) => {
    req.user ? next() : res.status(401).json({ error: 'login is required' });
}, require('./self/self'))
routes.use('/stock', (req: any, res: any, next: any) => {
    req.user ? next() : res.status(401).json({ error: 'login is required' });
}, require('./self/self'), require('./stock/stock'))

// Public
routes.use('/auth', require('./_auth/auth'))
routes.use('**', (req, res) => {
    res.status(404).json({
        error: 'Api endpoint does not exist'
    })
})

module.exports = routes