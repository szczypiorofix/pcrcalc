class PCRCalc {
    constructor() {
        this.inputFields = {};
        this.resultFields = {};
        this.dataForStorage = {};
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
    calcFieldForOne(i) {
        return (parseFloat(this.inputFields['outputMaxVolume'].value) *
            (parseFloat(this.inputFields[i].value) /
                parseFloat(this.inputFields['inputMaxVolume'].value))).toFixed(2);
    }
    calcFieldForMax(i) {
        return (parseFloat(this.resultFields[i].innerHTML) *
            parseFloat(this.inputFields['numberOfProbes'].value)).toFixed(2);
    }
    recalc() {
        let res = parseFloat(this.inputFields['inputH2O'].value)
            + parseFloat(this.inputFields['inputBuffer'].value)
            + parseFloat(this.inputFields['inputEnhancer'].value)
            + parseFloat(this.inputFields['inputMgCl2'].value)
            + parseFloat(this.inputFields['inputPrimer1'].value)
            + parseFloat(this.inputFields['inputPrimer2'].value)
            + parseFloat(this.inputFields['inputPolymerase'].value)
            + parseFloat(this.inputFields['inputDNTPs'].value)
            + parseFloat(this.inputFields['inputDNA'].value);
        // DIFFERENCE
        this.resultFields['inputDifferenceValue'].innerHTML = (parseFloat(this.inputFields['inputMaxVolume'].value) - res).toFixed(2);
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
        if (typeof (Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            this.dataForStorage['fields'] = {
                // TODO Dodawanie na bierząco ostatnich wartości pól - jako lastResults w localStorage
                // TODO Dodawanie po kliknięciu w + do historii wyników (wartości pól, data oraz nazwa)
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
                'outputPolymerase': this.resultFields['outputPolymerase'].innerHTML,
                'outputPolymeraseMax': this.resultFields['outputPolymeraseMax'].innerHTML,
                'outputDNA': this.resultFields['outputDNA'].innerHTML
            };
            localStorage.setItem("pcrCalcLatest", JSON.stringify(this.dataForStorage['fields']));
        }
        else {
            // Sorry! No Web Storage support..
        }
    }
    init() {
        this.recalc();
        var self = this;
        for (var property in this.inputFields) {
            if (this.inputFields.hasOwnProperty(property)) {
                if (this.inputFields[property])
                    this.inputFields[property].addEventListener('input', function (e) {
                        self.recalc();
                    });
            }
        }
    }
}
var pcrCalc = new PCRCalc();
pcrCalc.init();
//# sourceMappingURL=script.js.map