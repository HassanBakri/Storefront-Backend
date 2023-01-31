/* Replace with your SQL commands */


CREATE TABLE Users
(
  Id SERIAL,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100),
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  CreateDate timestamp default now(),
  PRIMARY KEY (Id),
  UNIQUE (email)
);

CREATE TABLE Orders
(
  Id SERIAL,
  Total FLOAT NOT NULL,
  Status VARCHAR(50) NOT NULL,
  CreateTime timestamp default now(),
  UserId INT NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE TABLE Category
(
  Id SERIAL,
  Name VARCHAR(100) NOT NULL,
  Description text NOT NULL,
  CreateTime timestamp default now(),
  icon VARCHAR(255) NOT NULL,
  CreatedBy INT NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (CreatedBy) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE TABLE Product
(
  Id SERIAL,
  Name VARCHAR(255) NOT NULL,
  Description text NOT NULL,
  Price FLOAT NOT NULL,
  CreateTime timestamp default now(),
  CreatedBy INT NOT NULL,
  CategoryId INT NOT NULL,
  Available_Items INT NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (CreatedBy) REFERENCES Users(Id) ON DELETE CASCADE,
  FOREIGN KEY (CategoryId) REFERENCES Category(Id) ON DELETE CASCADE
);

CREATE TABLE OrderProducts
(
  Id SERIAL,
  Count INT NOT NULL,
  CreateTime timestamp default now(),
  UserId INT NOT NULL,
  OrderId INT NOT NULL,--Count UserId OrderId ProductId
  ProductId INT NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
  FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE,
  FOREIGN KEY (ProductId) REFERENCES Product(Id) ON DELETE CASCADE
);