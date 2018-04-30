
CREATE TABLE
IF NOT EXISTS location
(
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "location_id" INTEGER NOT NULL,
     "nme" TEXT NOT NULL,
     "addr" TEXT NOT NULL,
     "addr2" TEXT NOT NULL,
     "city" TEXT NOT NULL,
     "state" TEXT not null,
     "zip" TEXT NOT NULL,
     "tax_percent" FLOAT NOT NULL,
     "pickup_flag" INTEGER NOT NULL
);
CREATE INDEX "locationidindex" ON location (location_id
COLLATE NOCASE ASC);
