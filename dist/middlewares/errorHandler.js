"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendErrorDev = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            error: err,
        });
    }
    else {
        res.status(500).json({
            status: "error",
            message: "Something went wrong!",
            error: err,
        });
    }
};
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    sendErrorDev(err, res);
};
exports.default = globalErrorHandler;
//# sourceMappingURL=errorHandler.js.map