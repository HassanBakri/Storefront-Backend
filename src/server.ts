import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import port from './hassanconfig';
import UserRoutes from './handlers/user'  ;
import CategoryRoutes from './handlers/category';
import ProductRoutes from './handlers/product'  ;
import OrderRoutes from './handlers/order'

const app: express.Application = express();
const address: string = `0.0.0.0:${port.port}`;

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});
UserRoutes(app)
CategoryRoutes(app)
ProductRoutes(app)
OrderRoutes(app)
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
