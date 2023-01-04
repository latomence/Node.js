import expressWs, { Application } from "express-ws";
import express from "express";
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import { getLogin } from "./routes/getLogin";
import { getRoot } from "./routes/getRoot";
import { getWs } from "./routes/getWs";
import { postLogin } from "./routes/postLogin";
import { authenticationMiddleware } from "./middlewares/authenticationMiddleware";
import { getRegister } from "./routes/getRegister";


const SECRET_KEY = 'Oui';

function main() {
  const app = express() as unknown as Application;
  expressWs(app);
  const sockets = new Map();

  app.use(cookieParser(SECRET_KEY))
  app.use(express.static(path.join(__dirname, '../public')));

  getLogin(app)
  postLogin(app)
  getRegister(app)

  app.use(authenticationMiddleware)
  getRoot(app)
  getWs(app, sockets)

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
}

main()
