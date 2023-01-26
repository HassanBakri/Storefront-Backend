# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index  'product/'     [GET]
- Show   'product/:id   [GET]
- Update '' [PUT]
- Create 'product       [POST]  [token required]    (args: name:string, description:string,price:number,available_Items:number)
- Update 'product       [PUT]   [token required]    (args: id:number ,name:string, description:string,price:number,available_Items:number)
- Delete 'product/:id'  [DELETE][token required]
- ~[OPTIONAL] Top 5 most popular products ~
- ~[OPTIONAL] Products by category (args: product category)~

#### Category
- Index  'category'        [GET]
- Show   'category/:id'    [GET]
- Update 'category'        [PUT]    (args:  id:number,name:string,description:string,icon:string)
- Create 'category'        [POST]      [token required] (args:  name:string,description:string,icon:string)
- Delete 'category/:id'    [Delete]    [token required]
  

#### Users
- Index 'users/'    [GET] 
- Show 'users/:id'  [GET] 
- Create 'Users/'   [POST]   [token required] (args: username:string,firstname:string,lastname:string,email:string,phonenumber:string)
- Update 'Users'    [PUT]    [token required] (args: id:number,username:string,firstname:string,lastname:string,email:string,phonenumber:string)
- Delete 'Users/:id'[DELETE] [token required]
- auth 'Users/auth' [POST] (args: username:string,password:string)

#### Orders
- Index  'order'        [GET]
- Show   'order/:id'    [GET]
- Create 'order'        [POST]      [token required]
- Delete 'order/:id'    [Delete]    [token required]
- 
- Add product to order 'order/:id/addProduct' [POST]    [token required]   (args: quantity:number, productId:number,orderId:number)
- Show Order Products 'order/:id/getProducts' [post]    [token required]    (args: productId:number,quantity:number,orderId:number)
- set product count in order 'order/setProductCount'    [POST] (args: product id, count )
- Remove product from order 'order/removeProduct'       [POST] [token required](args: productId:number,orderId:number)
- Checkout order 'order/checkout'                       [POST] [token required]
- ~[OPTIONAL] Completed Orders by user (args: user id)[token required]~

## Data Shapes
#### Product
- Id SERIAL
- Name VARCHAR
- Description text
- Price FLOAT
- CreateTime timestamp
- CreatedBy INT
- CategoryId INT
- Available_Items INT

#### User
- Id SERIAL
- firstname VARCHAR
- lastname VARCHAR
- username VARCHAR
- email VARCHAR UNIQE
- password VARCHAR
- CreateDate timestamp

#### Orders
- Id SERIAL
- Total of order (float)
- UserId int
- CreateTime datetime
- Status  of order (active or checked) , varchar
  
### OrderProduct
- Id SERIAL
- Count int
- CreateTime datetime
- UserId int
- OrderId int
- ProductId int

### Category
- Id SERIAL
- Name varchar
- Description varchar
- icon varchar
- CreateTime datetime
- CreatedBy int

