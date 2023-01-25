"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
var Orders_1 = require("../models/Orders");
var store = new Orders_1.OrderStore();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.index()];
            case 1:
                Users = _a.sent();
                res.json(Users);
                return [2 /*return*/];
        }
    });
}); };
var show = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var User;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.show(_req.body.id)];
            case 1:
                User = _a.sent();
                res.json(User);
                return [2 /*return*/];
        }
    });
}); };
var destroy = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store["delete"](_req.body.id)];
            case 1:
                deleted = _a.sent();
                res.json(deleted);
                return [2 /*return*/];
        }
    });
}); };
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, Total, Status, o, no;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = _req.body.id;
                Total = _req.body.total;
                Status = _req.body.status;
                o = {
                    Id: Id,
                    Total: Total,
                    Status: Status,
                    CreateTime: new Date(),
                    UserId: 0
                };
                return [4 /*yield*/, store.Create(o)];
            case 1:
                no = _a.sent();
                res.json(no);
                return [2 /*return*/];
        }
    });
}); };
//   const update= async(_req: Request, res: Response) => {
//   };
//  async addProduct(quantity: number,userId:string, orderId: string, productId: string): Promise<Order> {
var addProduct = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, quantity, orderId, userId, po;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = _req.body.productId;
                quantity = _req.body.quantity;
                orderId = _req.body.orderId;
                userId = _req.body.userId;
                return [4 /*yield*/, store.addProduct(quantity, userId, orderId, productId)];
            case 1:
                po = _a.sent();
                res.json(po);
                return [2 /*return*/];
        }
    });
}); };
//  async setProductCount (productId:number,count:number,orderId:number): Promise<void> {
var setProductCount = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, quantity, orderId, po;
    return __generator(this, function (_a) {
        productId = _req.body.productId;
        quantity = _req.body.quantity;
        orderId = _req.body.orderId;
        po = store.setProductCount(productId, quantity, orderId);
        res.json(po);
        return [2 /*return*/];
    });
}); };
//  async removeProduct (productId:number,orderId:number): Promise<void> {
var removeProduct = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, orderId;
    return __generator(this, function (_a) {
        productId = _req.body.productId;
        orderId = _req.body.orderId;
        store.removeProduct(productId, orderId);
        res.status(200);
        return [2 /*return*/];
    });
}); };
//  async checkout (status:string,orderId:number): Promise<void> {
var checkout = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId;
    return __generator(this, function (_a) {
        orderId = _req.body.orderId;
        store.checkout('checkedout', orderId);
        res.status(200);
        return [2 /*return*/];
    });
}); };
var Routes = function (app) {
    app.get('/order', index);
    app.get('/order/{:id}', show);
    app.post('/order', create);
    app["delete"]('/order', destroy);
    app.post('/order/addProduct', addProduct);
    app.post('/order/setProductCount', setProductCount);
    app.post('/order/removeProduct', removeProduct);
    app.post('/order/checkout', checkout);
};
exports["default"] = Routes;
