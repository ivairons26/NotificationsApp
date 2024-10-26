-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "seen" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "releaseNumber" INTEGER,
    "userID" INTEGER,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
