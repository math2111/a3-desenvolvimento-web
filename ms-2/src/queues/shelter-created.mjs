import { randomUUID } from 'crypto';
import { channel, queue } from '../amqp.mjs'
import { News } from '../models/news.model.mjs';

channel.consume(queue, async (msg) => {
  if (msg) {
    const shelter = JSON.parse(msg.content.toString());
    await News.create({
      id: randomUUID(),
      shelterName: shelter.name,
      shelterAddress: shelter.address,
      shelterContact: shelter.contact,
      date: new Date()
    })
    channel.ack(msg)
  }
})