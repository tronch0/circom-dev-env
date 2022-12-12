const circuitName = "";
const inputFile = "";

async function testCircuit() {
    const fs = require('fs');
    const tester = require('circom_tester').wasm;

    // reading input file
    let rawdata = fs.readFileSync(inputFile);
    let input = JSON.parse(rawdata);
    console.log(input);

    // load and calc witness
    const circuit = await tester(circuitName);
    const witness = await circuit.calculateWitness(input.inputs, true);

    // check constrains and assert the ouput result of the cirucit
    await circuit.checkConstraints(witness);
    await circuit.assertOut(witness, input.expOut);
  }
  
  function start() {
    return testCircuit();
  }
  
  // Call start
  (async() => {
    console.log('Testing circuit...');
  
    await start();
    
    console.log('Test pass');
  })();
