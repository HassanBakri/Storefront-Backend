"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Orders_1 = require("../models/Orders");
const store = new Orders_1.OrderStore();
const index = async (_req, res) => {
    const Users = await store.index();
    res.json(Users);
};
const show = async (_req, res) => {
    const User = await store.show(_req.body.id);
    res.json(User);
};
const destroy = async (_req, res) => {
    const deleted = await store.delete(_req.body.id);
    res.json(deleted);
};
const create = async (_req, res) => {
    const Id = _req.body.id;
    const Total = _req.body.total;
    const Status = _req.body.status;
    //const CreateTime = _req.body.createTime;
    //const UserId = _req.body.userId;
    const o = {
        Id: Id,
        Total: Total,
        Status: Status,
        CreateTime: new Date(),
        UserId: 0,
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
    const userId = _req.body.userId;
    const po = await store.addProduct(quantity, userId, orderId, productId);
    res.json(po);
};
//  async setProductCount (productId:number,count:number,orderId:number): Promise<void> {
const setProductCount = async (_req, res) => {
    const productId = _req.body.productId;
    const quantity = _req.body.quantity;
    const orderId = _req.body.orderId;
    //const userId=_req.body.userId;
    const po = store.setProductCount(productId, quantity, orderId); //userId
    res.json(po);
};
//  async removeProduct (productId:number,orderId:number): Promise<void> {
const removeProduct = async (_req, res) => {
    const productId = _req.body.productId;
    //const quantity=_req.body.quantity;
    const orderId = _req.body.orderId;
    store.removeProduct(productId, orderId);
    res.status(200);
};
//  async checkout (status:string,orderId:number): Promise<void> {
const checkout = async (_req, res) => {
    const orderId = _req.body.orderId;
    store.checkout('checkedout', orderId);
    res.status(200);
};
const Routes = (app) => {
    app.get('/order', index);
    app.get('/order/{:id}', show);
    app.post('/order', create);
    app.delete('/order', destroy);
    app.post('/order/addProduct', addProduct);
    app.post('/order/setProductCount', setProductCount);
    app.post('/order/removeProduct', removeProduct);
    app.post('/order/checkout', checkout);
};
exports.default = Routes;
