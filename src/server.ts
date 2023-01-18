import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import port from './hassanconfig'

const app: express.Application = express();
const address: string = `0.0.0.0:${port.port}`;

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
