import React from 'react';
import { IReagents } from '../models';
import './App.scss';


export default class App extends React.Component< {}, IReagents> {

  constructor(props: any) {
    super(props);
    console.log("Application started.");
    
    this.state = {
      inputReagents: {
        iBufferVolume: 0,
        iDNAVolume: 0,
        iEnhancerVolume: 0,
        iMasterMixInputVolume: 0,
        iMasterMixOutputVolume: 0,
        iMgCl2Volume: 0,
        iPolymeraseVolume: 0,
        iPrimer1Volume: 0,
        iPrimer2Volume: 0,
        iProbesAmount: 0,
        iWaterVolume: 0,
        idNTPsVolume: 0
      },
      outputReagents: {
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
        oResultMessage: "OK",
        oWaterVolumeForAll: 0,
        oWaterVolumeForOne: 0,
        odNTPsVolumeForAll: 0,
        odNTPsVolumeForOne: 0
      }
    }
  }

  public leftPart() {
    return (
      <div className="left-part">
        <table>

          <thead>
            <tr>
              <th>Objętość wejściowa</th>
              <th><input type="number">
              </input></th>
            </tr>
            <tr>
              <th>Odczynnik</th>
              <th>Ilość prób: 1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>H2O</td>
              <td><input type="number" 
                  onChange={(a) => 
                  { 
                    console.log(a.target.value);
                    this.setState({
                      
                      outputReagents: {
                        ...this.state.outputReagents,
                        oWaterVolumeForOne: parseFloat(a.target.value)
                      }
                    });
                  }

                  } ></input></td>
            </tr>
            <tr>
              <td>10 x Bufor</td>
              <td><input type="number"></input></td>
            </tr>
            <tr>
              <td>Enhancer 5x</td>
              <td><input type="number"></input></td>
            </tr>
            <tr>
              <td>MgCl2</td>
              <td><input type="number"></input></td>
            </tr>
            <tr>
              <td>Starter 1</td>
              <td><input type="number"></input></td>
            </tr>
            <tr>
              <td>Starter 2</td>
              <td><input type="number"></input></td>
            </tr>
            <tr>
              <td>dNTPs</td>
              <td><input type="number"></input></td>
            </tr>
            <tr>
              <td>Polimeraza</td>
              <td><input type="number"></input></td>
            </tr>
            <tr>
              <td>DNA</td>
              <td><input type="number"></input></td>
            </tr>
            <tr>
              <td><p>{this.state.outputReagents.oResultMessage}</p></td>
              <td><p>Różnica: {this.state.outputReagents.oDifferenceVolume}</p></td>
            </tr>
          </tbody>
          
        </table>
      </div>
    );
  }
  
  public rightPart() {
    return (
      <div className="right-part">
        <table>

          <thead>
            <tr>
              <th>Objętość wyjściowa</th>
              <th><input type="number"></input></th>
              <th></th>
            </tr>
            <tr>
              <th>Odczynnik</th>
              <th>Ilość prób: <p>1</p></th>
              <th>Ilość prób: <input type="number"></input></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>H2O</td>
              <td>{ this.state.outputReagents.oWaterVolumeForOne }</td>
              <td>{ this.state.outputReagents.oWaterVolumeForAll }</td>
            </tr>
            <tr>
              <td>10 x Bufor</td>
              <td>{ this.state.outputReagents.oBufferVolumeForOne }</td>
              <td>{ this.state.outputReagents.oBufferVolumeForAll }</td>
            </tr>
            <tr>
              <td>Enhancer 5x</td>
              <td>{ this.state.outputReagents.oEnhancerVolumeForOne }</td>
              <td>{ this.state.outputReagents.oEnhancerVolumeForAll }</td>
            </tr>
            <tr>
              <td>MgCl2</td>
              <td>{ this.state.outputReagents.oMgCl2VolumeForOne }</td>
              <td>{ this.state.outputReagents.oMgCl2VolumeForAll }</td>
            </tr>
            <tr>
              <td>Starter 1</td>
              <td>{ this.state.outputReagents.oPrimer1VolumeForOne }</td>
              <td>{ this.state.outputReagents.oPrimer1VolumeForAll }</td>
            </tr>
            <tr>
              <td>Starter 2</td>
              <td>{ this.state.outputReagents.oPrimer2VolumeForOne }</td>
              <td>{ this.state.outputReagents.oPrimer2VolumeForAll }</td>
            </tr>
            <tr>
              <td>dNTPs</td>
              <td>{ this.state.outputReagents.odNTPsVolumeForOne }</td>
              <td>{ this.state.outputReagents.odNTPsVolumeForAll }</td>
            </tr>
            <tr>
              <td>Polimeraza</td>
              <td>{ this.state.outputReagents.oPolymeraseVolumeForOne }</td>
              <td>{ this.state.outputReagents.oPolymeraseVolumeForAll }</td>
            </tr>
            <tr>
              <td>DNA</td>
              <td>{ this.state.outputReagents.oDNAVolumeForOne }</td>
              <td>-</td>
            </tr>
          </tbody>

          </table>
      </div>
    );
  }
  
  public render(): JSX.Element {
    return (<div className="App">
      <header className="App-header">
        <h1>
          PCR Kalkulator
        </h1>
        <div className="reagents-main">
          { this.leftPart() }
          { this.rightPart() }
        </div>
      </header>
    </div>);
  }
}
