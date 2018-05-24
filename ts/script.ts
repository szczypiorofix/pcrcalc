
class PCRCalc {

    private inputFields:object = {};
    private resultFields:object = {};
    private dataForStorage:object = {};

    public constructor() {
        this.inputFields = {
            inputMaxVolume: document.getElementById('inputMaxVolume'),
            inputH2O: document.getElementById('inputH2O'),
            inputBuffer: document.getElementById('inputBuffer'),
            inputEnhancer: document.getElementById('inputEnhancer'),
            inputMgCl2: document.getElementById('inputMgCl2'),
            inputPrimer1: document.getElementById('inputPrimer1'),
            inputPrimer2: document.getElementById('inputPrimer2'),
            inputDNTPs: document.getElementById('inputDNTPs'),
            inputPolymerase: document.getElementById('inputPolymerase'),
            inputDNA: document.getElementById('inputDNA'),
            inputDifferenceText: document.getElementById("inputDifferenceText"),
            inputDifferenceValue: document.getElementById("inputDifferenceValue"),
            numberOfProbes: document.getElementById('numberOfProbes'),
            outputMaxVolume: document.getElementById('outputMaxVolume')
        };
        this.resultFields = {
            inputDifferenceText: document.getElementById("inputDifferenceText"),
            inputDifferenceValue: document.getElementById("inputDifferenceValue"),
            outputH2O: document.getElementById('outputH2O'),
            outputH2OMax: document.getElementById('outputH2OMax'),
            outputBuffer: document.getElementById('outputBuffer'),
            outputBufferMax: document.getElementById('outputBufferMax'),
            outputEnhancer: document.getElementById('outputEnhancer'),
            outputEnhancerMax: document.getElementById('outputEnhancerMax'),
            outputMgCl2: document.getElementById('outputMgCl2'),
            outputMgCl2Max: document.getElementById('outputMgCl2Max'),
            outputPrimer1: document.getElementById('outputPrimer1'),
            outputPrimer1Max: document.getElementById('outputPrimer1Max'),
            outputPrimer2: document.getElementById('outputPrimer2'),
            outputPrimer2Max: document.getElementById('outputPrimer2Max'),
            outputDNTPs: document.getElementById('outputDNTPs'),
            outputDNTPsMax: document.getElementById('outputDNTPsMax'),
            outputPolymerase: document.getElementById('outputPolymerase'),
            outputPolymeraseMax: document.getElementById('outputPolymeraseMax'),
            outputDNA: document.getElementById('outputDNA')
        };
    }

    private calcFieldForOne(i) {
        let r = (
            parseFloat(this.inputFields['outputMaxVolume'].value) *
            (
                parseFloat(this.inputFields[i].value) /
                parseFloat(this.inputFields['inputMaxVolume'].value)
            )
        ).toFixed(2);
        if (Number.isNaN(parseFloat(r)) || !Number.isFinite(parseFloat(r)))
            return 0;
        else return r;
    }

    private calcFieldForMax(i) {
        let r = (
            parseFloat(this.resultFields[i].innerHTML) *
            parseFloat(this.inputFields['numberOfProbes'].value)
        ).toFixed(2);
        if (Number.isNaN(parseFloat(r)) || !Number.isFinite(parseFloat(r)))
            return 0;
        else return r;
    }

    private recalc() {
        let res:number = parseFloat(this.inputFields['inputH2O'].value) 
            + parseFloat(this.inputFields['inputBuffer'].value)
            + parseFloat(this.inputFields['inputEnhancer'].value)
            + parseFloat(this.inputFields['inputMgCl2'].value)
            + parseFloat(this.inputFields['inputPrimer1'].value)
            + parseFloat(this.inputFields['inputPrimer2'].value)
            + parseFloat(this.inputFields['inputPolymerase'].value)
            + parseFloat(this.inputFields['inputDNTPs'].value)
            + parseFloat(this.inputFields['inputDNA'].value);
        

        let resAll = parseFloat(this.inputFields['inputMaxVolume'].value) - res;
        if (Number.isNaN(resAll)) {
            resAll = 0;
        }
        // DIFFERENCE
        this.resultFields['inputDifferenceValue'].innerHTML = resAll.toFixed(2);
        
        // H20
        this.resultFields['outputH2O'].innerHTML = this.calcFieldForOne('inputH2O');
        this.resultFields['outputH2OMax'].innerHTML = this.calcFieldForMax('outputH2O');

        // Buffer
        this.resultFields['outputBuffer'].innerHTML = this.calcFieldForOne('inputBuffer');
        this.resultFields['outputBufferMax'].innerHTML = this.calcFieldForMax('outputBuffer');

        // Emhancer
        this.resultFields['outputEnhancer'].innerHTML = this.calcFieldForOne('inputEnhancer');
        this.resultFields['outputEnhancerMax'].innerHTML = this.calcFieldForMax('outputEnhancer');

        // MgCl2
        this.resultFields['outputMgCl2'].innerHTML = this.calcFieldForOne('inputMgCl2');
        this.resultFields['outputMgCl2Max'].innerHTML = this.calcFieldForMax('outputMgCl2');

        // Primer 1
        this.resultFields['outputPrimer1'].innerHTML = this.calcFieldForOne('inputPrimer1');
        this.resultFields['outputPrimer1Max'].innerHTML = this.calcFieldForMax('outputPrimer1');

        // Primer 2
        this.resultFields['outputPrimer2'].innerHTML = this.calcFieldForOne('inputPrimer2');
        this.resultFields['outputPrimer2Max'].innerHTML = this.calcFieldForMax('outputPrimer2');

        // dNTPs 
        this.resultFields['outputDNTPs'].innerHTML = this.calcFieldForOne('inputDNTPs');
        this.resultFields['outputDNTPsMax'].innerHTML = this.calcFieldForMax('outputDNTPs');

        // Polymerase 
        this.resultFields['outputPolymerase'].innerHTML = this.calcFieldForOne('inputPolymerase');
        this.resultFields['outputPolymeraseMax'].innerHTML = this.calcFieldForMax('outputPolymerase');

        // DNA
        this.resultFields['outputDNA'].innerHTML = this.calcFieldForOne('inputDNA');

        
        if (typeof(Storage) !== "undefined") {
            this.dataForStorage = {
                'inputMaxVolume': this.inputFields['inputMaxVolume'].value,
                'inputH2O': this.inputFields['inputH2O'].value,
                'inputBuffer': this.inputFields['inputBuffer'].value,
                'inputEnhancer': this.inputFields['inputEnhancer'].value,
                'inputMgCl2': this.inputFields['inputMgCl2'].value,
                'inputPrimer1': this.inputFields['inputPrimer1'].value,
                'inputPrimer2': this.inputFields['inputPrimer2'].value,
                'inputPolymerase': this.inputFields['inputPolymerase'].value,
                'inputDNTPs': this.inputFields['inputDNTPs'].value,
                'inputDNA': this.inputFields['inputDNA'].value,
                'outputMaxVolume': this.inputFields['outputMaxVolume'].value,
                'numberOfProbes': this.inputFields['numberOfProbes'].value,
                'inputDifferenceValue': this.resultFields['inputDifferenceValue'].innerHTML,
                'outputH2O': this.resultFields['outputH2O'].innerHTML,
                'outputH2OMax': this.resultFields['outputH2OMax'].innerHTML,
                'outputBuffer': this.resultFields['outputBuffer'].innerHTML,
                'outputBufferMax': this.resultFields['outputBufferMax'].innerHTML,
                'outputEnhancer': this.resultFields['outputEnhancer'].innerHTML,
                'outputEnhancerMax': this.resultFields['outputEnhancerMax'].innerHTML,
                'outputMgCl2': this.resultFields['outputMgCl2'].innerHTML,
                'outputMgCl2Max': this.resultFields['outputMgCl2Max'].innerHTML,
                'outputPrimer1': this.resultFields['outputPrimer1'].innerHTML,
                'outputPrimer1Max': this.resultFields['outputPrimer1Max'].innerHTML,
                'outputPrimer2': this.resultFields['outputPrimer2'].innerHTML,
                'outputPrimer2Max': this.resultFields['outputPrimer2Max'].innerHTML,
                'outputDNTPs': this.resultFields['outputDNTPs'].innerHTML,
                'outputDNTPsMax': this.resultFields['outputDNTPsMax'].innerHTML,
                'outputPolymerase': this.resultFields['outputPolymerase'].innerHTML,
                'outputPolymeraseMax': this.resultFields['outputPolymeraseMax'].innerHTML,
                'outputDNA': this.resultFields['outputDNA'].innerHTML,
                'updateDate': new Date().toLocaleString()
            };
            localStorage.setItem("pcrCalcLatest", JSON.stringify(this.dataForStorage));
        } else {
            console.error("Ta przeglądarka nie obsługuje localStorage!");
        }
    }

    private drawListOfData(data:Array<string>) {
        let self = this;
        let mainContainer = document.createElement('div');
        let mainStyle = document.createElement('style');
        let buttonClose = document.createElement("button");
        buttonClose.appendChild(document.createTextNode("X"));
        buttonClose.className = "close";
        buttonClose.addEventListener('click', function(event) {
            mainContainer.remove();
        });
        mainContainer.appendChild(buttonClose);
        let title = document.createElement("h3");
        title.appendChild(document.createTextNode("Dane zapisane lokalnie:"));
        mainContainer.appendChild(title);

        mainContainer.className = 'historyMainDiv';
        mainStyle.innerHTML = 
        '.historyMainDiv { position: fixed; display: block; top: 5%; left: 5%; width: 90%; height: 90%; background-color: rgba(50, 50, 50, 0.9); border-radius: 3px; box-shadow: 1px 1px 12px 0 rgba(50, 50, 50, 0.5);} ' +
        '.historyMainDiv h3 {margin: 10px;}' +
        ' .historyMainDiv .row { display: block; width: 100%; }' +
        ' .historyMainDiv .row button.load {margin: 5px 10px; padding: 6px 10px; background-color: #FF4081; color: #FFFFFF; border: none; border-radius: 3px; } ' +
        ' .historyMainDiv .row button.load:hover {cursor: pointer; background-color: #EE3071;}' +
        ' .historyMainDiv .row button.delete {padding: 5px 10px; background-color: #EE3344; border: none; color: #FFFFFF; font-size: 16px; border-radius: 3px;}' +
        ' .historyMainDiv .row button.delete:hover {cursor: pointer; background-color: #DD2233;}' +
        ' .historyMainDiv button.close { position: absolute; top: 5px; right: 5px; background-color: #666666; color: #eeeeee; padding: 6px 12px; border: none; }' +
        ' .historyMainDiv button.close:hover {background-color: #545454; cursor: pointer;}';
        
        for (let i = 0; i < data.length; i++) {
            let b = document.createElement("button");
            let bText = document.createTextNode(data[i]['name']+" "+data[i]['updateDate']);
            b.appendChild(bText);
            b.id = 'load'+i;
            b.className = 'load';
            let deleteB = document.createElement('button');
            deleteB.className = 'delete';
            deleteB.id = 'remove'+i;
            deleteB.appendChild(document.createTextNode("x"));

            deleteB.addEventListener('click', function(event) {
                let e = <HTMLElement>event.currentTarget;
                let elIdString = e.id.substr(6); // removing 'remove' from id
                let elIdInt = parseInt(elIdString);
                if (typeof(Storage) !== "undefined") {
                    let dataFromStorage = JSON.parse(localStorage.getItem('pcrCalcHistory'));
                    if (dataFromStorage === null) {
                        localStorage.setItem('pcrCalcHistory', '[]');
                        dataFromStorage = [];
                    }
                    dataFromStorage.splice(elIdInt, 1);
                    localStorage.setItem("pcrCalcHistory", JSON.stringify(dataFromStorage));
                    mainContainer.remove();
                    self.drawListOfData(dataFromStorage);
                } else {
                    console.error("Ta przeglądarka nie obsługuje localStorage!");
                } 
            });

            b.addEventListener('click', function(event) {
                
                let e = <HTMLElement>event.currentTarget;
                let elIdString = e.id.substr(4); // removing 'load' from id
                let elIdInt = parseInt(elIdString);

                self.inputFields['inputMaxVolume'].value = data[elIdInt]['inputMaxVolume'];
                self.inputFields['inputH2O'].value = data[elIdInt]['inputH2O'];
                self.inputFields['inputBuffer'].value = data[elIdInt]['inputBuffer'];
                self.inputFields['inputEnhancer'].value = data[elIdInt]['inputEnhancer'];
                self.inputFields['inputMgCl2'].value = data[elIdInt]['inputMgCl2'];
                self.inputFields['inputPrimer1'].value = data[elIdInt]['inputPrimer1'];
                self.inputFields['inputPrimer2'].value = data[elIdInt]['inputPrimer2'];
                self.inputFields['inputPolymerase'].value = data[elIdInt]['inputPolymerase'];
                self.inputFields['inputDNTPs'].value = data[elIdInt]['inputDNTPs'];
                self.inputFields['inputDNA'].value = data[elIdInt]['inputDNA'];
                self.inputFields['outputMaxVolume'].value = data[elIdInt]['outputMaxVolume'];
                self.inputFields['numberOfProbes'].value = data[elIdInt]['numberOfProbes'];
                self.resultFields['inputDifferenceValue'].innerHTML = data[elIdInt]['inputDifferenceValue'];
                self.resultFields['outputH2O'].innerHTML = data[elIdInt]['outputH2O'];
                self.resultFields['outputH2OMax'].innerHTML = data[elIdInt]['outputH2OMax'];
                self.resultFields['outputBuffer'].innerHTML = data[elIdInt]['outputBuffer'];
                self.resultFields['outputBufferMax'].innerHTML = data[elIdInt]['outputBufferMax'];
                self.resultFields['outputEnhancer'].innerHTML = data[elIdInt]['outputEnhancer'];
                self.resultFields['outputEnhancerMax'].innerHTML = data[elIdInt]['outputEnhancerMax'];
                self.resultFields['outputMgCl2'].innerHTML = data[elIdInt]['outputMgCl2'];
                self.resultFields['outputMgCl2Max'].innerHTML = data[elIdInt]['outputMgCl2Max'];
                self.resultFields['outputPrimer1'].innerHTML = data[elIdInt]['outputPrimer1'];
                self.resultFields['outputPrimer1Max'].innerHTML = data[elIdInt]['outputPrimer1Max'];
                self.resultFields['outputPrimer2'].innerHTML = data[elIdInt]['outputPrimer2'];
                self.resultFields['outputPrimer2Max'].innerHTML = data[elIdInt]['outputPrimer2Max'];
                self.resultFields['outputDNTPs'].innerHTML = data[elIdInt]['outputDNTPs'];
                self.resultFields['outputDNTPsMax'].innerHTML = data[elIdInt]['outputDNTPsMax'];
                self.resultFields['outputPolymerase'].innerHTML = data[elIdInt]['outputPolymerase'];
                self.resultFields['outputPolymeraseMax'].innerHTML = data[elIdInt]['outputPolymeraseMax'];
                self.resultFields['outputDNA'].innerHTML = data[elIdInt]['outputDNA'];
                mainContainer.remove();
            });
            let row = document.createElement('div');
            row.className = 'row';
            row.appendChild(b);
            row.appendChild(deleteB);

            mainContainer.appendChild(row);
        }
        mainContainer.appendChild(mainStyle);
        document.getElementsByTagName('body')[0].appendChild(mainContainer);
    }

    private addListener() {
        let self = this;
        document.getElementById('loadoffline').addEventListener('click', function(event) {
            if (typeof(Storage) !== "undefined") {
                let dataFromStorage = JSON.parse(localStorage.getItem('pcrCalcHistory'));
                if (dataFromStorage === null) {
                    localStorage.setItem('pcrCalcHistory', '[]');
                    dataFromStorage = [];
                }
                //console.log(dataFromStorage);
                self.drawListOfData(dataFromStorage);
            } else {
                console.error("Ta przeglądarka nie obsługuje localStorage!");
            }    
        });
        document.getElementById("saveoffline").addEventListener('click', function(event) {
            if (typeof(Storage) !== "undefined") {
                let dataName = prompt("Podaj nazwę zestawu: ");
                if (dataName !== null) {
                    self.dataForStorage = {
                        'name': dataName,
                        'updateDate': new Date().toLocaleString(),
                        'inputMaxVolume': self.inputFields['inputMaxVolume'].value,
                        'inputH2O': self.inputFields['inputH2O'].value,
                        'inputBuffer': self.inputFields['inputBuffer'].value,
                        'inputEnhancer': self.inputFields['inputEnhancer'].value,
                        'inputMgCl2': self.inputFields['inputMgCl2'].value,
                        'inputPrimer1': self.inputFields['inputPrimer1'].value,
                        'inputPrimer2': self.inputFields['inputPrimer2'].value,
                        'inputPolymerase': self.inputFields['inputPolymerase'].value,
                        'inputDNTPs': self.inputFields['inputDNTPs'].value,
                        'inputDNA': self.inputFields['inputDNA'].value,
                        'outputMaxVolume': self.inputFields['outputMaxVolume'].value,
                        'numberOfProbes': self.inputFields['numberOfProbes'].value,
                        'inputDifferenceValue': self.resultFields['inputDifferenceValue'].innerHTML,
                        'outputH2O': self.resultFields['outputH2O'].innerHTML,
                        'outputH2OMax': self.resultFields['outputH2OMax'].innerHTML,
                        'outputBuffer': self.resultFields['outputBuffer'].innerHTML,
                        'outputBufferMax': self.resultFields['outputBufferMax'].innerHTML,
                        'outputEnhancer': self.resultFields['outputEnhancer'].innerHTML,
                        'outputEnhancerMax': self.resultFields['outputEnhancerMax'].innerHTML,
                        'outputMgCl2': self.resultFields['outputMgCl2'].innerHTML,
                        'outputMgCl2Max': self.resultFields['outputMgCl2Max'].innerHTML,
                        'outputPrimer1': self.resultFields['outputPrimer1'].innerHTML,
                        'outputPrimer1Max': self.resultFields['outputPrimer1Max'].innerHTML,
                        'outputPrimer2': self.resultFields['outputPrimer2'].innerHTML,
                        'outputPrimer2Max': self.resultFields['outputPrimer2Max'].innerHTML,
                        'outputDNTPs': self.resultFields['outputDNTPs'].innerHTML,
                        'outputDNTPsMax': self.resultFields['outputDNTPsMax'].innerHTML,
                        'outputPolymerase': self.resultFields['outputPolymerase'].innerHTML,
                        'outputPolymeraseMax': self.resultFields['outputPolymeraseMax'].innerHTML,
                        'outputDNA': self.resultFields['outputDNA'].innerHTML
                    };
                    let history = localStorage.getItem("pcrCalcHistory");
                    if (history === null) {
                        localStorage.setItem("pcrCalcHistory", "["+JSON.stringify(self.dataForStorage)+"] ");
                    } else {
                        let h = JSON.parse(history);
                        h.push(self.dataForStorage);
                        localStorage.setItem("pcrCalcHistory", JSON.stringify(h));
                    }
                }
            } else {
                console.error("Ta przeglądarka nie obsługuje localStorage!");
            }            
        });
    }

    public getLastResults() {
        if (typeof(Storage) !== "undefined") {
            let dataFromStorage = JSON.parse(localStorage.getItem('pcrCalcLatest'));
            if (dataFromStorage !== null) {
                this.inputFields['inputMaxVolume'].value = dataFromStorage['inputMaxVolume'];
                this.inputFields['inputH2O'].value = dataFromStorage['inputH2O'];
                this.inputFields['inputBuffer'].value = dataFromStorage['inputBuffer'];
                this.inputFields['inputEnhancer'].value = dataFromStorage['inputEnhancer'];
                this.inputFields['inputMgCl2'].value = dataFromStorage['inputMgCl2'];
                this.inputFields['inputPrimer1'].value = dataFromStorage['inputPrimer1'];
                this.inputFields['inputPrimer2'].value = dataFromStorage['inputPrimer2'];
                this.inputFields['inputPolymerase'].value = dataFromStorage['inputPolymerase'];
                this.inputFields['inputDNTPs'].value = dataFromStorage['inputDNTPs'];
                this.inputFields['inputDNA'].value = dataFromStorage['inputDNA'];
                this.inputFields['outputMaxVolume'].value = dataFromStorage['outputMaxVolume'];
                this.inputFields['numberOfProbes'].value = dataFromStorage['numberOfProbes'];
                this.resultFields['inputDifferenceValue'].innerHTML = dataFromStorage['inputDifferenceValue'];
                this.resultFields['outputH2O'].innerHTML = dataFromStorage['outputH2O'];
                this.resultFields['outputH2OMax'].innerHTML = dataFromStorage['outputH2OMax'];
                this.resultFields['outputBuffer'].innerHTML = dataFromStorage['outputBuffer'];
                this.resultFields['outputBufferMax'].innerHTML = dataFromStorage['outputBufferMax'];
                this.resultFields['outputEnhancer'].innerHTML = dataFromStorage['outputEnhancer'];
                this.resultFields['outputEnhancerMax'].innerHTML = dataFromStorage['outputEnhancerMax'];
                this.resultFields['outputMgCl2'].innerHTML = dataFromStorage['outputMgCl2'];
                this.resultFields['outputMgCl2Max'].innerHTML = dataFromStorage['outputMgCl2Max'];
                this.resultFields['outputPrimer1'].innerHTML = dataFromStorage['outputPrimer1'];
                this.resultFields['outputPrimer1Max'].innerHTML = dataFromStorage['outputPrimer1Max'];
                this.resultFields['outputPrimer2'].innerHTML = dataFromStorage['outputPrimer2'];
                this.resultFields['outputPrimer2Max'].innerHTML = dataFromStorage['outputPrimer2Max'];
                this.resultFields['outputDNTPs'].innerHTML = dataFromStorage['outputDNTPs'];
                this.resultFields['outputDNTPsMax'].innerHTML = dataFromStorage['outputDNTPsMax'];
                this.resultFields['outputPolymerase'].innerHTML = dataFromStorage['outputPolymerase'];
                this.resultFields['outputPolymeraseMax'].innerHTML = dataFromStorage['outputPolymeraseMax'];
                this.resultFields['outputDNA'].innerHTML = dataFromStorage['outputDNA'];
            } 
        } else {
            console.error("Ta przeglądarka nie obsługuje localStorage!");
        }  
    }

    public init() {
        this.getLastResults();
        this.recalc();
        this.addListener();
        var self = this;
        for (var property in this.inputFields) {
            if (this.inputFields.hasOwnProperty(property)) {
                if (this.inputFields[property])
                this.inputFields[property].addEventListener('input', function(event) {
                    if (event.currentTarget.value === '') event.currentTarget.value = 0;
                    self.recalc();
                });
            }
        }
    }
}

var pcrCalc = new PCRCalc();
pcrCalc.init();
