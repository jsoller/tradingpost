
CREATE TABLE
IF NOT EXISTS district
(
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "district_id" INTEGER NOT NULL,
     "district_name" TEXT NOT NULL,
     "district_nbr" TEXT NOT NULL,
     "cncl_flag" INTEGER NOT NULL,
     "district_abbr" TEXT NOT NULL
);

CREATE INDEX "districtnameindex" ON district (district_name
COLLATE NOCASE ASC);
CREATE INDEX "district_idindex" ON district (district_id
COLLATE NOCASE ASC);
INSERT INTO district
  (district_id, district_name, district_nbr, cncl_flag, district_abbr)
VALUES
  (212, "Diamond Dick", 1, 0, "DD"),
  (213, "Goldenrod", 2, 0, "GR"),
  (214, "Soaring Eagle", 3, 0, "SE"),
  (215, "Trailblazer", 6, 0, "TB"),
  (216, "Wagon Wheel", 7, 0, "WW"),
  (217, "Ohwahnasee", 11, 0, "OH"),
  (218, "Lewis and Clark", 13, 0, "LC"),
  (219, "War Eagle", 21, 0, "WE"),
  (220, "Thundercloud", 22, 0, "TC"),
  (221, "Exploring/Learning For Life", 17, 0, "LFL"),
  (222, "Mid-America Council", 326, 1, "MAC"),
  (238, "Petah La Shauro", 5, 0, "PLS"),
  (239, "Twin Lakes", 24, 0, "TL"),
  (298, "Scoutreach", 14, 0, "SR")
 ;

