import * as mongoose from "mongoose";
import * as Express from "express";
import { GridFsStorage } from "multer-gridfs-storage";
import * as crypto from "crypto";
import * as path from "path";
import * as multer from "multer";
require("dotenv").config();
import { streamSchema } from "./streamSchema";

export let gfs: mongoose.mongo.GridFSBucket;
const url = process.env.MONGOdb_URL as string;

export const connectMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    const mongoUrl = process.env.MONGOdb_URL || " ";
    const connection = await mongoose.connect(mongoUrl);
    console.log(connection.connection.host)
    const mongoConn = mongoose.connection;
    gfs = await new mongoose.mongo.GridFSBucket(mongoConn.db, {
      bucketName: "stream",
    });
  } catch (error) {
    console.log(error);
  }
};

const streamStorage = new GridFsStorage({
  url,
  file: (req, file) => {
    console.log("getting the storage");
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "stream",
        };
        resolve(fileInfo);
      });
    });
  },
});

export const stream = multer({ storage: streamStorage });

export const uploadStream = async (req: Express.Request, res: Express.Response) => {
  const stream = await streamSchema.create({
    streamName: req.body.name,
    streamID: req.body.id,
  });
  stream.save();
  res.status(200).send("stream stored")
};
