// var inputMaxVolume = document.getElementById('inputMaxVolume');
// var inputH2O = document.getElementById('inputH2O');
// var inputBuffer = document.getElementById('inputBuffer');
// var inputEnhancer = document.getElementById('inputEnhancer');
// var inputMgCl2 = document.getElementById('inputMgCl2');
// var inputPrimer1 = document.getElementById('inputPrimer1');
// var inputPrimer2 = document.getElementById('inputPrimer2');
// var inputDNTPs = document.getElementById('inputDNTPs');
// var inputPolymerase = document.getElementById('inputPolymerase');
// var inputDNA = document.getElementById('inputDNA');
// var outputMaxVolume = document.getElementById('outputMaxVolume');
// var numberOfProbes = document.getElementById('numberOfProbes');
// var inputDifferenceText = document.getElementById("inputDifferenceText");
// var inputDifferenceValue = document.getElementById("inputDifferenceValue");
// var outputH2O = document.getElementById('outputH2O');
// var outputH2OMax = document.getElementById('outputH2OMax');
// var outputBuffer = document.getElementById('outputBuffer');
// var outputBufferMax = document.getElementById('outputBufferMax');
// var outputEnhancer = document.getElementById('outputEnhancer');
// var outputEnhancerMax = document.getElementById('outputEnhancerMax');
// var outputMgCl2 = document.getElementById('outputMgCl2');
// var outputMgCl2Max = document.getElementById('outputMgCl2Max');
// var outputPrimer1 = document.getElementById('outputPrimer1');
// var outputPrimer1Max = document.getElementById('outputPrimer1Max');
// var outputPrimer2 = document.getElementById('outputPrimer2');
// var outputPrimer2Max = document.getElementById('outputPrimer2Max');
// var outputDNTPs = document.getElementById('outputDNTPs');
// var outputDNTPsNax = document.getElementById('outputDNTPsNax');
// var outputPolymerase = document.getElementById('outputPolymerase');
// var outputPolymeraseMax = document.getElementById('outputPolymeraseMax');
// var outputDNA = document.getElementById('outputDNA');
class PCRCalc {
    constructor() {
        this.inputFields = {};
        this.resultFields = {};
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
        this.resultFields['outputH2O'].innerHTML = (parseFloat(this.inputFields['outputMaxVolume'].value) * (parseFloat(this.inputFields['inputH2O'].value) / parseFloat(this.inputFields['inputMaxVolume'].value))).toFixed(2);
        this.resultFields['outputH2OMax'].innerHTML = (parseFloat(this.resultFields['outputH2O'].innerHTML) * parseFloat(this.inputFields['numberOfProbes'].value)).toFixed(2);
        // Buffer
        this.resultFields['outputBuffer'].innerHTML = (parseFloat(this.inputFields['outputMaxVolume'].value) * (parseFloat(this.inputFields['inputBuffer'].value) / parseFloat(this.inputFields['inputMaxVolume'].value))).toFixed(2);
        this.resultFields['outputBufferMax'].innerHTML = (parseFloat(this.resultFields['outputBuffer'].innerHTML) * parseFloat(this.inputFields['numberOfProbes'].value)).toFixed(2);
        // Emhancer
        this.resultFields['outputEnhancer'].innerHTML = (parseFloat(this.inputFields['outputMaxVolume'].value) * (parseFloat(this.inputFields['inputEnhancer'].value) / parseFloat(this.inputFields['inputMaxVolume'].value))).toFixed(2);
        this.resultFields['outputEnhancerMax'].innerHTML = (parseFloat(this.resultFields['outputEnhancer'].innerHTML) * parseFloat(this.inputFields['numberOfProbes'].value)).toFixed(2);
        // MgCl2
        this.resultFields['outputMgCl2'].innerHTML = (parseFloat(this.inputFields['outputMaxVolume'].value) * (parseFloat(this.inputFields['inputMgCl2'].value) / parseFloat(this.inputFields['inputMaxVolume'].value))).toFixed(2);
        this.resultFields['outputMgCl2Max'].innerHTML = (parseFloat(this.resultFields['outputMgCl2'].innerHTML) * parseFloat(this.inputFields['numberOfProbes'].value)).toFixed(2);
        // Primer 1
        this.resultFields['outputPrimer1'].innerHTML = (parseFloat(this.inputFields['outputMaxVolume'].value) * (parseFloat(this.inputFields['inputPrimer1'].value) / parseFloat(this.inputFields['inputMaxVolume'].value))).toFixed(2);
        this.resultFields['outputPrimer1Max'].innerHTML = (parseFloat(this.resultFields['outputPrimer1'].innerHTML) * parseFloat(this.inputFields['numberOfProbes'].value)).toFixed(2);
        // Primer 2
        this.resultFields['outputPrimer2'].innerHTML = (parseFloat(this.inputFields['outputMaxVolume'].value) * (parseFloat(this.inputFields['inputPrimer2'].value) / parseFloat(this.inputFields['inputMaxVolume'].value))).toFixed(2);
        this.resultFields['outputPrimer2Max'].innerHTML = (parseFloat(this.resultFields['outputPrimer2'].innerHTML) * parseFloat(this.inputFields['numberOfProbes'].value)).toFixed(2);
        // dNTPs 
        this.resultFields['outputDNTPs'].innerHTML = (parseFloat(this.inputFields['outputMaxVolume'].value) * (parseFloat(this.inputFields['inputDNTPs'].value) / parseFloat(this.inputFields['inputMaxVolume'].value))).toFixed(2);
        this.resultFields['outputDNTPsMax'].innerHTML = (parseFloat(this.resultFields['outputDNTPs'].innerHTML) * parseFloat(this.inputFields['numberOfProbes'].value)).toFixed(2);
        // Polymerase 
        this.resultFields['outputPolymerase'].innerHTML = (parseFloat(this.inputFields['outputMaxVolume'].value) * (parseFloat(this.inputFields['inputPolymerase'].value) / parseFloat(this.inputFields['inputMaxVolume'].value))).toFixed(2);
        this.resultFields['outputPolymeraseMax'].innerHTML = (parseFloat(this.resultFields['outputPolymerase'].innerHTML) * parseFloat(this.inputFields['numberOfProbes'].value)).toFixed(2);
        // DNA
        this.resultFields['outputDNA'].innerHTML = (parseFloat(this.inputFields['outputMaxVolume'].value) * (parseFloat(this.inputFields['inputDNA'].value) / parseFloat(this.inputFields['inputMaxVolume'].value))).toFixed(2);
    }
    init() {
        //console.log(this.inputFields);
        //console.log(this.resultFields);
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