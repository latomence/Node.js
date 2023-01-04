import bodyParser from "body-parser";
import { Application } from "express-ws";
import { findUserByEmail } from "../repositories/userRepository";

export function postLogin(app: Application) {
    app.post(
        '/login',
        bodyParser.urlencoded(),
        async (req, res) => {
            const email = req.body.email
            const user = await findUserByEmail(email)
            if (!user) {
                res.status(401).send('Invalid email');
                return;
            }
            res.cookie('ssid', user.id, { signed: true, httpOnly: true });
            res.redirect('/')
        }
    )
}