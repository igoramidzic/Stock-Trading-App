import { Router } from "express"

const routes: Router = Router()

routes.use('/users', require('./users/users'))

routes.use('**', (req, res) => {
    res.status(404).json({})
})

module.exports = routes