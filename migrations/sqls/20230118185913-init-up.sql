/* Replace with your SQL commands */

Generate SQL
CREATE TABLE User
(
  Id SERIAL INT NOT NULL,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100),
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  CreateDate timestamp default now(),
  PRIMARY KEY (Id),
  UNIQUE (email)
);

CREATE TABLE Order
(
  Id SERIAL INT NOT NULL,
  Total FLOAT NOT NULL,
  Status VARCHAR(50) NOT NULL,
  CreateTime timestamp default now(),
  UserId INT NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (UserId) REFERENCES User(Id)
);

CREATE TABLE Category
(
  Id SERIAL INT NOT NULL,
  Name VARCHAR(100) NOT NULL,
  Description text NOT NULL,
  CreateTime timestamp default now(),
  icon VARCHAR(255) NOT NULL,
  CreatedBy INT NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (CreatedBy) REFERENCES User(Id)
);

CREATE TABLE Product
(
  Id SERIAL INT NOT NULL,
  Name VARCHAR(255) NOT NULL,
  Description text NOT NULL,
  Price FLOAT NOT NULL,
  CreateTime timestamp default now(),
  CreatedBy INT NOT NULL,
  CategoryId INT NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (CreatedBy) REFERENCES User(Id),
  FOREIGN KEY (CategoryId) REFERENCES Category(Id)
);

CREATE TABLE OrderProducts
(
  Id SERIAL INT NOT NULL,
  Count INT NOT NULL,
  CreateTime timestamp default now(),
  UserId INT NOT NULL,
  OrderId INT NOT NULL,
  ProductId INT NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (UserId) REFERENCES User(Id),
  FOREIGN KEY (OrderId) REFERENCES Order(Id),
  FOREIGN KEY (ProductId) REFERENCES Product(Id)
);