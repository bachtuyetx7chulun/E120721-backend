"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GetError = function (req, res, next) {
    var error = new Error('Not found');
    error.status = 404;
    next(error);
};
exports.GetError = GetError;
var HandleError = function (err, req, res, next) {
    var httpCode = err.status || 500;
    return res.status(httpCode).json({
        error: {
            status: httpCode,
            message: err.message || 'Internal Server Error',
        },
    });
};
exports.HandleError = HandleError;
