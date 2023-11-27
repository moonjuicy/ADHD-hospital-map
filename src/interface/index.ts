export interface HospitalsProp {
  DESCRIPTION?: HospitalProp;
  DATA?: HospitalProp[];
}
// 필요한 값만 입력해도 됨
export interface HospitalProp {
  dutyinf: string;
  dutytel3: string;
  dutytel1: string;
  dutydivnam: string;
  dutytime2c: string;
  dutyeryn: string;
  dutytime6c: string;
  dutytime8c: string;
  dutytime4c: string;
  wgs84lat: string;
  dutydiv: string;
  dutytime1s: string;
  wgs84lon: string;
  dutytime5s: string;
  dutytime8s: string;
  postcdn2: string;
  postcdn1: string;
  dutytime3s: string;
  dutytime3c: string;
  dutyemclsname: string;
  dutytime1c: string;
  dutytime7s: string;
  dutyemcls: string;
  dutyname: string;
  dutyetc: string;
  hpid: string;
  dutytime5c: string;
  dutyaddr: string;
  dutytime7c: string;
  dutytime2s: string;
  work_dttm: number;
  dutytime6s: string;
  dutytime4s: string;
  dutymapimg: string;
}

export interface HospitalsType {
  DATA: HospitalType[];
}
export interface HospitalType {
  dutytel1: string;
  dutyaddr: string;
  wgs84lat: string;
  wgs84lon: string;
  dutyname: string;
  dutydivnam: string;
}