"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var hassanconfig_1 = __importDefault(require("./hassanconfig"));
var user_1 = __importDefault(require("./handlers/user"));
var category_1 = __importDefault(require("./handlers/category"));
var product_1 = __importDefault(require("./handlers/product"));
var order_1 = __importDefault(require("./handlers/order"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:".concat(hassanconfig_1["default"].port);
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, user_1["default"])(app);
(0, category_1["default"])(app);
(0, product_1["default"])(app);
(0, order_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
