import express from 'express'
import { db } from './db.mjs'
import { routes } from './routes/index.mjs'
import cors from 'cors'
import { shelters } from './shelters.mjs'
import { News } from './models/news.model.mjs'
import { randomUUID } from 'crypto'
import './queues/shelter-created.mjs'

await db.sync({ force: true });

for (const shelter of shelters) {
  await News.create({
    id: randomUUID(),
    shelterName: shelter.name,
    shelterAddress: shelter.address,
    shelterContact: 'Não informado',
    date: new Date(new Date().setUTCDate(new Date().getUTCDate() - 1))
  })
}

const app = express()
app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(3001, () => {
  console.log('Server started at http://localhost:3001 🚀');
})