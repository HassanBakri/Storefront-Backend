import Client from '../database';

export type Order = {
  Id: number;
  Total: number;
  Status: string;
  CreateTime: Date;
  UserId: number;
};
export type OrderProduct = {
  Id: number;
  Count: number;
  CreateTime: Date;
  UserId: number;
  OrderId: number;
  ProductId: number;
};

export class OrderStore {
  async getProduct(orderId: number) {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM OrderProducts where orderid=$1';

      const result = await conn.query(sql, [orderId]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Order. Error: ${err}`);
    }
  }
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
  async show(id: number): Promise<Order|undefined> {
    try {
      const sql = 'SELECT * FROM Orders WHERE id=$1';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();
      if(result.rows[0]== undefined)return undefined
      const o:Order={
        Id: result.rows[0].id,
        Total: result.rows[0].total,
        Status: result.rows[0].status,
        CreateTime: result.rows[0].createtime,
        UserId: result.rows[0].userid
      }
      console.log("showing Order ", o)
      return o;
    } catch (err) {
      throw new Error(`Could not find Orders ${id}. Error: ${err}`);
    }
  }
  async delete(id: number): Promise<Order> {
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
      const sql = 'insert into Orders (status, userid,total) values ($1,$2,$3)  RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [o.Status, o.UserId, o.Total]);

      o.Id = result.rows[0].id;
      o.Total = result.rows[0].total;
      o.Status = result.rows[0].status;
      o.CreateTime = result.rows[0].createtime;
      o.UserId = result.rows[0].userid;
      console.log(result.rows[0])
      conn.release();
      return o;
    } catch (error) {
      throw new Error(`Could not add new Order by user id ${o.UserId}. Error: ${error}`);
    }
  }

  async addProduct(quantity: number, userId: number, orderId: number, productId: number): Promise<OrderProduct> {
    try {
      //Count UserId OrderId ProductId
      const sql = 'INSERT INTO OrderProducts (Count, UserId,OrderId, ProductId) VALUES($1, $2, $3,$4) RETURNING *';
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, userId, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
    }
  }
  /**
   *- set a product count in current order 'Order/set' [POST] (args: product id, count )
   Id,Count,CreateTime,UserId,OrderId,ProductId
   */
  async setProductCount(productId: number, count: number, orderId: number): Promise<OrderProduct> {
    try {
      const sql = 'Update OrderProducts set Count=$1 where ProductId=$2 and orderid=$3 RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [count, productId, orderId]);
      //result.rows[0];

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not set Product ${productId} count  on order ${orderId}. Error: ${error}`);
    }
  }
  /**
   *    *- Remove a product from current order 'Order/remove' [POST] (args: product id)
   */
  async removeProduct(productId: number, orderId: number): Promise<void> {
    try {
      const sql = 'delete  from OrderProducts where  orderid=$2 and ProductId=$1 ; ';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [productId, orderId]);

      conn.release();
      result.rows[0];
      //return c;
    } catch (error) {
      throw new Error(`Could not delete  Product ${productId}  on order ${orderId}. Error: ${error}`);
    }
  }
  /**
   *    *- Checkout checkot the current order 'Order/checkout'[POST]
   */
  async checkout(status: string, orderId: number): Promise<void> {
    try {
      const sql = 'update orders set Status= $1 where id=$2; ';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [status, orderId]);
      //result.rows[0];

      conn.release();
      //return c;
      return;
    } catch (error) {
      throw new Error(`Could not checkout order ${orderId}. Error: ${error}`);
    }
  }
}
