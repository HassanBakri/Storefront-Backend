"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Orders_1 = require("../models/Orders");
const Autherization_1 = __importDefault(require("../middleware/Autherization"));
const store = new Orders_1.OrderStore();
const index = async (_req, res) => {
    const o = await store.index();
    res.json(o);
};
const show = async (_req, res) => {
    const o = await store.show(_req.params.id);
    res.json(o);
};
const destroy = async (_req, res) => {
    const deleted = await store.delete(_req.params.id);
    res.json(deleted);
};
const create = async (_req, res) => {
    // const Total = _req.body.total;
    // const Status = _req.body.status;
    // //const CreateTime = _req.body.createTime;
    // const UserId = _req.currentUser.id;
    const o = {
        Id: 0,
        Total: 0,
        Status: 'active',
        CreateTime: new Date(),
        UserId: _req.currentUser.id,
    };
    const no = await store.Create(o);
    res.json(no);
};
//   const update= async(_req: Request, res: Response) => {
//   };
//  async addProduct(quantity: number,userId:string, orderId: string, productId: string): Promise<Order> {
const addProduct = async (_req, res) => {
    const productId = _req.body.productId;
    const quantity = _req.body.quantity;
    const orderId = _req.body.orderId;
    const userId = _req.currentUser.id;
    const po = await store.addProduct(quantity, userId, orderId, productId);
    res.json(po);
};
//  async setProductCount (productId:number,count:number,orderId:number): Promise<void> {
const setProductCount = async (_req, res) => {
    const productId = _req.body.productId;
    const quantity = _req.body.quantity;
    const orderId = _req.body.orderId;
    //const userId=_req.body.userId;
    const po = await store.setProductCount(productId, quantity, orderId); //userId
    res.json(po);
};
const getProduct = async (_req, res) => {
    const orderId = parseInt(_req.params.id);
    //const userId=_req.body.userId;
    const po = await store.getProduct(orderId); //userId
    res.json(po);
};
//  async removeProduct (productId:number,orderId:number): Promise<void> {
const removeProduct = async (_req, res) => {
    const productId = parseInt(_req.body.productId);
    //const quantity=_req.body.quantity;
    const orderId = parseInt(_req.body.orderId);
    await store.removeProduct(productId, orderId);
    res.status(200);
};
//  async checkout (status:string,orderId:number): Promise<void> {
const checkout = async (_req, res) => {
    const orderId = _req.body.orderId;
    store.checkout('checkedout', orderId);
    res.status(200);
};
const OrderRoutes = (0, express_1.Router)();
const Routes = (app) => {
    OrderRoutes.route('/order').get(index);
    OrderRoutes.route('/order/:id').get(show);
    OrderRoutes.route('/order').post(Autherization_1.default, create);
    OrderRoutes.route('/order/:id').delete(Autherization_1.default, destroy);
    OrderRoutes.route('/order/addProduct').post(Autherization_1.default, addProduct);
    OrderRoutes.route('/order/:id/getProducts').get(Autherization_1.default, getProduct);
    OrderRoutes.route('/order/setProductCount').post(setProductCount);
    OrderRoutes.route('/order/removeProduct').post(Autherization_1.default, removeProduct);
    OrderRoutes.route('/order/checkout').post(Autherization_1.default, checkout);
    app.use(OrderRoutes);
};
exports.default = Routes;
