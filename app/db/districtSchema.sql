
CREATE TABLE
IF NOT EXISTS district
(
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "district_id" INTEGER NOT NULL,
     "district_name" TEXT NOT NULL,
     "district_nbr" TEXT NOT NULL,
     "cncl_flag" INTEGER NOT NULL,
     "district_abbr" TEXT NOT NULL,
     "mdm_council_id" TEXT NOT NULL
);

CREATE INDEX "districtnameindex" ON district (district_name
COLLATE NOCASE ASC);
CREATE INDEX "district_idindex" ON district (mdm_council_id
COLLATE NOCASE ASC);
INSERT INTO district
  (district_id, district_name, district_nbr, cncl_flag, district_abbr, mdm_council_id)
VALUES
  (212, "Diamond Dick", "1", 0, "DD", "BSA326"),
  (213, "Goldenrod", "2", 0, "GR", "BSA326"),
  (214, "Soaring Eagle", "3", 0, "SE", "BSA326"),
  (215, "Trailblazer", "6", 0, "TB", "BSA326"),
  (216, "Wagon Wheel", "7", 0, "WW", "BSA326"),
  (217, "Ohwahnasee", "11", 0, "OH", "BSA326"),
  (218, "Lewis and Clark", "13", 0, "LC", "BSA326"),
  (219, "War Eagle", "21", 0, "WE", "BSA326"),
  (220, "Thundercloud", "22", 0, "TC", "BSA326"),
  (221, "Exploring/Learning For Life", "17", 0, "LFL", "BSA326"),
  (222, "Mid-America Council", "326", 1, "MAC", "BSA326"),
  (238, "Petah La Shauro", "5", 0, "PLS", "BSA326"),
  (239, "Twin Lakes", "24", 0, "TL", "BSA326"),
  (298, "Scoutreach", "14", 0, "SR", "BSA326"),
  (101, "Buckeye", "14", 0, "BK", "BSA123"),
  (102, "Arrowhead", "24", 0, "AR", "BSA123")
  ;

