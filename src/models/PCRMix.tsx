
export interface IFieldInput {
  name: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IFieldsOfCalc {
  [key:string]:           number | undefined;
  iMasterMixInputVolume:  number | undefined; // Master Mix overall input volume
  iWaterVolume:           number | undefined; // Water volume
  iBufferVolume:          number | undefined; // Polymerase buffer volume
  iEnhancerVolume:        number | undefined; // Polymerase enhancer volume
  iMgCl2Volume:           number | undefined; // Mg2+ volume
  iPrimer1Volume:         number | undefined; // First primer volume
  iPrimer2Volume:         number | undefined; // Second primer volume
  idNTPsVolume:           number | undefined; // dNTPs volume
  iPolymeraseVolume:      number | undefined; // Taq Polymerase volume
  iDNAVolume:             number | undefined; // DNA matrix volume
  iMasterMixOutputVolume: number | undefined; // Master Mix overall output volume
  iProbesAmount:          number | undefined; // Amount of probes for calculations
}

// The type of individual reaction
export interface IStorageObject {
  id: number;
  date: string; // timestamp
  name: string;
  reagents: IFieldsOfCalc
}

// The object of all saved reactions
export interface ISavedDataObject {
  saved: IStorageObject[];
  lastId: number;
}

// Settings, it's quite useless right now
export interface ISettings {
  updateDate: string; // timestamp
  verMaj: number;
  verMin: number;
}