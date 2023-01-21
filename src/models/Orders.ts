import Client from '../database';

export type Order = {
  Id: number;
  Total: number;
  Status: string;
  CreateTime: Date;
  UserId: number;
};
export type OrderProduct={
Id:number;
Count:number;
CreateTime:Date;
UserId:number;
OrderId:number;
ProductId:number;
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM Orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Order. Error: ${err}`);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM Orders WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Orders ${id}. Error: ${err}`);
    }
  }
  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM Orders WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not delete Order ${id}. Error: ${err}`);
    }
  }
  async Create(o: Order): Promise<Order> {
    try {
      const sql = 'insert into Orders (status, userid,total) values ($1,$2,$3)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [o.Status, o.UserId, o.Total]);
      o = result.rows[0];

      conn.release();
      return o;
    } catch (error) {
      throw new Error(`Could not add new Order by user id ${o.UserId}. Error: ${error}`);
    }
  }
  
  async addProduct(quantity: number,userId:string, orderId: string, productId: string): Promise<Order> {
    try {
      //Count UserId OrderId ProductId
      const sql = 'INSERT INTO OrderProducts (Count, UserId,OrderId, ProductId) VALUES($1, $2, $3,$4) RETURNING *'
      //@ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [quantity,userId, orderId, productId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    }
  }
  /**
   *- set a product count in current order 'Order/set' [POST] (args: product id, count )
   Id,Count,CreateTime,UserId,OrderId,ProductId
   */
   async setProductCount (productId:number,count:number,orderId:number): Promise<void> {
    try {
      const sql = 'Update OrderProduct set Count=$1 where ProductId=$2 and orderid=$3; ';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [productId, count, orderId]);
      result.rows[0];

      conn.release();
      //return c;
    } catch (error) {
      throw new Error(`Could not set Product ${productId} count  on order ${orderId}. Error: ${error}`);
    }
  }
  /**
   *    *- Remove a product from current order 'Order/remove' [POST] (args: product id)
   */
  async removeProduct (productId:number,orderId:number): Promise<void> {
    try {
      const sql = 'delete * from OrderProduct where  orderid=$2 and ProductId=$1 ; ';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [productId,  orderId]);
      result.rows[0];

      conn.release();
      //return c;
    } catch (error) {
      throw new Error(`Could not delete  Product ${productId}  on order ${orderId}. Error: ${error}`);
    }
  }
  /**
   *    *- Checkout checkot the current order 'Order/checkout'[POST]
   */
  async checkout (status:string,orderId:number): Promise<void> {
    try {
      const sql = 'update orders set Status= $1 where orderid=$2; ';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [status,  orderId]);
      result.rows[0];

      conn.release();
      //return c;
    } catch (error) {
      throw new Error(`Could not checkout order ${orderId}. Error: ${error}`);
    }
  }
}
