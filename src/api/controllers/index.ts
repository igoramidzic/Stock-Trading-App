import { Router } from "express"

const routes: Router = Router()

routes.use('/auth', require('./_auth/auth'))
routes.use('/themes', require('./themes/themes'))

routes.use('**', (req, res) => {
    res.status(404).json({
        error: 'Api endpoint does not exist'
    })
})

module.exports = routes