
export interface IFieldInput {
  name: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IFieldsOfCalc {
  [key:string]:           number | undefined;
  iMasterMixInputVolume:  number | undefined;
  iWaterVolume:           number | undefined;
  iBufferVolume:          number | undefined;
  iEnhancerVolume:        number | undefined;
  iMgCl2Volume:           number | undefined;
  iPrimer1Volume:         number | undefined;
  iPrimer2Volume:         number | undefined;
  idNTPsVolume:           number | undefined;
  iPolymeraseVolume:      number | undefined;
  iDNAVolume:             number | undefined;
  iMasterMixOutputVolume: number | undefined;
  iProbesAmount:          number | undefined;
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