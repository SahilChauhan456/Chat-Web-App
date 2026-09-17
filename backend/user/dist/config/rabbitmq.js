import amqp from 'amqplib';
let channel;
export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.Rabbitmq_Host ?? "localhost",
            port: 5672,
            username: process.env.Rabbitmq_Username ?? "admin",
            password: process.env.Rabbitmq_Password ?? "admin123",
        });
        channel = await connection.createChannel();
        console.log("✅ connected to rabbitmq");
    }
    catch (error) {
        console.log("Failed to Connect rabbitmq", error);
    }
};
export const publishToQueue = async (queueName, message) => {
    if (!channel) {
        console.log("Rabbitmq channel is not intialize");
        return;
    }
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
        persistent: true
    });
};
//# sourceMappingURL=rabbitmq.js.map