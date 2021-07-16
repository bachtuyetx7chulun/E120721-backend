"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var api_controller_1 = require("../controllers/api.controller");
var router = express_1.Router();
router.get('/covid', api_controller_1.getAllDatas);
router.get('/crawl', api_controller_1.crawlPerDay);
router.get('/overview', api_controller_1.crawlDetails);
exports.default = router;
