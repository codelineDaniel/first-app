import * as express from 'express';
import 'express-async-errors';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as methodOverride from 'method-override';
import { userRouter } from './routers/user';
import { handleError } from './utils/error';
import './utils/db';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride("_method"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/user", userRouter);

app.use(handleError);

app.listen(3001, "localhost", () => {
  console.log("Listening on http://localhost:3001");
});
