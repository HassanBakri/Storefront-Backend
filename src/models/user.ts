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
  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT id,FirstName, LastName,UserName,Email,PhoneNumber,CreateDate FROM Users WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find User ${id}. Error: ${err}`);
    }
  }
  async create(u: User): Promise<User> {
    try {
      const pepper: string = process.env.BCRYPT_PASSWORD as string;
      const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string);
      const salt = bcrypt.genSaltSync(saltRounds);
      console.log(salt + '\t' + pepper + '\t' + saltRounds);
      u.Password = bcrypt.hashSync(u.Password + pepper, salt);

      const sql = 'INSERT INTO Users (FirstName, LastName,UserName,Email,PhoneNumber,Password) VALUES($1, $2, $3, $4,$5,$6) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [u.FirstName, u.LastName, u.UserName, u.Email, u.PhoneNumber, u.Password]);

      const book = result.rows[0];

      conn.release();
      console.log(u.FirstName, u.LastName, u.UserName, u.Email, u.PhoneNumber, u.Password);
      return book;
    } catch (err) {
      throw new Error(`Could not add new User ${u.Email}. Error: ${err}`);
    }
  }
  async setPassword(id:number,password:string) {
    try {
	const pepper: string = process.env.BCRYPT_PASSWORD as string;
	      const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string);
	      const salt = bcrypt.genSaltSync(saltRounds);
	      console.log(salt + '\t' + pepper + '\t' + saltRounds);
	      const Password = bcrypt.hashSync(password + pepper, salt);
	      const sql="update users set password=$1 where id=$2";
	      const conn = await Client.connect();
	
	      await conn.query(sql,[Password,id])
	
} catch (error) {
	throw new Error(`Could not Update user ${id}. password: ${error}`);
}
      return
  }
  async Update(u: User): Promise<User> {
    try {
      

      const sql = 'Update Users set FirstName = $1, LastName= $2,UserName=$3,Email=$4,PhoneNumber=$5 where Id=$6  RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [u.FirstName, u.LastName, u.UserName, u.Email, u.PhoneNumber, u.id]);

      const book = result.rows[0];

      conn.release();
      console.log(u.FirstName, u.LastName, u.UserName, u.Email, u.PhoneNumber);
      return book;
    } catch (err) {
      throw new Error(`Could not Update user ${u.Email}. Error: ${err}`);
    }
  }
  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM Users WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not delete User ${id}. Error: ${err}`);
    }
  }
  //bcrypt.compareSync(password+pepper, user.password)
  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect();
    const sql = "SELECT * FROM users WHERE username=$1 ;";

    const pepper: string = process.env.BCRYPT_PASSWORD as string;
    //const saltRounds: number = parseInt(process.env.BCRYPT_PASSWORD as string);
    const result = await conn.query(sql, [username]);

    console.log(username,password+"\t"+ pepper+"\t"+result.rows.length);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(result.rows[0],user.Email,user.id,user.Password,user.FirstName);

      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }

    return null;
  }
}
