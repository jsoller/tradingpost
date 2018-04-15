
CREATE TABLE
IF NOT EXISTS unittype
(
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "unit_type_name" TEXT NOT NULL,
     "unit_type_desc" TEXT NOT NULL,
     "lion_desc" TEXT,
     "unit_type_char" TEXT NOT NULL,
     "priority_sort_order" INTEGER NOT NULL,
     "mobile_abbr_char" TEXT not null
);
CREATE INDEX "unittypenameindex" ON unittype (unit_type_name
COLLATE NOCASE ASC);
INSERT INTO unittype
    (unit_type_name, unit_type_desc, lion_desc, unit_type_char, priority_sort_order, mobile_abbr_char)
VALUES
    ("Pack", "youth in grades 1 through 5", "youth in grades K through 5", "C", 1, "P"),
    ("Troop", "youth age 11 but not yet 18 - completed 5th grade or have Arrow of Light Award", " ", "S", 2, "T"),
    ("Crew", "youth age 13 -and completed 8th grade- but not yet 21", " ", "P", 3, "C"),
    ("Ship", "youth age 13 -and completed 8th grade- but not yet 21", " ", "P", 4, "S"),
    ("Team", "youth age 14 but not yet 18", " ", "V", 5, "V"),
    ("Post", "boys and girls age 14 - and completed 8th grade - but not yet 21", " ", "E", 6, "E")
 ;