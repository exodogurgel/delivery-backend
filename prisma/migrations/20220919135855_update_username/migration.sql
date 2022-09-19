/*
  Warnings:

  - You are about to drop the column `usernames` on the `deliveryman` table. All the data in the column will be lost.
  - You are about to drop the column `usernames` on the `clients` table. All the data in the column will be lost.
  - Added the required column `username` to the `deliveryman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_deliveryman" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_deliveryman" ("id", "password") SELECT "id", "password" FROM "deliveryman";
DROP TABLE "deliveryman";
ALTER TABLE "new_deliveryman" RENAME TO "deliveryman";
CREATE UNIQUE INDEX "deliveryman_username_key" ON "deliveryman"("username");
CREATE TABLE "new_clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_clients" ("id", "password") SELECT "id", "password" FROM "clients";
DROP TABLE "clients";
ALTER TABLE "new_clients" RENAME TO "clients";
CREATE UNIQUE INDEX "clients_username_key" ON "clients"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
