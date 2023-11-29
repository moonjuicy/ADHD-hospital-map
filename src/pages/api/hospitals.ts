import type { NextApiRequest, NextApiResponse } from "next";
import { HospitalApiResponse, HospitalType } from "@/interface";
import prisma from "@/db";
import axios from "axios";

interface ResponeType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    HospitalApiResponse | HospitalType[] | HospitalType | null
  >
) {
  const { page = "", limit = "", q, district }: ResponeType = req.query;

  if (req.method === "POST") {
    const formData = req.body;
    const headers = {
      Authorization: ` KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      { headers }
    );

    const result = await prisma.hospital.create({
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });

    return res.status(200).json(result);
  } else {
    if (page) {
      const count = await prisma.hospital.count();
      const skipPage = parseInt(page) - 1;
      const perPage = 3;

      const hospitals = await prisma.hospital.findMany({
        orderBy: { id: "asc" },
        where: {
          name: q ? { contains: q } : {},
          address: district ? { contains: district } : {},
        },
        take: parseInt(limit),
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
}
