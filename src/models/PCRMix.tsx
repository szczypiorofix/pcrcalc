
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
  oDifferenceVolume: number;

  // for one probe
  oWaterVolumeForOne: number;
  oBufferVolumeForOne: number;
  oEnhancerVolumeForOne: number;
  oMgCl2VolumeForOne: number;
  oPrimer1VolumeForOne: number;
  oPrimer2VolumeForOne: number;
  odNTPsVolumeForOne: number;
  oPolymeraseVolumeForOne: number;
  oDNAVolumeForOne: number;

  // for all probes
  oWaterVolumeForAll: number;
  oBufferVolumeForAll: number;
  oEnhancerVolumeForAll: number;
  oMgCl2VolumeForAll: number;
  oPrimer1VolumeForAll: number;
  oPrimer2VolumeForAll: number;
  odNTPsVolumeForAll: number;
  oPolymeraseVolumeForAll: number;
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