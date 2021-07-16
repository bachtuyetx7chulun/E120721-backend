"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var api_controller_1 = require("../controllers/api.controller");
var router = express_1.Router();
router.get('/covid', api_controller_1.getAllDatas);
router.get('/crawl', api_controller_1.crawlPerDays);
router.get('/overview', api_controller_1.crawlDetails);
router.get('/', function (req, res, next) {
    res.send('hello');
});
exports.default = router;
