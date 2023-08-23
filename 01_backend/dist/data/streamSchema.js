"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamSchema = exports.stream = void 0;
const mongoose_1 = require("mongoose");
exports.stream = new mongoose_1.default.Schema({
    streamName: {
        required: true,
        type: String
    },
    streamID: {
        required: true,
        type: String
    },
    createdAt: {
        required: true,
        default: Date.now(),
        type: Date
    }
});
exports.streamSchema = mongoose_1.default.model('stream', exports.stream);
