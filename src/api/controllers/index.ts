import { Router } from "express"

const routes: Router = Router()

// Auth Protected
routes.use('/themes', (req, res, next) => next(), require('./themes/themes'))
routes.use('/self', (req, res, next) => next(), require('./self/self'))

// Public
routes.use('/auth', require('./_auth/auth'))
routes.use('**', (req, res) => {
    res.status(404).json({
        error: 'Api endpoint does not exist'
    })
})

module.exports = routes