import path from "path";
import { Application } from "express-ws";
import { findUserById } from "../repositories/userRepository";

export function getLogin(app: Application) {
    app.get('/login', (req, res) => {
        const ssid = parseInt(req.cookies.ssid ?? '', 10)
        if (ssid && findUserById(req.signedCookies.ssid)) {
            res.redirect('/')
            return
        }

        res.sendFile(path.join(__dirname, '../../pages/login.html'))
    })
}