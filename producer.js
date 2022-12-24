import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap() {
	const kafka = new Kafka({
		clientId: 'test-producer',
		brokers: ['******'],
		sasl: {
			mechanism: 'scram-sha-256',
			username: '******',
			password: '******',
		},
		ssl: true,
	});

	const producer = kafka.producer();

	await producer.connect();

	await producer.send({
		topic: 'notifications.send-notification',
		messages: [
			{
				value: JSON.stringify({
					content: 'You receive a new message from kafka producer!!',
					category: 'social',
					recipientId: randomUUID(),
				}),
			},
		],
	});

	await producer.disconnect();
}

bootstrap();
