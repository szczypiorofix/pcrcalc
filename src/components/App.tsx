import React from 'react';
import { IPCRMix } from '../models';
import './App.scss';


export default class App extends React.Component< {}, IPCRMix> {
  
  public state: Readonly<IPCRMix> = {
    email: "",
    uuid: "",
    password: ""
  }

  constructor(props: any) {
    super(props);
    console.log("Hello!");
  }

  public leftPart() {
    return (
      <div>
        
      </div>
    );
  }
  
  
  public render(): JSX.Element {
    return (<div className="App">
      <header className="App-header">
        <h1>
          PCR Calc
        </h1>
        { this.leftPart() }
      </header>
    </div>);
  }
}
