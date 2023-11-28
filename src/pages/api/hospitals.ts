import type { NextApiRequest, NextApiResponse } from "next";
import { HospitalApiResponse, HospitalType } from "@/interface";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HospitalApiResponse | HospitalType[] | HospitalType>
) {
  const { page = "" }: { page?: string } = req.query;
  const prisma = new PrismaClient();

  if (page) {
    const count = await prisma.hospital.count();
    const skipPage = parseInt(page) - 1;
    const perPage = 3;

    const hospitals = await prisma.hospital.findMany({
      orderBy: { id: "asc" },
      take: perPage,
      skip: skipPage * perPage,
    });

    res.status(200).json({
      data: hospitals,
      page: parseInt(page),
      totalCount: count,
      totalPage: Math.ceil(count / perPage),
    });
  } else {
    const { id }: { id?: string } = req.query;
    const hospitals = await prisma.hospital.findMany({
      orderBy: { id: "asc" },
      where: {
        id: id ? parseInt(id) : {},
      },
    });

    res.status(200).json(id ? hospitals[0] : hospitals);
  }
}
