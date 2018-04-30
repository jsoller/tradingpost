  
CREATE TABLE 
IF NOT EXISTS category
(
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "folder_id" INTEGER NOT NULL,
     "nme" TEXT NOT NULL    
); 
CREATE INDEX "folderidindex" ON category (folder_id 
COLLATE NOCASE ASC);