import Client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id: number;
  FirstName: string;
  LastName: string;
  UserName: string;
  Password: string;
  Email: String;
  PhoneNumber: String;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT id,FirstName, LastName,UserName,Email,PhoneNumber,CreateDate FROM Users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Users. Error: ${err}`);
    }
  }
  async show(id: number): Promise<User | undefined> {
    try {
      const sql = 'SELECT * FROM Users WHERE id=$1 ;';
      // @ts-ignore
      const conn = await Client.connect();
      console.log('show User ID', id);

      const result = await conn.query(sql, [id]);
      conn.release();

      console.log('user after show', result.rows[0]);
      if (result.rows[0] == undefined) return undefined;
      const u: User = {
        id: result.rows[0].id,
        FirstName: result.rows[0].firstname,
        LastName: result.rows[0].lastname,
        UserName: result.rows[0].username,
        Password: 'dd',
        Email: result.rows[0].email,
        PhoneNumber: result.rows[0].phonenumber,
      };
      console.log("Show User return value ", u)
      return u;
    } catch (err) {
      throw new Error(`Could not find User ${id}. Error: ${err}`);
    }
  }
  async create(u: User): Promise<User> {
    try {
      const pepper: string = process.env.BCRYPT_PASSWORD as string;
      const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string);
      const salt = bcrypt.genSaltSync(saltRounds);
      console.log("Model.Create",salt + '\t' + pepper + '\t' + saltRounds, u.FirstName, u.LastName, u.Email, u.UserName);
      u.Password = bcrypt.hashSync(u.Password + pepper, salt);
      const sql = 'INSERT INTO Users (FirstName, LastName,UserName,Email,PhoneNumber,Password) VALUES($1, $2, $3, $4,$5,$6) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      //console.log(conn)

      const result = await conn.query(sql, [u.FirstName, u.LastName, u.UserName, u.Email, u.PhoneNumber, u.Password]);

      //const newuser = result.rows[0];

      conn.release();
      console.log(u.FirstName, u.LastName, u.UserName, u.Email, u.PhoneNumber, u.Password);
      const uy: User = {
        id: result.rows[0].id,
        FirstName: result.rows[0].firstname,
        LastName: result.rows[0].lastname,
        UserName: result.rows[0].username,
        Password: 'dd',
        Email: result.rows[0].email,
        PhoneNumber: result.rows[0].phonenumber,
      };
      return uy;
    } catch (err) {
      throw new Error(`Could not add new User ${u.Email}. Error: ${err}`);
    }
  }
  async setPassword(id: number, password: string) {
    try {
      const pepper: string = process.env.BCRYPT_PASSWORD as string;
      const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string);
      const salt = bcrypt.genSaltSync(saltRounds);
      console.log(salt + '\t' + pepper + '\t' + saltRounds);
      const Password = bcrypt.hashSync(password + pepper, salt);
      const sql = 'update users set password=$1 where id=$2';
      const conn = await Client.connect();

      await conn.query(sql, [Password, id]);
    } catch (error) {
      throw new Error(`Could not Update user ${id}. password: ${error}`);
    }
    return;
  }
  async Update(u: User): Promise<User> {
    try {
      console.log('brfore update ', u.id, u.FirstName, u.LastName, u.UserName, u.Email, u.PhoneNumber);
      const sql = 'Update Users set FirstName = $1, LastName= $2,PhoneNumber=$3 where Email=$4  ;';
      // @ts-ignore
      const conn = await Client.connect();

      await conn.query(sql, [u.FirstName, u.LastName,  u.PhoneNumber,u.Email,]);
      const sql1 = 'SELECT id,FirstName, LastName,UserName,Email,PhoneNumber,CreateDate FROM Users WHERE Email=$1';
             const resultq = await conn.query(sql1, [u.Email]);
            //conn.release();
            //const user = (await this.show(u.id));
            const nu: User = {
              id: resultq.rows[0].id,
              FirstName: resultq.rows[0].firstname,
              LastName: resultq.rows[0].lastname,
              UserName: resultq.rows[0].username,
              Password: 'dd',
              Email: resultq.rows[0].email,
              PhoneNumber: resultq.rows[0].phonenumber,
            };

      conn.release();
      //const user = (await this.show(u.id)) as User;

      console.log('after update ', nu.FirstName, nu.LastName, nu.UserName, nu.Email, nu.PhoneNumber);
      return nu;
    } catch (err) {
      console.log("error stack",err)
      throw new Error(`Could not Update user ${u.Email}. Error: ${err}`);
    }
  }
  async delete(id: string): Promise<void> {
    try {
      const sql = 'DELETE FROM Users WHERE id=$1;';
      // @ts-ignore
      const conn = await Client.connect();

      await conn.query(sql, [id]);

      conn.release();

      return;
    } catch (err) {
      throw new Error(`Could not delete User ${id}. Error: ${err}`);
    }
  }
  //bcrypt.compareSync(password+pepper, user.password)
  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect();
    const sql = 'SELECT * FROM users WHERE username=$1 ;';

    const pepper: string = process.env.BCRYPT_PASSWORD as string;
    //const saltRounds: number = parseInt(process.env.BCRYPT_PASSWORD as string);
    const result = await conn.query(sql, [username]);

    console.log(username, password + '\t' + pepper + '\t' + result.rows.length);

    if (result.rows.length) {
      const user: User = {
        id: result.rows[0].id,
        FirstName: result.rows[0].firstname,
        LastName: result.rows[0].lastname,
        UserName: result.rows[0].username,
        Password: result.rows[0].password,
        Email: result.rows[0].email,
        PhoneNumber: result.rows[0].phonenumber,
      };

      console.log(result.rows[0], user.Email, user.id, user.Password, user.FirstName);

      if (bcrypt.compareSync(password + pepper, user.Password)) {
        return user;
      }
    }
    return null;
  }
}
