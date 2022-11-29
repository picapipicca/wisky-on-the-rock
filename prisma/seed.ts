import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
    
  [...Array.from(Array(100).keys())].forEach(async (nums) => {
    await client.stream.create({
      data: {
        name: String(nums),
        description: String(nums),
        price: nums,
        user: {
          connect: {
            id: 1,
          },
        },
      },
    });
    console.log(`${nums}/100`)
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
