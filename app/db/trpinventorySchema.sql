CREATE TABLE
IF NOT EXISTS trp_inventory
(
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "trp_inventory_id" INTEGER NOT NULL,
     "nme" TEXT NOT NULL,
     "descr" TEXT NOT NULL,
     "price" REAL NOT NULL
);
