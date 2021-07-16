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
Object.defineProperty(exports, "__esModule", { value: true });
var parseTime = function (time) {
    return {
        text: time,
        date: time.split(' ')[1].split('/')[2] +
            time.split(' ')[1].split('/')[1] +
            time.split(' ')[1].split('/')[0],
        timeInSeconds: parseInt(time.split(' ')[0].split(':')[0]) * 3600 +
            parseInt(time.split(' ')[0].split(':')[1]) * 60,
    };
};
exports.parseCurrentTime = function () {
    var currentTime = new Date();
    var currentDateToString = currentTime.toLocaleString().split(',')[0];
    var result = currentDateToString.split('/')[2] +
        ('0' + currentDateToString.split('/')[0]).slice(-2) +
        currentDateToString.split('/')[1];
    return result;
};
var parseData = function (content) {
    var total = content.match(/\d+\.\d+|\d+/); // prettier-ignore
    var count = parseInt(total[0]) == parseFloat(total[0])
        ? parseInt(total[0])
        : parseFloat(total[0]) * 1000;
    return {
        total: count,
        content: content,
    };
};
exports.parseArray = function (data) {
    return __assign(__assign({}, data), { time: parseTime(data.time), data: parseData(data.data) });
};
