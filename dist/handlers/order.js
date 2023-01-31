"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Orders_1 = require("../models/Orders");
const Autherization_1 = __importDefault(require("../middleware/Autherization"));
const hassanconfig_1 = __importDefault(require("../hassanconfig"));
const store = new Orders_1.OrderStore();
const index = async (_req, res) => {
    const o = await store.index().catch((err) => {
        console.log(`Error in ${__filename} in ${index.name} Endpoint`);
        console.log(err.message);
        res.status(500);
        if (hassanconfig_1.default.ENV?.trim() === 'dev' || hassanconfig_1.default.ENV?.trim() === 'test') {
            res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
            return;
        }
        else {
            res.json({ status: 'faild' });
            return;
        }
    });
    res.json(o);
};
const show = async (_req, res) => {
    if (!parseInt(_req.params.id)) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    const o = await store.show(parseInt(_req.params.id)).catch((err) => {
        console.log(`Error in ${__filename} in ${show.name} Endpoint`);
        console.log(err.message);
        res.status(500);
        if (hassanconfig_1.default.ENV?.trim() === 'dev' || hassanconfig_1.default.ENV?.trim() === 'test') {
            res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
            return;
        }
        else {
            res.json({ status: 'faild' });
            return;
        }
    });
    res.json(o);
};
const destroy = async (_req, res) => {
    if (!parseInt(_req.params.id)) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    const deleted = await store.delete(parseInt(_req.params.id)).catch((err) => {
        console.log(`Error in ${__filename} in ${destroy.name} Endpoint`);
        console.log(err.message);
        res.status(500);
        if (hassanconfig_1.default.ENV?.trim() === 'dev' || hassanconfig_1.default.ENV?.trim() === 'test') {
            res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
            return;
        }
        else {
            res.json({ status: 'faild' });
            return;
        }
    });
    res.json(deleted);
};
const create = async (_req, res) => {
    const o = {
        Id: 0,
        Total: 0,
        Status: 'active',
        CreateTime: new Date(),
        UserId: _req.currentUser.id,
    };
    const no = await store.Create(o).catch((err) => {
        console.log(`Error in ${__filename} in ${create.name} Endpoint`);
        console.log(err.message);
        res.status(500);
        if (hassanconfig_1.default.ENV?.trim() === 'dev' || hassanconfig_1.default.ENV?.trim() === 'test') {
            res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
            return;
        }
        else {
            res.json({ status: 'faild' });
            return;
        }
    });
    res.json(no);
};
const addProduct = async (_req, res) => {
    const productId = _req.body.productId;
    const quantity = _req.body.quantity;
    const orderId = _req.body.orderId;
    const userId = _req.currentUser.id;
    if (!_req.body.productId || !_req.body.quantity || !_req.body.orderId || isNaN(orderId) || isNaN(quantity) || isNaN(orderId)) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    const po = await store.addProduct(quantity, userId, orderId, productId).catch((err) => {
        console.log(`Error in ${__filename} in ${addProduct.name} Endpoint`);
        console.log(err.message);
        res.status(500);
        if (hassanconfig_1.default.ENV?.trim() === 'dev' || hassanconfig_1.default.ENV?.trim() === 'test') {
            res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
            return;
        }
        else {
            res.json({ status: 'faild' });
            return;
        }
    });
    res.json(po);
};
//  async setProductCount (productId:number,count:number,orderId:number): Promise<void> {
const setProductCount = async (_req, res) => {
    const productId = _req.body.productId;
    const quantity = _req.body.quantity;
    const orderId = _req.body.orderId;
    if (!_req.body.productId || !_req.body.quantity || !_req.body.orderId || isNaN(productId) || isNaN(quantity) || isNaN(orderId)) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    const po = await store.setProductCount(productId, quantity, orderId).catch((err) => {
        console.log(`Error in ${__filename} in ${setProductCount.name} Endpoint`);
        console.log(err.message);
        res.status(500);
        if (hassanconfig_1.default.ENV?.trim() === 'dev' || hassanconfig_1.default.ENV?.trim() === 'test') {
            res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
            return;
        }
        else {
            res.json({ status: 'faild' });
            return;
        }
    }); //userId
    res.json(po);
};
const getProduct = async (_req, res) => {
    if (!parseInt(_req.params.id) || isNaN(parseInt(_req.params.id))) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    const orderId = parseInt(_req.params.id);
    const po = await store.getProduct(orderId).catch((err) => {
        console.log(`Error in ${__filename} in ${getProduct.name} Endpoint`);
        console.log(err.message);
        res.status(500);
        if (hassanconfig_1.default.ENV?.trim() === 'dev' || hassanconfig_1.default.ENV?.trim() === 'test') {
            res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
            return;
        }
        else {
            res.json({ status: 'faild' });
            return;
        }
    });
    res.json(po);
};
//  async removeProduct (productId:number,orderId:number): Promise<void> {
const removeProduct = async (_req, res) => {
    const productId = parseInt(_req.body.productId);
    //const quantity=_req.body.quantity;
    const orderId = parseInt(_req.body.orderId);
    if (!_req.body.productId || !_req.body.orderId || isNaN(_req.body.productId) || isNaN(_req.body.orderId)) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    await store.removeProduct(productId, orderId).catch((err) => {
        console.log(`Error in ${__filename} in ${removeProduct.name} Endpoint`);
        console.log(err.message);
        res.status(500);
        if (hassanconfig_1.default.ENV?.trim() === 'dev' || hassanconfig_1.default.ENV?.trim() === 'test') {
            res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
            return;
        }
        else {
            res.json({ status: 'faild' });
            return;
        }
    });
    res.status(200);
};
//  async checkout (status:string,orderId:number): Promise<void> {
const checkout = async (_req, res) => {
    console.log('checkout called');
    const orderId = parseInt(_req.body.orderId);
    if (!orderId || isNaN(orderId)) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    console.log('passed validation');
    await store.checkout('checkedout', orderId).catch((err) => {
        console.log(`Error in ${__filename} in ${checkout.name} Endpoint`);
        console.log(err.message);
        res.status(500);
        if (hassanconfig_1.default.ENV?.trim() === 'dev' || hassanconfig_1.default.ENV?.trim() === 'test') {
            res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
            return;
        }
        else {
            res.json({ status: 'faild' });
            return;
        }
    });
    console.log('exiting checkout');
    res.status(200);
    res.json({});
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
