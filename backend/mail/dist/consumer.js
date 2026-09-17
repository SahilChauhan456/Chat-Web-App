import amqp from "amqplib";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
export const startSendOtpConsumer = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.Rabbitmq_Host ?? "localhost",
            port: 5672,
            username: process.env.Rabbitmq_Username ?? "admin",
            password: process.env.Rabbitmq_Password ?? "admin123",
        });
        const channel = await connection.createChannel();
        const queueName = "send-otp";
        await channel.assertQueue(queueName, { durable: true });
        console.log("✅ Mail Service Consumer Started , listening  for otp emails");
        channel.consume(queueName, async (msg) => {
            if (msg) {
                try {
                    const { to, subject, body } = JSON.parse(msg.content.toString());
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        auth: {
                            user: process.env.USER,
                            pass: process.env.PASSWORD,
                        }
                    });
                    await transporter.sendMail({
                        from: "Chat app",
                        to,
                        subject,
                        text: body
                    });
                    console.log(`Otp mail sent to ${to}`);
                    channel.ack(msg);
                }
                catch (error) {
                    console.log("Failed to send otp", error);
                }
            }
        });
    }
    catch (error) {
        console.log("Failed to start RabbitMQ Consumer", error);
    }
};
//# sourceMappingURL=consumer.js.map