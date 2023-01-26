import { Category, Categorytore } from '../../models/Category';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import { Order, OrderStore } from '../../models/Orders';

describe('verifing Order model methods exist', () => {
  const os = new OrderStore();
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

  it('should have a delete method', () => {
    expect(os.delete).toBeDefined();
  });
});
 describe('Order Model Tests', () => {
  const cs = new Categorytore();
  const us = new UserStore();
  const ps = new ProductStore();
  const os = new OrderStore();
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
  const p: Product = {
    Id: 0,
    Name: 'TV',
    Description: '55 inche smart tv',
    Price: 5000,
    CreateTime: new Date(),
    CreatedBy: 0,
    CategoryId: 0,
    Available_Items: 100,
  };
  const o:Order={
      Id: 0,
      Total: 10000,
      Status: 'active',
      CreateTime: new Date(),
      UserId: 0
  }
  it('Create Order function', async () => {
    const nu = await us.show(1);
    if (nu != undefined) {
      category.CreatedBy = nu.id;
      p.CreatedBy = nu.id;
      o.UserId=nu.id
      user.id=nu.id
    } else {
      const nu = await us.create(user);
      category.CreatedBy = nu.id;
      p.CreatedBy = nu.id;
      o.UserId=nu.id
      user.id=nu.id
    }
    const mycategory = await cs.show(1);
    if (mycategory != undefined) {
      p.CategoryId = mycategory.Id;
      category.Id = mycategory.Id;
    } else {
      const mycategory = await cs.Create(category);
      category.Id = mycategory.Id;
      p.CategoryId = mycategory.Id;
    }
    const np= await ps.show(1);
    if(np!= undefined){
        //now the product is available
        p.Id = np.Id;
    }
    else{
        const np = await ps.Create(p);
        p.Id = np.Id;
    }
    const no=await os.Create(o);
    o.Id=no.Id
    expect(no.Id).toBeGreaterThan(0);
  });
  it('Index', async () => {
    const ol = await os.index();
    expect(ol).toBeDefined();
  });
  it('View', async () => {
    const no =await os.show(o.Id);
    expect(no).toBeDefined();
  });
  it('Update', async () => {
  

    await os.checkout("checked",o.Id);
    const no = await os.show(o.Id);
    
    expect(( no as Order).Status).toEqual("checked");
  });
  it('Delete', async () => {
    await os.delete(o.Id);
    const np = await ps.show(p.Id);
    expect(np).toBeUndefined();
  });
});
