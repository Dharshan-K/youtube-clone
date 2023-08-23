"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadStream = exports.stream = exports.connectMongo = exports.gfs = void 0;
const mongoose = require("mongoose");
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const streamSchema_1 = require("./streamSchema");
const url = process.env.MONGOdb_URL;
const connectMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose.set("strictQuery", false);
        const mongoUrl = process.env.MONGOdb_URL || " ";
        const connection = yield mongoose.connect(mongoUrl);
        console.log(connection.connection.host);
        const mongoConn = mongoose.connection;
        exports.gfs = yield new mongoose.mongo.GridFSBucket(mongoConn.db, {
            bucketName: "stream",
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.connectMongo = connectMongo;
const streamStorage = new multer_gridfs_storage_1.GridFsStorage({
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
exports.stream = multer({ storage: streamStorage });
const uploadStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stream = yield streamSchema_1.streamSchema.create({
        streamName: req.body.name,
        streamID: req.body.id,
    });
    stream.save();
    res.status(200).send("stream stored");
});
exports.uploadStream = uploadStream;
