CREATE TABLE products (
     "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "upc" integer NOT NULL,
     "category" TEXT(1,0) NOT NULL,
     "product_name" TEXT(255,0) NOT NULL,
     "price" INTEGER NOT NULL,
     "inventory" integer NOT NULL,
     "checkId" boolean not null,
     "quickProductInd" boolean not null
);
CREATE INDEX "upc_index" ON products ("upc" COLLATE NOCASE ASC);
CREATE INDEX "product_name_index" ON people ("product_name" COLLATE NOCASE ASC);
INSERT INTO `products` VALUES 
  ("123451", "M", "DB iPad 4 Mini", 50001, 3,true, true),
  ("123452", "M", "DB H&M T-Shirt White", 1099, 10, false, true),
  ("123453", "F", "DB Milk Shake", 299, 5, false, true),
  ("123454", "F", "DB Pizza", 350, 20, false, true),
  ("987654", "F", "DB Candy Bar", 100, 30, false, false)
;
