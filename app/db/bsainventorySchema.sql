CREATE TABLE
IF NOT EXISTS bsa_inventory
(
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "item_id" INTEGER NOT NULL,
     "upc_code" TEXT NOT NULL,
     "nme" TEXT NOT NULL,
     "item_type" TEXT NOT NULL,
     "price" REAL NOT NULL,
     "category" TEXT NOT NULL,
     "remain_cnt" INTEGER NOT NULL,
     "restricted_item_flag" INTEGER NOT NULL
);
