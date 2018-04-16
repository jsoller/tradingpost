
CREATE TABLE
IF NOT EXISTS locationuser
(
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "location_user_id" INTEGER NOT NULL,
     "mdm_location_id" INTEGER NOT NULL,
     "username" TEXT NOT NULL,
     "password" TEXT NOT NULL,
     "comment" TEXT NOT NULL,
     "security_level" TEXT not null
);
CREATE INDEX "usernameindex" ON locationuser (username
COLLATE NOCASE ASC);
INSERT INTO locationuser
  (location_user_id, mdm_location_id, username, password, comment, security_level)
VALUES
  (1, 137, "user", "password", "This is a test user.", "ALL")
  ;