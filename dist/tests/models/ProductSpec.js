"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../../models/Category");
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
describe('verifing Category model methods exist', () => {
    const ps = new product_1.ProductStore();
    it('should have an index method', () => {
        expect(ps.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(ps.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(ps.Create).toBeDefined();
    });
    it('should have a update method', () => {
        expect(ps.Update).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(ps.delete).toBeDefined();
    });
});
describe('Product Model Tests', () => {
    const cs = new Category_1.Categorytore();
    const us = new user_1.UserStore();
    const ps = new product_1.ProductStore();
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
    it('Create Product function', async () => {
        const nu = await us.show(1);
        if (nu != undefined) {
            category.CreatedBy = nu.id;
            p.CreatedBy = nu.id;
        }
        else {
            const nu = await us.create(user);
            category.CreatedBy = nu.id;
            p.CreatedBy = nu.id;
        }
        const mycategory = await cs.show(1);
        if (mycategory != undefined) {
            p.CategoryId = mycategory.Id;
        }
        else {
            const mycategory = await cs.Create(category);
            category.Id = mycategory.Id;
            p.CategoryId = mycategory.Id;
        }
        const np = await ps.Create(p);
        p.Id = np.Id;
        expect(np.Id).toBeGreaterThan(0);
    });
    it('Index', async () => {
        const pl = ps.index();
        expect(pl).toBeDefined();
    });
    it('View', async () => {
        const np = ps.show(p.Id);
        expect(np).toBeDefined();
    });
    it('Update', async () => {
        console.log('Befor test case', p.Id, p.Name, p.Description, p.Available_Items, p.CategoryId, p.Price, p.CreatedBy);
        p.Name = 'Galaxy Ultra 23';
        const np = await ps.Update(p);
        expect(np.Name).toEqual(p.Name);
    });
    it('Delete', async () => {
        await ps.delete(p.Id);
        const np = await ps.show(p.Id);
        expect(np).toBeUndefined();
    });
});