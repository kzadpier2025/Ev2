-- CreateTable
CREATE TABLE "Reminder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "important" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
