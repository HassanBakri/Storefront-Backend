"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hassanconfig_1 = __importDefault(require("../hassanconfig"));
const validateToken = (request, response, next) => {
    try {
        const authorization = request.headers.authorization;
        //console.log(authorization);
        if (authorization == null || authorization == undefined) {
            response.status(401).json({
                error: new Error('Invalid request!'),
            });
            return;
        }
        const token = authorization.split(' ')[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, hassanconfig_1.default.JWTSECRIT);
        console.log('verified token' + decodedToken);
        const dt = jsonwebtoken_1.default.decode(token);
        //const cu=(decodedToken as TokenInterface).user;
        // console.log('decoded token ', dt);
        request.currentUser = dt.User;
        next();
        //}
    }
    catch (err) {
        console.log(`Error in ${__filename} `);
        console.log('Eror happend\n' + err);
        response.status(401).json({
            error: new Error('Invalid request!'),
        });
    }
};
exports.default = validateToken;
