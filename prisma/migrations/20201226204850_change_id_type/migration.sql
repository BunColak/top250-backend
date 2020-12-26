/*
  Warnings:

  - The migration will change the primary key for the `UserList` table. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_MovieToUserList" DROP CONSTRAINT "_MovieToUserList_B_fkey";

-- AlterTable
ALTER TABLE "UserList" DROP CONSTRAINT "UserList_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "UserList_id_seq";

-- AlterTable
ALTER TABLE "_MovieToUserList" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_MovieToUserList" ADD FOREIGN KEY("B")REFERENCES "UserList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
