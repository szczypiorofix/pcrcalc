import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react";
import { IEntryReagents, IOutputReagents, IReagents, IStorageObject } from "../models";
import "./App.scss";

const localStorageDataName: string = "PCRCalcValues";

export default class App extends React.Component<{}, IReagents> {
  private inputDefaultValues: IEntryReagents;
  private outputDefaultValues: IOutputReagents;
  private storageObject: IStorageObject;
  private modalRef: any;

  constructor(props: any) {
    super(props);
    console.log("Application started.");

    // ================================================================ //
    // Default values
    this.inputDefaultValues = {
      iBufferVolume: 4,
      iDNAVolume: 2,
      iEnhancerVolume: 3,
      iMasterMixInputVolume: 25,
      iMasterMixOutputVolume: 50,
      iMgCl2Volume: 3,
      iPolymeraseVolume: 2,
      iPrimer1Volume: 1,
      iPrimer2Volume: 1,
      iProbesAmount: 10,
      iWaterVolume: 7,
      idNTPsVolume: 2,
    };

    this.outputDefaultValues = {
      oBufferVolumeForAll: 0,
      oBufferVolumeForOne: 0,
      oDNAVolumeForOne: 0,
      oDifferenceVolume: 0,
      oEnhancerVolumeForAll: 0,
      oEnhancerVolumeForOne: 0,
      oMgCl2VolumeForAll: 0,
      oMgCl2VolumeForOne: 0,
      oPolymeraseVolumeForAll: 0,
      oPolymeraseVolumeForOne: 0,
      oPrimer1VolumeForAll: 0,
      oPrimer1VolumeForOne: 0,
      oPrimer2VolumeForAll: 0,
      oPrimer2VolumeForOne: 0,
      oResultMessage: "",
      oWaterVolumeForAll: 0,
      oWaterVolumeForOne: 0,
      odNTPsVolumeForAll: 0,
      odNTPsVolumeForOne: 0,
    };
    // ================================================================ //

    this.modalRef = React.createRef();

    this.storageObject = {
      id: 0,
      inputReagents: this.inputDefaultValues,
      outputReagents: this.outputDefaultValues,
    };

    if (typeof Storage !== "undefined") {
      const str: string =
        localStorage.getItem(localStorageDataName) ||
        JSON.stringify({ inputReagents: this.inputDefaultValues, outputReagents: this.outputDefaultValues });
      const dataFromStorage: IStorageObject | null = JSON.parse(str);
      if (dataFromStorage !== null) {
        this.storageObject = dataFromStorage;
      }
    } else {
      console.error("Ta przeglądarka nie obsługuje localStorage!");
    }

    this.state = {
      inputReagents: this.storageObject.inputReagents,
      outputReagents: this.outputDefaultValues,
    };
  }

  public getInputData(s: string): number {
    let v: number = 0;
    if (s !== "") {
      v = parseFloat(s);
    }
    return !isNaN(v) ? v : 0;
  }

  public onInputChange() {
    const oWat: number =
      this.state.inputReagents.iMasterMixOutputVolume *
      (this.state.inputReagents.iWaterVolume / this.state.inputReagents.iMasterMixInputVolume);
    const oBuf: number =
      this.state.inputReagents.iMasterMixOutputVolume *
      (this.state.inputReagents.iBufferVolume / this.state.inputReagents.iMasterMixInputVolume);
    const oEnh: number =
      this.state.inputReagents.iMasterMixOutputVolume *
      (this.state.inputReagents.iEnhancerVolume / this.state.inputReagents.iMasterMixInputVolume);
    const oMgc: number =
      this.state.inputReagents.iMasterMixOutputVolume *
      (this.state.inputReagents.iMgCl2Volume / this.state.inputReagents.iMasterMixInputVolume);
    const oPr1: number =
      this.state.inputReagents.iMasterMixOutputVolume *
      (this.state.inputReagents.iPrimer1Volume / this.state.inputReagents.iMasterMixInputVolume);
    const oPr2: number =
      this.state.inputReagents.iMasterMixOutputVolume *
      (this.state.inputReagents.iPrimer2Volume / this.state.inputReagents.iMasterMixInputVolume);
    const oDNT: number =
      this.state.inputReagents.iMasterMixOutputVolume *
      (this.state.inputReagents.idNTPsVolume / this.state.inputReagents.iMasterMixInputVolume);
    const oPol: number =
      this.state.inputReagents.iMasterMixOutputVolume *
      (this.state.inputReagents.iPolymeraseVolume / this.state.inputReagents.iMasterMixInputVolume);
    const oDNA: number =
      this.state.inputReagents.iMasterMixOutputVolume *
      (this.state.inputReagents.iDNAVolume / this.state.inputReagents.iMasterMixInputVolume);

    const oDif: number =
      this.state.inputReagents.iWaterVolume +
      this.state.inputReagents.iBufferVolume +
      this.state.inputReagents.iEnhancerVolume +
      this.state.inputReagents.iMgCl2Volume +
      this.state.inputReagents.iPrimer1Volume +
      this.state.inputReagents.iPrimer2Volume +
      this.state.inputReagents.idNTPsVolume +
      this.state.inputReagents.iPolymeraseVolume +
      this.state.inputReagents.iDNAVolume -
      this.state.inputReagents.iMasterMixInputVolume;

    let oReM: string = "OK";
    if (oDif === 0) {
      oReM = "OK";
    } else {
      if (oDif > 0) {
        oReM = "Za dużo!";
      } else {
        oReM = "Za mało!";
      }
    }

    this.setState(
      {
        outputReagents: {
          ...this.state.outputReagents,
          oDifferenceVolume: oDif,
          oResultMessage: oReM,
          oWaterVolumeForOne: oWat,
          oBufferVolumeForOne: oBuf,
          oEnhancerVolumeForOne: oEnh,
          oMgCl2VolumeForOne: oMgc,
          oPrimer1VolumeForOne: oPr1,
          oPrimer2VolumeForOne: oPr2,
          odNTPsVolumeForOne: oDNT,
          oPolymeraseVolumeForOne: oPol,
          oDNAVolumeForOne: oDNA,

          oWaterVolumeForAll: oWat * this.state.inputReagents.iProbesAmount,
          oBufferVolumeForAll: oBuf * this.state.inputReagents.iProbesAmount,
          oEnhancerVolumeForAll: oEnh * this.state.inputReagents.iProbesAmount,
          oMgCl2VolumeForAll: oMgc * this.state.inputReagents.iProbesAmount,
          oPrimer1VolumeForAll: oPr1 * this.state.inputReagents.iProbesAmount,
          oPrimer2VolumeForAll: oPr2 * this.state.inputReagents.iProbesAmount,
          odNTPsVolumeForAll: oDNT * this.state.inputReagents.iProbesAmount,
          oPolymeraseVolumeForAll: oPol * this.state.inputReagents.iProbesAmount,
        },
      },
      () => {
        this.saveToStorage();
      },
    );
  }

  public saveToStorage(reset: boolean = false) {
    this.storageObject.inputReagents = this.state.inputReagents;
    this.storageObject.outputReagents = this.state.outputReagents;
    this.storageObject.id += 1;
    if (reset) {
      this.storageObject.id = 0;
      this.storageObject.inputReagents = this.inputDefaultValues;
      this.storageObject.outputReagents = this.outputDefaultValues;
      this.setState({
        inputReagents: this.inputDefaultValues,
        outputReagents: this.outputDefaultValues,
      });
    }
    console.log("Zapisywanie do localStorage...");
    localStorage.setItem(localStorageDataName, JSON.stringify(this.storageObject));
  }

  public componentDidMount() {
    this.onInputChange();
  }

  public render(): JSX.Element {
    return (
      <div className="App">
        <div className="main-part">
          {/* <div>
          <button onClick={ () => this.saveToStorage(true) }>Reset values</button>
          </div> */}
          
          <div ref={ this.modalRef } className="modal">

            <div className="modal-content">
              <span className="close" onClick={
                (e) => {
                  this.modalRef.current.style.display = "none";
                }
              }>&times;</span>
              <div className="modal-main">
                <div className="modal-title">Ustawienia</div>
                <div className="modal-list">Lista zapisanych reakcji:</div>
                <ul>
                  <li>1. zapis 1</li>
                  <li>2. zapis 2</li>
                  <li>3. zapis 3</li>
                  <li>4. zapis 4</li>
                </ul>
              </div>
            </div>

          </div>

          <div className="tables">
            <div className="grid-container">
              <div className="app-header">PCR Master Mix Kalkulator</div>
              <div className="vol-in-name">Objętość wejściowa</div>
              <div className="vol-out-name">Objętość wyjściowa</div>
              <div className="vol-in-input">
                <input
                  type="number"
                  defaultValue={this.storageObject.inputReagents.iMasterMixInputVolume}
                  min="0"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState(
                      {
                        inputReagents: {
                          ...this.state.inputReagents,
                          iMasterMixInputVolume: this.getInputData(e.target.value) || 1, // prevent dividing by 0 !!
                        },
                      },
                      this.onInputChange,
                    );
                  }}
                ></input>
              </div>
              <div className="vol-out-input">
                <input
                  type="number"
                  defaultValue={this.storageObject.inputReagents.iMasterMixOutputVolume}
                  name="iWaterVolume"
                  min="0"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState(
                      {
                        inputReagents: {
                          ...this.state.inputReagents,
                          iMasterMixOutputVolume: parseFloat(e.target.value) || 0,
                        },
                      },
                      this.onInputChange,
                    );
                  }}
                ></input>
              </div>
              <div className="title">
                <div>PCR Kalkulator</div>
              </div>
              <div className="reagent-name">
                <div>Odczynnik</div>
              </div>
              <div className="for-1-probe-name">
                <div>1 próba</div>
              </div>
              <div className="probe-amount-name">Liczba prób</div>
              <div className="probe-amount-input">
                <input
                  type="number"
                  defaultValue={this.storageObject.inputReagents.iProbesAmount}
                  name="iWaterVolume"
                  min="0"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState(
                      {
                        inputReagents: {
                          ...this.state.inputReagents,
                          iProbesAmount: parseFloat(e.target.value) || 0,
                        },
                      },
                      this.onInputChange,
                    );
                  }}
                ></input>
              </div>
              <div className="divider1"></div>
              <div className="divider2"></div>
              <div className="divider3"></div>
              <div className="water-name">
                H<sub>2</sub>O
              </div>
              <div className="buffer-name">Bufor</div>
              <div className="enhancer-name">Enhancer</div>
              <div className="primer1-name">Starter 1</div>
              <div className="primer2-name">Starter 2</div>
              <div className="polymerase-name">
                <i>Taq</i> polimeraza
              </div>
              <div className="dntps-name">dNTPs</div>
              <div className="mgcl2-name">
                MgCl<sub>2</sub>
              </div>
              <div className="dna-name">DNA</div>
              <div className="info"><div>{this.state.outputReagents.oResultMessage}</div></div>
              <div className="water-input">
                <input
                  type="number"
                  defaultValue={this.storageObject.inputReagents.iWaterVolume}
                  name="iWaterVolume"
                  min="0"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState(
                      {
                        inputReagents: {
                          ...this.state.inputReagents,
                          iWaterVolume: parseFloat(e.target.value) || 0,
                        },
                      },
                      this.onInputChange,
                    );
                  }}
                ></input>
              </div>
              <div className="buffer-input">
                <input
                  type="number"
                  defaultValue={this.storageObject.inputReagents.iBufferVolume}
                  name="iWaterVolume"
                  min="0"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState(
                      {
                        inputReagents: {
                          ...this.state.inputReagents,
                          iBufferVolume: parseFloat(e.target.value) || 0,
                        },
                      },
                      this.onInputChange,
                    );
                  }}
                ></input>
              </div>
              <div className="enhancer-input">
                <input
                  type="number"
                  defaultValue={this.storageObject.inputReagents.iEnhancerVolume}
                  name="iWaterVolume"
                  min="0"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState(
                      {
                        inputReagents: {
                          ...this.state.inputReagents,
                          iEnhancerVolume: parseFloat(e.target.value) || 0,
                        },
                      },
                      this.onInputChange,
                    );
                  }}
                ></input>
              </div>
              <div className="primer1-input">
                <input
                  type="number"
                  defaultValue={this.storageObject.inputReagents.iPrimer1Volume}
                  name="iWaterVolume"
                  min="0"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState(
                      {
                        inputReagents: {
                          ...this.state.inputReagents,
                          iPrimer1Volume: parseFloat(e.target.value) || 0,
                        },
                      },
                      this.onInputChange,
                    );
                  }}
                ></input>
              </div>
              <div className="primer2-input">
                <input
                  type="number"
                  defaultValue={this.storageObject.inputReagents.iPrimer2Volume}
                  name="iWaterVolume"
                  min="0"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState(
                      {
                        inputReagents: {
                          ...this.state.inputReagents,
                          iPrimer2Volume: parseFloat(e.target.value) || 0,
                        },
                      },
                      this.onInputChange,
                    );
                  }}
                ></input>
              </div>
              <div className="polymerase-input">
                <input
                  type="number"
                  defaultValue={this.storageObject.inputReagents.iPolymeraseVolume}
                  name="iWaterVolume"
                  min="0"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState(
                      {
                        inputReagents: {
                          ...this.state.inputReagents,
                          iPolymeraseVolume: parseFloat(e.target.value) || 0,
                        },
                      },
                      this.onInputChange,
                    );
                  }}
                ></input>
              </div>
              <div className="dntps-input">
                <input
                  type="number"
                  defaultValue={this.storageObject.inputReagents.idNTPsVolume}
                  name="iWaterVolume"
                  min="0"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState(
                      {
                        inputReagents: {
                          ...this.state.inputReagents,
                          idNTPsVolume: parseFloat(e.target.value) || 0,
                        },
                      },
                      this.onInputChange,
                    );
                  }}
                ></input>
              </div>
              <div className="mgcl2-input">
                <input
                  type="number"
                  defaultValue={this.storageObject.inputReagents.iMgCl2Volume}
                  name="iWaterVolume"
                  min="0"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState(
                      {
                        inputReagents: {
                          ...this.state.inputReagents,
                          iMgCl2Volume: parseFloat(e.target.value) || 0,
                        },
                      },
                      this.onInputChange,
                    );
                  }}
                ></input>
              </div>
              <div className="dna-input">
                <input
                  type="number"
                  defaultValue={this.storageObject.inputReagents.iDNAVolume}
                  name="iWaterVolume"
                  min="0"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState(
                      {
                        inputReagents: {
                          ...this.state.inputReagents,
                          iDNAVolume: parseFloat(e.target.value) || 0,
                        },
                      },
                      this.onInputChange,
                    );
                  }}
                ></input>
              </div>
              <div className="difference"><div>Różnica {this.state.outputReagents.oDifferenceVolume}</div></div>
              <div className="water-result">{this.state.outputReagents.oWaterVolumeForAll.toFixed(2)}</div>
              <div className="buffer-result">{this.state.outputReagents.oBufferVolumeForAll.toFixed(2)}</div>
              <div className="enhancer-result">{this.state.outputReagents.oEnhancerVolumeForAll.toFixed(2)}</div>
              <div className="primer1-result">{this.state.outputReagents.oPrimer1VolumeForAll.toFixed(2)}</div>
              <div className="primer2-result">{this.state.outputReagents.oPrimer2VolumeForAll.toFixed(2)}</div>
              <div className="polymerase-result">{this.state.outputReagents.oPolymeraseVolumeForAll.toFixed(2)}</div>
              <div className="dntps-result">{this.state.outputReagents.odNTPsVolumeForAll.toFixed(2)}</div>
              <div className="mgcl2-result">{this.state.outputReagents.oMgCl2VolumeForAll.toFixed(2)}</div>
              <div className="dna-result">-</div>
              <div className="action-button">
                <div>
                  <button className="btn" onClick={ (e) => {
                    console.log("OK!");
                    
                    this.modalRef.current.style.display = "block";
                  } }><FontAwesomeIcon icon={ faBars } /> Menu</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
