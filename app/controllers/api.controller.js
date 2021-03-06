"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../configs/db"));
var parse_util_1 = require("../utils/parse.util");
var crawl_util_1 = require("../utils/crawl.util");
exports.getAllDatas = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.ref('covids/days').once('value')];
            case 1: return [4 /*yield*/, (_a.sent()).val()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, res.json(data)];
        }
    });
}); };
exports.crawlPerDays = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var dimension, currentCovidData, latestRecordCovid, updateData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, crawl_util_1.getAsyncCovidData('https://ncov.moh.gov.vn/web/guest/dong-thoi-gian')];
            case 1:
                dimension = _a.sent();
                currentCovidData = parse_util_1.parseArray(dimension);
                return [4 /*yield*/, db_1.default
                        .ref('covids/days/' + parse_util_1.parseCurrentTime())
                        .once('value')];
            case 2: return [4 /*yield*/, (_a.sent()).val()];
            case 3:
                latestRecordCovid = _a.sent();
                if (!!latestRecordCovid) return [3 /*break*/, 6];
                if (!(parse_util_1.parseCurrentTime() == currentCovidData.time.date)) return [3 /*break*/, 5];
                return [4 /*yield*/, db_1.default
                        .ref('covids/days/' + currentCovidData.time.date)
                        .set({
                        details: [__assign({}, currentCovidData)],
                        total: parseInt(currentCovidData.data.total),
                        latestUpdate: currentCovidData.time.text,
                    })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                // ? Update count
                if (currentCovidData.time.text !== latestRecordCovid.latestUpdate) {
                    updateData = {
                        total: latestRecordCovid.total + currentCovidData.data.total,
                        latestUpdate: currentCovidData.time.text,
                        details: __spreadArrays(latestRecordCovid.details, [currentCovidData]),
                    };
                    db_1.default
                        .ref('covids/days/' + currentCovidData.time.date)
                        .set(updateData, function (error) {
                        if (error) {
                            throw error;
                        }
                    });
                }
                _a.label = 7;
            case 7: return [2 /*return*/, res.json({
                    time: new Date(),
                    status: 'called',
                })];
            case 8:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.crawlDetails = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var url, dimension, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                url = 'https://ncov.moh.gov.vn/web/guest/trang-chu';
                return [4 /*yield*/, crawl_util_1.getAsyncCovidDetail(url)];
            case 1:
                dimension = _a.sent();
                // TODO: Overide all records in the firebase database realtime
                return [4 /*yield*/, db_1.default
                        .ref('covids/overviews/' + parse_util_1.parseCurrentTime())
                        .set(dimension)];
            case 2:
                // TODO: Overide all records in the firebase database realtime
                _a.sent();
                return [2 /*return*/, res.json({
                        time: new Date(),
                        status: 'called',
                    })];
            case 3:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
