CREATE TABLE
IF NOT EXISTS transactiondetail
(
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "trans_summary_id" TEXT NOT NULL,
     "item_id" INTEGER NOT NULL,
     "quantity" INTEGER NOT NULL,
     "refund_ind" INTEGER NOT NULL
);
