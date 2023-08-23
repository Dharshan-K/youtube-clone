"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketServer = void 0;
const Express = require("express");
const connectDB_1 = require("./data/connectDB");
const ws = require("ws");
const cors = require("cors");
const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
(0, connectDB_1.connectMongo)();
const server = app.listen(4000, () => {
    console.log("running on port 5000");
});
exports.socketServer = new ws.Server({ server });
exports.socketServer.on('connection', (ws) => {
    console.log("receiving data");
    ws.on('message', (message) => {
        console.log(message);
    });
});
