import expressWs, { Application } from "express-ws";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { authenticationMiddleware } from "./middlewares/authenticationMiddleware";
import { getChat } from "./routes/getChat";
import { getLogin } from "./routes/getLogin";
import { getLogout } from "./routes/getLogout";
import { postLogin } from "./routes/postLogin";
import { deleteProfile } from "./routes/deleteProfile";
import { getProfile } from "./routes/getProfile";
import { postProfile } from "./routes/postProfile";
import { getRegister } from "./routes/getRegister";
import { postRegister } from "./routes/postRegister";
import { getRoot } from "./routes/getRoot";
import { getWs } from "./routes/getWs";

const SECRET_KEY = "MySecretKeyIsAwesome";

function main() {
  const app = express() as unknown as Application;
  expressWs(app);
  const sockets = new Map();

  app.use(cookieParser(SECRET_KEY));
  app.use(express.static(path.join(__dirname, "../public")));

  getLogin(app);
  postLogin(app);
  getRegister(app);
  postRegister(app);

  app.use(authenticationMiddleware);
  getProfile(app);
  postProfile(app);
  deleteProfile(app);
  getRoot(app);
  getLogout(app);
  getChat(app);
  getWs(app, sockets);

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(500).send("Internal Server Error");
    next();
  });

  app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
  });
}

main();