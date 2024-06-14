import express from 'express'
import { db } from './db.mjs'
import { routes } from './routes/index.mjs'
import cors from 'cors'
import { shelters } from './shelters.mjs'
import { Shelter } from './models/shelter.model.mjs'
import { randomUUID } from 'crypto'
import './amqp.mjs'

await db.sync({ force: true });

for (const shelter of shelters) {
  await Shelter.create({
    id: randomUUID(),
    name: shelter.name,
    contact: 'Não informado',
    address: shelter.address,
    isAvailable: true,
    lat: shelter.lat,
    lng: shelter.lng
  })
}

const app = express()
app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000 🚀');
})