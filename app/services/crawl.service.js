"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_schedule_1 = __importDefault(require("node-schedule"));
var axios_1 = __importDefault(require("axios"));
// TODO: Crawl website per 30 minutes and save to realtime-db
var jobs = node_schedule_1.default.scheduleJob('00 */10 * * * *', function () {
    axios_1.default.get('https://e120721.herokuapp.com/api/v1/crawl');
});
