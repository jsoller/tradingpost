CREATE TABLE
IF NOT EXISTS inventory
(
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "location_inventory_id" INTEGER NOT NULL,
     "mdm_location_id" INTEGER NOT NULL,
     "mdm_lkp_folder_id" INTEGER NOT NULL,
     "mdm_lkp_bsa_inventory_id" INTEGER NULL,
     "trp_inventory_id" INTEGER NULL,
     "trp_inventory_option_id" TEXT NULL,
     "button_name" TEXT NULL,
     "button_bg_color" TEXT NULL,
     "button_fg_color" TEXT NULL,
     "remain_cnt" INTEGER NOT NULL,
     "quick_item_flag" INTEGER NOT NULL,
     "quick_item_sort_order" INTEGER NOT NULL,
     "restricted_item_flag" INTEGER NOT NULL
);
CREATE INDEX "quickitemindex" ON inventory (quick_item_flag
COLLATE NOCASE ASC);
