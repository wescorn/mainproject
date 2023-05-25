const amqp = require('amqplib');
const database = require('../infrastructure/database')

async function messageListener() {
    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect('amqp://rabbitmq');
    
        // Create a channel
        const channel = await connection.createChannel();

        // Declare an exchange
        const exchange = 'OrderExchange';
        //await channel.assertExchange(exchange, 'direct');

        // Declare a queue
        const queue = 'OrderStatusChangedQueue'; 
        await channel.assertQueue(queue);

        // Bind the queue to the exchange with a routing key
        const routingKey = 'changed'; 
        await channel.bindQueue(queue, exchange, routingKey);

        // TODO Fix Queue and Exchange based on what we want too do and then include the functionality for what it's listening for
    
        // Consume messages from the queue
        channel.consume(queue, (message) => {
            const payload = message.content.toString();
            const orderDto = JSON.parse(payload);
            
            // Process the received message
            database.adjustProductStock(orderDto);

            // Acknowledge the message
            channel.ack(message);
        });
    
        console.log('Listening to RabbitMQ');
    } catch (error) {
        console.error('Failed to listen to RabbitMQ:', error);
    }
}

module.exports = {messageListener};