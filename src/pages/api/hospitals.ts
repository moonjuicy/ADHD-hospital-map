import type { NextApiRequest, NextApiResponse } from "next";
import { HospitalProp } from "@/interface";
// Define an interface for the JSON structure
interface HospitalData {
  DATA: HospitalProp[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HospitalProp[]>
) {
  // Dynamically import the JSON and assert its type
  const jsonModule = await import("../../data/hospital_data.json");
  const hospitals = (jsonModule.default as HospitalData).DATA;

  res.status(200).json(hospitals);
}
