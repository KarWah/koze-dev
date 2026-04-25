import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        slug: "koze-dev",
        titleEn: "koze.dev",
        titleSv: "koze.dev",
        descEn:
          "My personal portfolio site built with Next.js 16, Prisma, and next-intl. Fully bilingual (English & Swedish), deployed on Vercel with a Prisma Postgres database.",
        descSv:
          "Min personliga portfoliosajt byggd med Next.js 16, Prisma och next-intl. Helt tvåspråkig (engelska och svenska), driftsatt på Vercel med en Prisma Postgres-databas.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Vercel"],
        liveUrl: "https://koze.dev",
        repoUrl: "https://github.com/KarWah/koze-dev",
        featured: true,
        sortOrder: 1,
      },
    ],
  });

  console.log("Seeded database.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
