import { PrismaClient, User } from '@prisma/mongo-test-client';

const prisma = new PrismaClient();

const users: User[] = [
  {
    id: '91ad3741-ed75-430f-8711-3f3026dbcdc4',
    age: 22,
    name: 'Charles`',
  },
  {
    id: '3c41b8e1-42c7-4eb3-ac9d-d3356ff2f07d',
    age: 24,
    name: 'Jeff',
  },
];

async function main() {
  await prisma.user.create({ data: users[0] });
  // const promises = users.map((u) => {
  //   // prisma.user.upsert({
  //   //   create: u,
  //   //   update: u,
  //   //   where: {
  //   //     id: u.id,
  //   //   },
  //   // });
  //   prisma.user.create({ data: u });
  // });

  // return Promise.all(promises);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
