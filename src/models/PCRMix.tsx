export interface IPCRMix {
  email: string;
  password: string;
  uuid: string;
}

export interface IEntryReagents {
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

export interface IOutputReagents {
  oResultMessage: string;
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

export interface IReagents {
  inputReagents: IEntryReagents;
  outputReagents: IOutputReagents;
}

export interface IStorageObject {
  id: number;
  inputReagents: IEntryReagents;
  outputReagents: IOutputReagents;
}
