import 'dotenv/config';
import { RelayClient, RelayConsumer } from '@signalwire/node';
import express, { application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

if (!process.env.MY_NUMBER ||
    !process.env.PROJECT_ID ||
    !process.env.API_TOKEN ||
    !process.env.CONTEXT) {
    console.log(process.env);
    console.error('Environmental variables missing.  Please configure .env file with the required variables: SIGNALWIRE_PROJECT_ID, SIGNALWIRE_API_TOKEN, SIGNALWIRE_CONTEXT, MY_NUMBER, AUDIO_URL');
    process.exit();
}

app.post("/", (req, res) => {
    let { to, message } = req.body;

    if (to && message) {
        sendText(to, message).catch(console.error);

        return res.send({
            to: to,
            message: message,
            success: true
        });
    }
})

async function sendText(toPhone, message) {
    const myNumber = process.env.MY_NUMBER;

    console.log("[ON]");
    try {
        const client = new RelayClient({
            project: process.env.PROJECT_ID,
            token: process.env.API_TOKEN
        });

        client.on('signalwire.ready', async (client) => {
            console.log('[READY]');

            let data = {
                context: 'txt',
                from: process.env.MY_NUMBER,
                to: `+1${toPhone}`,
                body: message
            };

            const sendResult = await client.messaging.send(data)

            if (sendResult.successful) {
                console.log(data)
                console.log('=====================')
                console.log(sendResult)
            } else {
                console.error('[ERROR] ', sendResult.result);
                console.error('[ERROR] ', sendResult.errors);
            }

            client.disconnect();
        });

        client.connect();
    } catch (err) {
        console.error("[ERROR] ", err);
    }
}

app.listen(4124, () => {
    console.log(`Server started on port 4124`);
})
 