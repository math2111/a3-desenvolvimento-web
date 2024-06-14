import { Router } from 'express'
import { shelterRouter } from './shelter.routes.mjs'

const routes = Router()

routes.use('/shelters', shelterRouter)

export { routes }