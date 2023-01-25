"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importStar(require("express"));
var Category_1 = require("../models/Category");
var Autherization_1 = __importDefault(require("../middleware/Autherization"));
var routes = express_1["default"].Router();
var store = new Category_1.Categorytore();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.index()];
            case 1:
                categories = _a.sent();
                res.json(categories);
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
function create(_req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var name, description, icon, c, nc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = _req.body.name;
                    description = _req.body.description;
                    icon = _req.body.icon;
                    c = {
                        Id: 0,
                        Name: name,
                        Description: description,
                        CreateTime: new Date(),
                        icon: icon,
                        CreatedBy: _req.currentUser.id
                    };
                    return [4 /*yield*/, store.Create(c)];
                case 1:
                    nc = _a.sent();
                    res.json(nc);
                    return [2 /*return*/];
            }
        });
    });
}
;
var update = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, name, description, date, icon, c, nc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = _req.body.id;
                name = _req.body.Name;
                description = _req.body.Description;
                date = _req.body.date;
                icon = _req.body.icon;
                c = {
                    Id: id,
                    Name: name,
                    Description: description,
                    CreateTime: new Date(Date.parse(date)),
                    icon: icon,
                    CreatedBy: 0
                };
                return [4 /*yield*/, store.Update(c)];
            case 1:
                nc = _a.sent();
                res.json(nc);
                return [2 /*return*/];
        }
    });
}); };
var CategoryRoutes = (0, express_1.Router)();
var Routes = function (app) {
    CategoryRoutes.route('/category').get(index);
    CategoryRoutes.route('/category/{:id}').get(show);
    CategoryRoutes.route('/category').put(update);
    CategoryRoutes.route('/category')["delete"](destroy);
    CategoryRoutes.route('/category').post(Autherization_1["default"], create);
    app.use(CategoryRoutes);
};
exports["default"] = Routes;
