import { Router } from 'express'
import { News } from '../models/news.model.mjs'

export const newsRouter = Router()

newsRouter.get('/', async (req, res) => {
  try {
    const news = await News.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
    res.status(200).json(news)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})