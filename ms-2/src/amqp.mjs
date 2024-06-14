import { connect } from 'amqplib'

const queue = 'shelter.created'
const amqpConn = await connect('amqp://rabbitmq:rabbitmq@localhost:5672')

const channel = await amqpConn.createChannel()
await channel.assertQueue(queue, { durable: true })

export { channel, queue }