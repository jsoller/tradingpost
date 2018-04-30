CREATE TABLE
IF NOT EXISTS transactionsummary
(
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "tran_date" TEXT NOT NULL,
     "tran_user" TEXT NOT NULL,
     "location_id" INTEGER NOT NULL,
     "trans_type" TEXT NOT NULL,
     "payment_type" TEXT NOT NULL,
     "total_sale" REAL NOT NULL,
     "tran_council" TEXT NULL,
     "tran_unit_type" TEXT NULL,
     "tran_unit" TEXT NULL,
     "tran_credit_card" TEXT NULL,
     "tran_check_name" TEXT NULL,
     "tran_check_num" TEXT NULL,
     "tran_tax_exempt" INTEGER NOT NULL
);
