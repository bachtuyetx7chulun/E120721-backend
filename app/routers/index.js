"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
// router.get('/covid', getAllDatas);
// router.get('/crawl', crawlPerDays);
// router.get('/overview', crawlDetails);
router.get('/', function (req, res, next) {
    res.send('hello');
});
exports.default = router;
