
export interface IFieldInput {
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IFieldsOfCalc {
  [key:string]: number;
  iMasterMixInputVolume: number;
  iWaterVolume: number;
  iBufferVolume: number;
  iEnhancerVolume: number;
  iMgCl2Volume: number;
  iPrimer1Volume: number;
  iPrimer2Volume: number;
  idNTPsVolume: number;
  iPolymeraseVolume: number;
  iDNAVolume: number;
  iMasterMixOutputVolume: number;
  iProbesAmount: number;
}

export interface IStorageObject {
  id: number;
  date: string; // timestamp
  name: string;
  reagents: IFieldsOfCalc
}

export interface ISavedDataObject {
  saved: IStorageObject[];
  lastId: number;
}

export interface ISettings {
  updateDate: string; // timestamp
  verMaj: number;
  verMin: number;
}