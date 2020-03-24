"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpStatus;
(function (httpStatus) {
    httpStatus[httpStatus["ok"] = 200] = "ok";
    httpStatus[httpStatus["created"] = 201] = "created";
    httpStatus[httpStatus["badRequest"] = 400] = "badRequest";
    httpStatus[httpStatus["unauthorized"] = 401] = "unauthorized";
    httpStatus[httpStatus["notFound"] = 404] = "notFound";
})(httpStatus = exports.httpStatus || (exports.httpStatus = {}));
