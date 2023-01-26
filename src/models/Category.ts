import Client from '../database';

export type Category = {
  Id: number;
  Name: string;
  Description: string;
  CreateTime: Date;
  icon: string;
  CreatedBy: number;
};

export class Categorytore {
  async index(): Promise<Category[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM Category';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Category. Error: ${err}`);
    }
  }
  async show(id: number): Promise<Category | undefined> {
    try {
      const sql = 'SELECT * FROM Category WHERE id=$1';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();
      console.log('show Result :', result.rows[0]);
      if (result.rows[0] == undefined) return undefined;
      const c: Category = {
        Id: result.rows[0].id,
        Name: result.rows[0].name,
        Description: result.rows[0].description,
        CreateTime: result.rows[0].CreateTime,
        icon: result.rows[0].icon,
        CreatedBy: result.rows[0].CreatedBy,
      };
      return c;
    } catch (err) {
      throw new Error(`Could not find Category ${id}. Error: ${err}`);
    }
  }
  async delete(id: number): Promise<Category> {
    try {
      const sql = 'DELETE FROM Category WHERE id=$1';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not delete Category ${id}. Error: ${err}`);
    }
  }
  async Create(c: Category): Promise<Category> {
    try {
      const sql = 'insert into Category (Name, Description,icon,CreatedBy) values ($1,$2,$3,$4)  RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [c.Name, c.Description, c.icon, c.CreatedBy]);
      console.log(result.rows[0]);

      conn.release();
      const cc: Category = {
        Id: result.rows[0].id,
        Name: result.rows[0].name,
        Description: result.rows[0].description,
        CreateTime: result.rows[0].createtime,
        icon: result.rows[0].icon,
        CreatedBy: result.rows[0].createdby,
      };
      return cc;
    } catch (error) {
      throw new Error(`Could not add new Category ${c.Name}. Error: ${error}`);
    }
  }
  async Update(c: Category): Promise<Category> {
    try {
      const sql = 'Update Category set Name=$1, Description=$2,icon=$3 where id= $4';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [c.Name, c.Description, c.icon, c.Id]);
      console.log('after updating category  ', c.Name, result.rows[0]);

      conn.release();
      const cc = (await this.show(c.Id)) as Category;
      return cc;
    } catch (error) {
      throw new Error(`Could not Update Category ${c.Name}. Error: ${error}`);
    }
  }
}
