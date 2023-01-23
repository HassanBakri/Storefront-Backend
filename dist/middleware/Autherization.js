"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hassanconfig_1 = __importDefault(require("../hassanconfig"));
exports = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization == null || authorization == undefined) {
            res.status(401).json({
                error: new Error('Invalid request!'),
            });
        }
        const token = authorization.split(' ')[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, hassanconfig_1.default.JWTSECRIT);
        console.log(decodedToken);
        //const userId = decodedToken.userId;
        //if (req.body.userId && req.body.userId !== decodedToken. userId) {
        //throw 'Invalid user ID';
        //} else {
        next();
        //}
    }
    catch {
        res.status(401).json({
            error: new Error('Invalid request!'),
        });
    }
};
