  
CREATE TABLE 
IF NOT EXISTS council
(
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "orgkey" TEXT NOT NULL,
     "nme" TEXT NOT NULL,
     "name_abbr" TEXT NOT NULL,
     "name_abbr_short" TEXT NOT NULL,
     "tz_name" TEXT NOT NULL,
     "tz_offset" TEXT not null,
     "website_lk" TEXT NOT NULL,
     "accept_eft" INTEGER NOT NULL,
     "accept_swipe" INTEGER not null
); 
CREATE INDEX "councilnameindex" ON council (nme 
COLLATE NOCASE ASC);
CREATE INDEX "orgkeyindex" ON council (orgkey 
COLLATE NOCASE ASC);
INSERT INTO council
  (orgkey, nme, name_abbr, name_abbr_short, tz_name, tz_offset, website_lk, accept_eft, accept_swipe)
VALUES
  ("BSA326", "Mid-America Council", "Mid-America", "MAC", "CST", "-5", "http://www.mac-bsa.org/",	1,1),
  ("BSA123", "Simon Kenton Council", "Simon Kenton", "SKC", "CST", "-5", "http://www.mac-bsa.org/",	1,1)
 ;