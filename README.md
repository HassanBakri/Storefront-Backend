## **Setting up and running the project**

### **1- The Database**

*   The project requires two databases to be created. One for development and the other for testing. (shopping and shopping\_test )
*   The `**db-migrate**`tool requires a database user can run DDL (Data Definition Language) i.e. create , drop, and alter, since we will run migrations.

### **2- The Project**

**to run the project. Follow the following steps:**

1.  Clone the Project `git clone https://github.com/HassanBakri/Storefront-Backend.git`
2.  Restore the dependencies `npm install`
3.  build the project, from the terminal run `npm run build`
4.  to start the project/server, from the terminal run `node .\build\index`

### **3-The Environment**

*   The project relies on `**dotenv**` lib to externalize configurations. so in order to run the project it's required to create `.env` a file containing the following properties:

```plaintext
ENV=dev
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shopping
POSTGRES_USER=shopping_user
POSTGRES_PASSWORD=####
POSTGRES_TEST_DB=shopping_test
BCRYPT_PASSWORD=#####
SALT_ROUNDS=10
JWTSECRIT=#########
port=3000
```

*   `**db-migrate**` tool requires a database.json describing dev, test environments , proper file will look like below 

```plaintext
{
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "shopping",
      "user": "shopping_user",
      "password": "#######"
    },
    "test": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "shopping_test",
      "user": "shopping_user",
      "password": "######"
    },
    "sql-file" : true
}
```