import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ลบข้อมูลเก่า
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany(); // ลบ category ด้วย

  // สร้าง category default
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Technology' },
      { name: 'Lifestyle' },
      { name: 'Travel' },
      { name: 'Health' },
      { name: 'Finance' },
    ],
    skipDuplicates: true, // ป้องกัน error ถ้ารันซ้ำ
  });

  console.log('✅ Seeded categories');

  // สร้างผู้ใช้
  const user = await prisma.user.create({
    data: {
      id: '1d2c3b4a-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
      name: 'Alice Example',
      email: 'alice@example.com',
    },
  });

  console.log('✅ Seeded user:', user);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
