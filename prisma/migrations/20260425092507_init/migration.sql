-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleSv" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "descSv" TEXT NOT NULL,
    "previewUrl" TEXT,
    "previewType" TEXT NOT NULL DEFAULT 'image',
    "repoUrl" TEXT,
    "liveUrl" TEXT,
    "techStack" TEXT[],
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
