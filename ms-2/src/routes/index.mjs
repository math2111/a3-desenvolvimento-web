import { Router } from 'express'
import { newsRouter } from './news.routes.mjs'

const routes = Router()

routes.use('/news', newsRouter)

export { routes }