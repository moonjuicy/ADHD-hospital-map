import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedData() {
  // const hospitalData = data as unknown as HospitalsType;
  // hospitalData.DATA.map(async (hospital: HospitalType) => {
  //   const hospitals = {
  //     phone: hospital?.dutytel1,
  //     address: hospital?.dutyaddr,
  //     lat: hospital?.wgs84lat,
  //     lng: hospital?.wgs84lon,
  //     name: hospital?.dutyname,
  //     category: hospital?.dutydivnam,
  //   };
  //   const res = await prisma.hospital.create({
  //     data: hospitals,
  //   });
  //   console.log(res);
  // });
}

async function main() {
  // await seedData();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
