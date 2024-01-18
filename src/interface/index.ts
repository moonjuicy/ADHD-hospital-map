export interface HospitalType {
  id: number;
  phone?: string | null;
  address?: string | null;
  lat?: string | null;
  lng?: string | null;
  name?: string | null;
  category?: string | null;
  likes?: LikeInterface[];
}

export interface LikeInterface {
  id: number;
  hospitalId: number;
  userId: number;
}

export interface HospitalApiResponse {
  data: HospitalType[];
  page?: number;
  totalPage?: number;
  totalCount?: number;
}

export interface LocationType {
  lat?: string | null;
  lng?: string | null;
  zoom?: number | null;
}

export interface SearchType {
  q?: string;
  district?: string;
}