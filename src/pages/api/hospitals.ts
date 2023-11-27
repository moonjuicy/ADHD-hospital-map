import type { NextApiRequest, NextApiResponse } from "next";
import { HospitalType } from "@/interface";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HospitalType[]>
) {
  const prisma = new PrismaClient();
  const hospitals = await prisma.hospital.findMany({
    orderBy: { id: "asc" },
  });
  res.status(200).json(hospitals);
}
