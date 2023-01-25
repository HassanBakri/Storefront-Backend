"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var hassanconfig_1 = __importDefault(require("../hassanconfig"));
var validateToken = function (request, response, next) {
    try {
        var authorization = request.headers.authorization;
        console.log(authorization);
        if (authorization == null || authorization == undefined) {
            response.status(401).json({
                error: new Error('Invalid request!')
            });
            return;
        }
        var token = authorization.split(' ')[1];
        var decodedToken = jsonwebtoken_1["default"].verify(token, hassanconfig_1["default"].JWTSECRIT);
        console.log("verified token" + decodedToken);
        var dt = jsonwebtoken_1["default"].decode(token);
        //const cu=(decodedToken as TokenInterface).user;
        console.log("decoded token ", dt);
        request.currentUser = dt.User;
        //request.currentUser=
        //const userId = decodedToken.userId;
        //if (req.body.userId && req.body.userId !== decodedToken. userId) {
        //throw 'Invalid user ID';
        //} else {
        next();
        //}
    }
    catch (_a) {
        console.log("Eror happend");
        response.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};
exports["default"] = validateToken;
