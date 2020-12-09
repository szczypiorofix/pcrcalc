// import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faBars, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import { IFieldsOfCalc, ISavedDataObject, ISettings, IStorageObject } from "../models";
import "./App.scss";
import Field from "./Field";


const localStorageCurrentDataName: string = "PCRCalcCurrentValues";
const localStorageSavedDataName: string = "PCRCalcSavedValues";
const localStorageSettingsName: string = "PCRCalcSettings";
const defaultSavedReactionName: string = "default_name";


export default class App extends React.Component<{}, IStorageObject> {

  // default values
  public reagentsDefaultValues: Readonly<IFieldsOfCalc> = {
    iBufferVolume: 1,
    iDNAVolume: 2,
    iEnhancerVolume: 2,
    iMasterMixInputVolume: 25,
    iMasterMixOutputVolume: 50,
    iMgCl2Volume: 3,
    iPolymeraseVolume: 1,
    iPrimer1Volume: 1,
    iPrimer2Volume: 1,
    iProbesAmount: 16,
    iWaterVolume: 13,
    idNTPsVolume: 1
  }

  public state: Readonly<IStorageObject> = {
    date: "0",
    id: 0,
    name: "default_name",
    reagents: this.reagentsDefaultValues
  }

  private savedObjects: ISavedDataObject;
  private modalRef: any;
  private settings: ISettings;


  constructor(props: any) {
    super(props);

    // Version to check for updates
    this.settings = {
      updateDate: Date.now().toString(),
      verMaj: 0,
      verMin: 5
    };

    this.modalRef = React.createRef();

    this.state = {
      id: 0,
      date: Date.now().toString(),
      name: defaultSavedReactionName,
      reagents: this.reagentsDefaultValues
    }

    this.savedObjects = {
      saved: [],
      lastId: 0
    };

    if (typeof Storage !== "undefined") {
      
      // Current object
      const currentObjectString: string = localStorage.getItem(localStorageCurrentDataName) || JSON.stringify( this.state );
      const dataFromStorage: IStorageObject | null = JSON.parse(currentObjectString);
      if (dataFromStorage !== null) {
        this.state = dataFromStorage;
        localStorage.setItem(localStorageCurrentDataName, JSON.stringify( dataFromStorage ));
      }

      // Saved object in localStorage
      const savedObjectsString: string = localStorage.getItem(localStorageSavedDataName) || JSON.stringify( this.savedObjects );
      const savedDataFromStorage: ISavedDataObject | null = JSON.parse(savedObjectsString);
      if (savedDataFromStorage !== null) {
        this.savedObjects = savedDataFromStorage;
        this.savedObjects.lastId = savedDataFromStorage.lastId;
        localStorage.setItem(localStorageSavedDataName, JSON.stringify( savedDataFromStorage ));
      }

      // Settings saved in localStorage
      const settingsString: string = localStorage.getItem(localStorageSettingsName) || JSON.stringify( this.settings );
      const settingsFromStorage: ISettings | null = JSON.parse(settingsString);
      
      // TODO: sprawdzenie czy wersja apki jest nowsza niż to co w localStorage, jeśli tak to migracja do nowszej wersji
      
      if (settingsFromStorage !== null) {
        this.settings = settingsFromStorage;
        localStorage.setItem(localStorageSettingsName, JSON.stringify( settingsFromStorage ));
      }

    } else {
      console.error("Ta przeglądarka nie obsługuje localStorage!");
    }

  }


  public saveCurrentToStorage() {
    console.log("Zapisywanie do localStorage...");
    this.setState({
      ...this.state,
      date: Date.now().toString()
    }, ()=> {
      localStorage.setItem(localStorageCurrentDataName, JSON.stringify(this.state));
    });
  }


  public timeConverter(timestamp: string): string {
    const t: number = parseInt(timestamp, 10);
    const d = new Date(t);
    const year: number = d.getFullYear();
    const months = ['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paź','Lis','Gru'];
    const month = months[d.getMonth()];
    const date: number = d.getDate();
    const hour: number = d.getHours();
    const min: number = d.getMinutes();
    const sec: number = d.getSeconds();
    const time: string = 
        (date < 10 ? '0'+date : date) + ' '
      + month + ' '
      + year + ' '
      + (hour < 10 ? '0'+hour : hour) + ':'
      + (min < 10 ? '0'+min : min)  + ':'
      + (sec < 10 ? '0'+sec : sec);
    return time;
  }


  public calculateOutputs(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({...this.state,
      reagents: {...this.state.reagents, [event.target.name]: parseFloat(event.target.value) || 0 } }, () => {
      // console.log("State zmieniony");
      this.saveCurrentToStorage();
    });
    // console.log("Koniec");
  }


  public showResultInfo() {
    const diff: number = this.state.reagents.iWaterVolume
    + this.state.reagents.iBufferVolume
    + this.state.reagents.iEnhancerVolume
    + this.state.reagents.iMgCl2Volume
    + this.state.reagents.iPrimer1Volume
    + this.state.reagents.iPrimer2Volume
    + this.state.reagents.idNTPsVolume
    + this.state.reagents.iPolymeraseVolume
    + this.state.reagents.iDNAVolume
    - this.state.reagents.iMasterMixInputVolume;
    
    let r:string = "OK";
    
    if (diff > 0) {
      r = "Za dużo!";
    }
    if (diff < 0) {
      r = "Za mało!";
    }
    return r;
  }


  public showOutputValue(v: number): string {
    return ( this.state.reagents.iMasterMixOutputVolume * (v / this.state.reagents.iMasterMixInputVolume) * this.state.reagents.iProbesAmount ).toFixed(2);
  }


  public render(): JSX.Element {
    return (
      <div className="App">
        <div className="main-part">
          <div ref={ this.modalRef } className="modal">
            <div className="modal-content">
              <div className="modal-main">
                <div className="modal-title">
                  <span className="title">Lista zapisanych reakcji:</span>
                  <span className="close" onClick={
                  (e) => {
                    this.modalRef.current.style.display = "none";
                  }
                }>&times;</span>
                </div>
                <div>
                  <button className="add-btn" title="Zapisz reakcję" onClick={ (e: React.MouseEvent<HTMLButtonElement>) => {
                      const sTemp: string | null = localStorage.getItem( localStorageSavedDataName ) || JSON.stringify( { saved: [] });
                      const temp: ISavedDataObject  = JSON.parse(sTemp);

                      const tName: string | null = prompt("Nazwa reakcji");

                      if (tName) {
                        this.savedObjects.lastId += 1; // increase id number
                        const tempStorage: IStorageObject = {
                          id: this.savedObjects.lastId,
                          date: Date.now().toString(), // timestamp
                          name: tName,
                          reagents: this.state.reagents
                        }
                        
                        temp.saved.push(tempStorage);
                        temp.lastId = this.savedObjects.lastId;
                        this.savedObjects.saved.push(tempStorage);
                        this.forceUpdate();
                        localStorage.setItem(localStorageSavedDataName, JSON.stringify(temp));
                      }
                    } }><FontAwesomeIcon icon={ faSave } /></button>
                </div>
                <div className="saved-list">
                  <ul>
                    { 
                      this.savedObjects.saved.map((listItem: IStorageObject, index: number) => (
                          <li key={index}>
                            
                            <button name={ "r"+listItem.id } className="delete-btn" onClick={ (e: React.MouseEvent<HTMLButtonElement>) => {
                              // remove 'b' from button name
                              const s: string = e.currentTarget.name.substring(1);
                              const i: number = parseInt(s, 10);
                              console.log("Removing reaction id: " + i);
                              const d = this.savedObjects.saved.filter(
                                (obj: IStorageObject) => obj.id !== i
                              );
                              if (d) {
                                console.log(d);
                                this.savedObjects.saved = d;
                                localStorage.setItem(localStorageSavedDataName, JSON.stringify(this.savedObjects));
                                this.forceUpdate();
                              } else {
                                console.log("Coudn't find object with id = " + i);
                              }
                            }}><FontAwesomeIcon icon={ faTrashAlt } /></button>

                            <button name={ "l"+listItem.id } className="load-btn"  onClick={ (e: React.MouseEvent<HTMLButtonElement>) => {
                              const s: string = e.currentTarget.name.substring(1);
                              const i: number = parseInt(s, 10);
                              // console.log("Loading reaction id: " + i);
                              const d = this.savedObjects.saved.find(
                                obj => obj.id === i
                              );
                              if (d) {
                                this.setState(d, ()=> {
                                  this.modalRef.current.style.display = "none";
                                  console.log("Loaded reaction: " + d.name);
                                });
                              } else {
                                console.error("Ooops! Something went wrong, mister!")
                              }
                            }
                            }>
                              <span className="item-id">{listItem.id}</span>:
                              <span className="item-name">{listItem.name}</span> 
                            </button>

                            <span className="item-date">{ this.timeConverter( listItem.date ) }</span></li>
                        )
                      )
                    }
                  </ul>
                </div>
              </div>
            </div>

          </div>

          <div className="tables">
            <div className="grid-container">
              <div className="app-header">PCR Master Mix Kalkulator</div>
              <div className="vol-in-name">Objętość wejściowa</div>
              <div className="vol-out-name">Objętość wyjściowa</div>
              <div className="vol-in-input">
                <Field
                  name = "iMasterMixInputVolume"
                  value = { this.state.reagents.iMasterMixInputVolume }
                  onChange = { (e: React.ChangeEvent<HTMLInputElement>) => this.calculateOutputs(e) }
                ></Field>
              </div>
              <div className="vol-out-input">
                <Field
                  name = "iMasterMixOutputVolume"
                  value = { this.state.reagents.iMasterMixOutputVolume }
                  onChange = { (e: React.ChangeEvent<HTMLInputElement>) => this.calculateOutputs(e) }
                ></Field>
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
                <Field
                  name = "iProbesAmount"
                  value = { this.state.reagents.iProbesAmount }
                  onChange = { (e: React.ChangeEvent<HTMLInputElement>) => this.calculateOutputs(e) }
                ></Field>
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
              <div className="info"><div>{ this.showResultInfo() }</div></div>
              <div className="water-input">
                <Field
                  name = "iWaterVolume"
                  value = { this.state.reagents.iWaterVolume }
                  onChange = { (e: React.ChangeEvent<HTMLInputElement>) => this.calculateOutputs(e) }
                ></Field>
              </div>
              <div className="buffer-input">
                <Field
                  name = "iBufferVolume"
                  value = { this.state.reagents.iBufferVolume }
                  onChange = { (e: React.ChangeEvent<HTMLInputElement>) => this.calculateOutputs(e) }
                ></Field>
              </div>
              <div className="enhancer-input">
                <Field
                  name = "iEnhancerVolume"
                  value = { this.state.reagents.iEnhancerVolume }
                  onChange = { (e: React.ChangeEvent<HTMLInputElement>) => this.calculateOutputs(e) }
                ></Field>
              </div>
              <div className="primer1-input">
                <Field
                  name = "iPrimer1Volume"
                  value = { this.state.reagents.iPrimer1Volume }
                  onChange = { (e: React.ChangeEvent<HTMLInputElement>) => this.calculateOutputs(e) }
                ></Field>
              </div>
              <div className="primer2-input">
                <Field
                  name = "iPrimer2Volume"
                  value = { this.state.reagents.iPrimer2Volume }
                  onChange = { (e: React.ChangeEvent<HTMLInputElement>) => this.calculateOutputs(e) }
                ></Field>
              </div>
              <div className="polymerase-input">
                <Field
                  name = "iPolymeraseVolume"
                  value = { this.state.reagents.iPolymeraseVolume }
                  onChange = { (e: React.ChangeEvent<HTMLInputElement>) => this.calculateOutputs(e) }
                ></Field>
              </div>
              <div className="dntps-input">
                <Field
                  name = "idNTPsVolume"
                  value = { this.state.reagents.idNTPsVolume }
                  onChange = { (e: React.ChangeEvent<HTMLInputElement>) => this.calculateOutputs(e) }
                ></Field>
              </div>
              <div className="mgcl2-input">
                <Field
                  name = "iMgCl2Volume"
                  value = { this.state.reagents.iMgCl2Volume }
                  onChange = { (e: React.ChangeEvent<HTMLInputElement>) => this.calculateOutputs(e) }
                ></Field>
              </div>
              <div className="dna-input">
                <Field
                  name = "iDNAVolume"
                  value = { this.state.reagents.iDNAVolume }
                  onChange = { (e: React.ChangeEvent<HTMLInputElement>) => this.calculateOutputs(e) }
                ></Field>
              </div>
              <div className="difference"><div>Różnica { (this.state.reagents.iWaterVolume
                + this.state.reagents.iBufferVolume
                + this.state.reagents.iEnhancerVolume
                + this.state.reagents.iMgCl2Volume
                + this.state.reagents.iPrimer1Volume
                + this.state.reagents.iPrimer2Volume
                + this.state.reagents.idNTPsVolume
                + this.state.reagents.iPolymeraseVolume
                + this.state.reagents.iDNAVolume
                - this.state.reagents.iMasterMixInputVolume).toFixed(2)
              }</div></div>
              <div className="water-result">{ this.showOutputValue(this.state.reagents.iWaterVolume) }</div>
              <div className="buffer-result">{ this.showOutputValue(this.state.reagents.iBufferVolume) }</div>
              <div className="enhancer-result">{ this.showOutputValue(this.state.reagents.iEnhancerVolume) }</div>
              <div className="primer1-result">{ this.showOutputValue(this.state.reagents.iPrimer1Volume) }</div>
              <div className="primer2-result">{ this.showOutputValue(this.state.reagents.iPrimer2Volume) }</div>
              <div className="polymerase-result">{ this.showOutputValue(this.state.reagents.iPolymeraseVolume) }</div>
              <div className="dntps-result">{ this.showOutputValue(this.state.reagents.idNTPsVolume) }</div>
              <div className="mgcl2-result">{ this.showOutputValue(this.state.reagents.iMgCl2Volume) }</div>
              <div className="dna-result">-</div>
              <div className="action-button">
                <div>
                  <button className="btn" onClick={ (e: React.MouseEvent<HTMLButtonElement>) => {                    
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
