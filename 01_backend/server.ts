import * as Express from "express";
import {connectMongo} from "./data/connectDB"
const ws = require("ws")
const cors = require("cors")
const app = Express();


app.use(cors())
app.use(Express.json())
app.use(Express.urlencoded({extended:false}))
connectMongo()
const server = app.listen(4000, ()=>{
    console.log("running on port 5000")
})

export const socketServer = new ws.Server({server})

socketServer.on('connection',(ws:any)=>{
    console.log("receiving data")

    ws.on('message',(message:any)=>{
        console.log(message)
    })
})

