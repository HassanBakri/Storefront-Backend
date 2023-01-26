import supertest from 'supertest';
import { Category, Categorytore } from '../../models/Category';
import { User, UserStore } from '../../models/user';

describe('verifing Category model methods exist', () => {
  const cs = new Categorytore();
  it('should have an index method', () => {
    expect(cs.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(cs.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(cs.Create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(cs.Update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(cs.delete).toBeDefined();
  });
});
describe('Category Model Tests', () => {
  const cs = new Categorytore();
  const us = new UserStore();
  const user: User = {
    id: 0,
    FirstName: 'Hassan',
    LastName: 'Bakri',
    UserName: 'hassanbakri1',
    Password: '123456',
    Email: 'hassanbakry1@gmail.com',
    PhoneNumber: '0533201601',
  };
  const category: Category = {
    Id: 0,
    Name: 'Home appliances',
    Description: 'Home appliances',
    CreateTime: new Date(),
    icon: 'device',
    CreatedBy: 0,
  };
  it('Create Category function', async () => {
    const nu = await us.show(1);
    if (nu != undefined) {
      category.CreatedBy = nu.id;
    } else {
      const nu = await us.create(user);
      category.CreatedBy = nu.id;
    }
    const mycategory = await cs.Create(category);
    category.Id = mycategory.Id;
    expect(mycategory.Id).toBeGreaterThan(0);
  });
  it('Index', async () => {
    const u = cs.index();
    expect(u).toBeDefined();
  });
  it('View', async () => {
    const nc = cs.show(category.Id);
    expect(nc).toBeDefined();
  });
  it('Update', async () => {
    console.log('Befor test case', category.Id, category.Description, category.icon);
    category.Name = 'Sound Devices';

    const nc = await cs.Update(category);
    expect(nc.Name).toEqual(category.Name);
  });
  it('Delete', async () => {
    await cs.delete(category.Id);
    const nu = await cs.show(category.Id);
    expect(nu).toBeUndefined();
  });
});
