
CREATE TABLE
IF NOT EXISTS products
(
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "upc" INTEGER NOT NULL,
     "category" TEXT NOT NULL,
     "productname" TEXT NOT NULL,
     "price" INTEGER NOT NULL,
     "inventory" INTEGER NOT NULL,
     "checkId" INTEGER not null
);
CREATE INDEX "upcindex" ON products (upc
COLLATE NOCASE ASC);
CREATE INDEX "productnameindex" ON products (productname
COLLATE NOCASE ASC);
INSERT INTO products
  (upc, category, productname, price, inventory, checkId)
VALUES
  (123451, "M", "DB iPad 4 Mini", 50001, 3, 1),
  (123452, "M", "DB H&M T-Shirt White", 1099, 10, 0),
  (123453, "F", "DB Milk Shake", 299, 5, 0),
  (1234541, "F", "DB Pizza 1", 350, 20, 0),
  (1234542, "F", "DB Pizza 2", 350, 20, 0),
  (1234543, "F", "DB Pizza 3", 350, 20, 0),
  (1234544, "F", "DB Pizza 4", 350, 20, 0),
  (1234545, "F", "DB Pizza 5", 350, 20, 0),
  (1234546, "F", "DB Pizza 6", 350, 20, 0),
  (1234547, "F", "DB Pizza 7", 350, 20, 0),
  (1234548, "F", "DB Pizza 8", 350, 20, 0),
  (1234549, "F", "DB Pizza 9", 350, 20, 0),
  (12345410, "F", "DB Pizza 10", 350, 20, 0),
  (12345411, "F", "DB Pizza 11", 350, 20, 0),
  (12345412, "F", "DB Pizza 12", 350, 20, 0),
  (12345413, "F", "DB Pizza 13", 350, 20, 0),
  (12345414, "F", "DB Pizza 14", 350, 20, 0),
  (12345415, "F", "DB Pizza 15", 350, 20, 0),
  (12345416, "F", "DB Pizza 16", 350, 20, 0),
  (987654, "F", "DB Candy Bar", 100, 30, 0)
;
