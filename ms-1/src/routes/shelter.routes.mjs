import { Router } from 'express'
import { randomUUID } from 'crypto'
import { Shelter } from '../models/shelter.model.mjs'
import { channel, queue } from '../amqp.mjs'

export const shelterRouter = Router()

shelterRouter.post('/', async (req, res) => {
  try {
    const { name, contact, address, isAvailable, lat, lng } = req.body
    const id = randomUUID()
    const shelter = await Shelter.create({
      id,
      name,
      contact,
      address,
      isAvailable,
      lat,
      lng
    })
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(shelter)))
    res.status(201).json(shelter)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

shelterRouter.get('/', async (req, res) => {
  try {
    const shelters = await Shelter.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
    res.status(200).json(shelters)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

shelterRouter.get('/:id', async (req, res) => {
  try {
    const shelter = await Shelter.findByPk(req.params.id)
    res.status(200).json(shelter)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})