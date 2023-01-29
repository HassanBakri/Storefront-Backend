"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
describe('verifing User model methods exist', () => {
    const us = new user_1.UserStore();
    it('should have an index method', () => {
        expect(us.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(us.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(us.create).toBeDefined();
    });
    it('should have a update method', () => {
        expect(us.Update).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(us.delete).toBeDefined();
    });
    it('should have a authenticate method', () => {
        expect(us.authenticate).toBeDefined();
    });
    it('should have a setPassword method', () => {
        expect(us.setPassword).toBeDefined();
    });
});
describe('User Model Tests', () => {
    const us = new user_1.UserStore();
    const user = {
        id: 0,
        FirstName: 'Hassan',
        LastName: 'Bakri',
        UserName: 'hassanbakri',
        Password: '123456',
        Email: 'hassanbakry@gmail.com',
        PhoneNumber: '0533201601',
    };
    it('Create User function', async () => {
        const myuser = await us.create(user);
        user.id = myuser.id;
        expect(myuser.id).toBeGreaterThan(0);
    });
    it('Index', async () => {
        const u = us.index();
        expect(u).toBeDefined();
    });
    it('View', async () => {
        const nu = us.show(user.id);
        expect(nu).toBeDefined();
    });
    it('Update', async () => {
        console.log('Befor test case', user.id, user.FirstName, user.LastName, user.UserName, user.Email, user.PhoneNumber);
        user.FirstName = 'ali';
        const nu = await us.Update(user);
        expect(nu.FirstName).toEqual(user.FirstName);
    });
    it('Authenticate', async () => {
        const u = await us.authenticate(user.UserName, '123456');
        expect(u).toBeDefined();
    });
    it('Authenticate with false password', async () => {
        const u = await us.authenticate(user.UserName, '1234567');
        expect(u).toBeNull();
    });
    it('Set Password', async () => {
        await us.setPassword(user.id, '1234567');
        const u = await us.authenticate(user.UserName, '1234567');
        expect(u).toBeDefined();
    });
    it('Delete', async () => {
        await us.delete(user.id + '');
        const nu = await us.show(user.id);
        expect(nu).toBeUndefined();
    });
});
