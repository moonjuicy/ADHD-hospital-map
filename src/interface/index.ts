export interface HospitalType {
  id: number;
  phone?: string | null;
  address?: string | null;
  lat?: string | null;
  lng?: string | null;
  name?: string | null;
  category?: string | null;
}

export interface HospitalApiResponse {
  data: HospitalType[];
  page?: number;
  totalPage?: number;
  totalCount?: number;
}