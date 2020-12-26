-- CreateTable
CREATE TABLE "Movie" (
"id" SERIAL,
    "title" TEXT NOT NULL,
    "imdbRating" DECIMAL(65,30) NOT NULL,
    "link" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieToUserList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie.title_unique" ON "Movie"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToUserList_AB_unique" ON "_MovieToUserList"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToUserList_B_index" ON "_MovieToUserList"("B");

-- AddForeignKey
ALTER TABLE "_MovieToUserList" ADD FOREIGN KEY("A")REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToUserList" ADD FOREIGN KEY("B")REFERENCES "UserList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
