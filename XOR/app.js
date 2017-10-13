const { Layer, Network } = window.synaptic
const NUMBER_OF_ITERATIONS_TO_TRAIN = 20000


let inputLayer = new Layer(2)
let hiddenLayer = new Layer(3)
let outputLayer = new Layer(1)


inputLayer.project(hiddenLayer)
hiddenLayer.project(outputLayer)


let myNeuralNetwork = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
})


// Train the network to learn XOR problem
let learningRate = .1


for(let i = 0; i < NUMBER_OF_ITERATIONS_TO_TRAIN; i++) {
    // (0, 0) => 0
    myNeuralNetwork.activate([0, 0])
    myNeuralNetwork.propagate(learningRate, [0])

    // (0, 1) => 1
    myNeuralNetwork.activate([0, 1])
    myNeuralNetwork.propagate(learningRate, [1])

    // (1, 0) => 1
    myNeuralNetwork.activate([1, 0])
    myNeuralNetwork.propagate(learningRate, [1])

    // (1, 1) => 0
    myNeuralNetwork.activate([1, 1])
    myNeuralNetwork.propagate(learningRate, [0])
}

let $form = document.forms[0]
$form.addEventListener('submit', event => {
    event.preventDefault()
    let $input1 = document.getElementById("input1").value,
        $input2 = document.getElementById("input2").value

    // Evaluate the result with the user input
    let result = myNeuralNetwork.activate([$input1, $input2])
    document.getElementsByClassName("neural-network-results")[0].innerText = `[${result[0]}] => ${result[0].toFixed()}`
    console.log(result)
    return false
})


// Test
//console.log(myNeuralNetwork.activate([0, 0]))

//console.log(myNeuralNetwork.activate([0, 1]))

//console.log(myNeuralNetwork.activate([1, 0]))

//console.log(myNeuralNetwork.activate([1, 1]))