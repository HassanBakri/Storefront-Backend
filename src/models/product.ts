import Client from '../database';

export type Product = {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  CreateTime: Date;
  CreatedBy: number;
  CategoryId: number;
  Available_Items: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM Product';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Product. Error: ${err}`);
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM Product WHERE id=$1';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();
      //   const p:Product={
      //     Id: result.rows[0].,
      //     Name: result.rows[0],
      //     Description: result.rows[0],
      //     Price: result.rows[0],
      //     CreateTime: result.rows[0],
      //     CreatedBy: result.rows[0],
      //     CategoryId: result.rows[0],
      //     Available_Items: result.rows[0]
      // }
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Product ${id}. Error: ${err}`);
    }
  }
  async delete(id: number): Promise<Product> {
    try {
      const sql = 'DELETE FROM Product WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not delete Product ${id}. Error: ${err}`);
    }
  }
  async Create(p: Product): Promise<Product> {
    try {
      console.log('before inserting product :', p.Name, p.Description, p.Price, p.Available_Items, p.CreatedBy, p.CategoryId);
      const sql = 'insert into Product (Name, Description,Price,Available_Items,CreatedBy,CategoryId) values ($1,$2,$3,$4,$5,$6)   RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [p.Name, p.Description, p.Price, p.Available_Items, p.CreatedBy, p.CategoryId]);
      p = result.rows[0];
      console.log('Result value', result.rows[0]);
      console.log('P value', p.Name, p.Description, p.Price, p.Available_Items, p.CreatedBy, p.CategoryId);
      conn.release();
      p.Id = result.rows[0].id;
      p.Name = result.rows[0].name;
      p.Description = result.rows[0].description;
      p.Price = result.rows[0].price;
      p.Available_Items = result.rows[0].available_items;
      p.CreatedBy = result.rows[0].createdby;
      p.CategoryId = result.rows[0].categoryid;
      return p;
    } catch (error) {
      throw new Error(`Could not add new Product ${p.Name}. Error: ${error}`);
    }
  }
  async Update(p: Product): Promise<Product> {
    try {
      const sql = 'Update Product set Name=$1 , Description = $2 ,Price = $3, Available_Items = $4 ,CreatedBy = $5,CategoryId=$6 where Id=$7   RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [p.Name, p.Description, p.Price, p.Available_Items, p.CreatedBy, p.CategoryId, p.Id]);
      //p = result.rows[0];
      console.log('after updating product', result.rows[0]);
      p.Id = result.rows[0].id;
      p.Name = result.rows[0].name;
      p.Description = result.rows[0].description;
      p.Price = result.rows[0].price;
      p.Available_Items = result.rows[0].available_items;
      p.CreatedBy = result.rows[0].createdby;
      p.CategoryId = result.rows[0].categoryid;
      conn.release();
      return p;
    } catch (error) {
      throw new Error(`Could not Update Product ${p.Name}. Error: ${error}`);
    }
  }
}
