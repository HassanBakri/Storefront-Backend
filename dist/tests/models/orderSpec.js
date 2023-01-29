"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../../models/Category");
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const Orders_1 = require("../../models/Orders");
describe('verifing Order model methods exist', () => {
    const os = new Orders_1.OrderStore();
    it('should have an index method', () => {
        expect(os.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(os.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(os.Create).toBeDefined();
    });
    it('should have a update method', () => {
        //the only reason to update order is to check out
        expect(os.checkout).toBeDefined();
    });
    it('should have a addProduct method', () => {
        expect(os.addProduct).toBeDefined();
    });
    it('should have a getProduct method', () => {
        expect(os.getProduct).toBeDefined();
    });
    it('should have a setProductCount method', () => {
        expect(os.setProductCount).toBeDefined();
    });
    it('should have a removeProduct method', () => {
        expect(os.removeProduct).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(os.delete).toBeDefined();
    });
});
fdescribe('Order Model Tests', () => {
    const cs = new Category_1.Categorytore();
    const us = new user_1.UserStore();
    const ps = new product_1.ProductStore();
    const os = new Orders_1.OrderStore();
    const user = {
        id: 0,
        FirstName: 'Hassan',
        LastName: 'Bakri',
        UserName: 'hassanbakri1',
        Password: '123456',
        Email: 'hassanbakry1@gmail.com',
        PhoneNumber: '0533201601',
    };
    const category = {
        Id: 0,
        Name: 'Home appliances',
        Description: 'Home appliances',
        CreateTime: new Date(),
        icon: 'device',
        CreatedBy: 0,
    };
    const p = {
        Id: 0,
        Name: 'TV',
        Description: '55 inche smart tv',
        Price: 5000,
        CreateTime: new Date(),
        CreatedBy: 0,
        CategoryId: 0,
        Available_Items: 100,
    };
    const o = {
        Id: 0,
        Total: 10000,
        Status: 'active',
        CreateTime: new Date(),
        UserId: 0,
    };
    const op = {
        Id: 0,
        Count: 1,
        CreateTime: new Date(),
        UserId: user.id,
        OrderId: o.Id,
        ProductId: p.Id,
    };
    it('Create Order function', async () => {
        const nu = await us.show(1);
        if (nu != undefined) {
            category.CreatedBy = nu.id;
            p.CreatedBy = nu.id;
            o.UserId = nu.id;
            user.id = nu.id;
            op.UserId = nu.id;
        }
        else {
            const nu = await us.create(user);
            category.CreatedBy = nu.id;
            p.CreatedBy = nu.id;
            o.UserId = nu.id;
            user.id = nu.id;
            op.UserId = nu.id;
        }
        const mycategory = await cs.show(1);
        if (mycategory != undefined) {
            p.CategoryId = mycategory.Id;
            category.Id = mycategory.Id;
        }
        else {
            const mycategory = await cs.Create(category);
            category.Id = mycategory.Id;
            p.CategoryId = mycategory.Id;
        }
        const np = await ps.show(1);
        if (np != undefined) {
            //now the product is available
            p.Id = np.Id;
            op.ProductId = np.Id;
        }
        else {
            const np = await ps.Create(p);
            p.Id = np.Id;
            op.ProductId = np.Id;
        }
        const no = await os.Create(o);
        o.Id = no.Id;
        op.OrderId = no.Id;
        expect(no.Id).toBeGreaterThan(0);
    });
    it('Index', async () => {
        const ol = await os.index();
        expect(ol.length).toEqual(1);
    });
    it('View', async () => {
        const no = await os.show(o.Id);
        expect(no).toBeDefined();
    });
    it('Update', async () => {
        await os.checkout('checked', o.Id);
        const no = await os.show(o.Id);
        expect(no.Status).toEqual('checked');
    });
    it('Add Order to Product', async () => {
        const nop = await os.addProduct(op.Count, op.UserId, op.OrderId, op.ProductId);
        op.Id = nop.Id;
        expect(nop).toBeDefined();
    });
    it('Delete', async () => {
        await os.delete(o.Id);
        const np = await os.show(p.Id);
        expect(np).toBeUndefined();
    });
});
