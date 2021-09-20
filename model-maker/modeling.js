const separator = [
    { // node in triangle
        "<>" : "span",
        "text" : "==="
    }
]

const msg = [
    { // node in triangle
        "<>" : "span",
        "text" : "[Fusion]: ${msg}"
    }
]

const successmsg = [
    { // node in triangle
        "<>" : "span",
        "text" : "["
    },{ // node in triangle
        "<>" : "span",
        "style" : "color: greenyellow; margin:0",
        "text" : "Success"
    },{ // node in triangle
        "<>" : "span",
        "text" : "]: ${msg}"
    }
]

const debugmsg = [
    { // node in triangle
        "<>" : "span",
        "text" : "["
    },{ // node in triangle
        "<>" : "span",
        "style" : "color: #247cff",
        "text" : "Debug"
    },{ // node in triangle
        "<>" : "span",
        "text" : "]: ${msg}"
    }
]

const warningmsg = [
    { // node in triangle
        "<>" : "span",
        "text" : "["
    },{ // node in triangle
        "<>" : "span",
        "style" : "color: #ffb300",
        "text" : "Warning"
    },{ // node in triangle
        "<>" : "span",
        "text" : "]: ${msg}"
    }
]

const errormsg = [
    { // node in triangle
        "<>" : "span",
        "text" : "["
    },{ // node in triangle
        "<>" : "span",
        "style" : "color: rgb(255, 68, 68); margin:0",
        "text" : "Error"
    },{ // node in triangle
        "<>" : "span",
        "style" : "margin:0; line-height:0",
        "text" : "]: ${msg}"
    }
]

const supportmsg = [
    { // node in triangle
        "<>" : "span",
        "text" : "["
    },{ // node in triangle
        "<>" : "span",
        "style" : "color: #e60ef9; margin:0",
        "text" : "Fusion"
    },{ // node in triangle
        "<>" : "span",
        "style" : "margin:0; line-height:0",
        "text" : "]: ${msg}"
    }
]

// user input msgs
const defaultinput = [
    { // node in triangle
        "<>" : "span",
        "style":"font-weight:600",
        "text" : "> "
    },{ // node in triangle
        "<>" : "span",
        "style" : "margin:0; line-height:0; font-weight:600",
        "text" : "${msg}"
    }
]

let terminal = document.getElementById('dfterm')

function dflog(template, msg){
    let htmlObject = document.createElement('span');
    htmlObject.style.margin = "0.2vh";
    htmlObject.innerHTML = json2html.render({'msg' : msg}, template);
    terminal.appendChild(htmlObject);
}

function dfnl(){
    let htmlObject = document.createElement('div');
    htmlObject.innerHTML = json2html.render({}, separator);
    terminal.appendChild(htmlObject);
}

// check validity of neural network
function check_network(){
    let valid = true

    // start by checking if input and output neuron exist
    if(document.getElementById(INPUT_UUID) === null){
        dflog(warningmsg, "Missing input node.")
        valid = false
    }
    if(document.getElementById(OUTPUT_UUID) === null){
        
        dflog(warningmsg, "Missing output node.")
        valid = false
    }

    // check if input and output data is null
    if(JSON.parse(localStorage.getItem(INPUT_DAT_UUID)).data === null){ // CHANGE
        dflog(warningmsg, "Missing input file.")
        valid = false
    }
    if(JSON.parse(localStorage.getItem(OUTPUT_DAT_UUID)).data === null){ // CHANGE
        dflog(warningmsg, "Missing output file.")
        valid = false
    }

    if(!valid){
        dflog(errormsg, "Too many IO errors. Check failed.")
        return 0
    }

    // check continuity of network
    let current_uuid = INPUT_UUID
    let last_neuron_ct = 0
    while(current_uuid !== OUTPUT_UUID){
        let next_uuid = JSON.parse(localStorage.getItem(current_uuid)).dest
        if(JSON.parse(localStorage.getItem(current_uuid)).type !== 'de' && JSON.parse(localStorage.getItem(current_uuid)).from === INPUT_UUID){
            dflog(warningmsg, "Invalid first layer.")
            valid = false
        }

        // update last neuron count
        if(JSON.parse(localStorage.getItem(current_uuid)).type === 'de'){
            last_neuron_ct = JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem(current_uuid)).data)).neuron_ct
        }

        // check for repeating activations
        if(JSON.parse(localStorage.getItem(current_uuid)).type === 'ac' && 
                JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem(current_uuid)).from)).type === 'ac'){
            dflog(warningmsg, "Cannot have 2 or more activation in a row.")
            valid = false
        }

        if(next_uuid === null){
            dflog(warningmsg, "Broken network chain.")
            valid = false
        }
        current_uuid = next_uuid
    }

    if(!valid){
        dflog(errormsg, "Broken network. Check failed.")
        return 0
    }

    dflog(successmsg, "Check complete. No errors found.")
    return last_neuron_ct
}

document.getElementById('check-net').addEventListener('click', (evt) => {
    dflog(defaultinput, "checknet")
    check_network()
})

let trained = false
let kX = []; let ky = []; let ktX = []; let kty = [] 
let X = null; let y = null; let tX = null; let ty = null 
let tXarr = null; let tyarr = null;

let model = null
let lr = 0.001

const activation_code_std = {
    li : "linear",
    si : "sigmoid",
    re : "relu",
    se : "selu",
    so : "softmax",
    ta : "tanh",
    el : "elu", 
}

/*
node type standard
in = input
ou = output
de = dense
ac = activation
do = dropout

activation type standard
li = linear
si = sigmoid
re = relu
se = selu
so = softmax
ta = tanh
el = elu

commands
00 = show help
*/

function get_activation(current_uuid){
    let current_data = JSON.parse(localStorage.getItem(current_uuid))
    let next_node_data = JSON.parse(localStorage.getItem(current_data.dest))

    // check if it is activation node
    if(next_node_data.type !== 'ac') return "linear"

    // if it is, check the data of it
    let next_node_value = JSON.parse(localStorage.getItem(next_node_data.data)).value
    return activation_code_std[next_node_value]
}

function create_model(){
    model = null // clear model first
    model = tf.sequential()

    let current_uuid = INPUT_UUID
    while(current_uuid !== OUTPUT_UUID){
        let next_uuid = JSON.parse(localStorage.getItem(current_uuid)).dest
        if(current_uuid === INPUT_UUID) {
            current_uuid = next_uuid
            continue
        }
        
        // detect current node type
        current_node_data = JSON.parse(localStorage.getItem(current_uuid))
        if(current_node_data.type === 'de'){
            // add dense layer with correct neuron count
            let layer_data = JSON.parse(localStorage.getItem(current_node_data.data))
            if(current_node_data.from === INPUT_UUID){ // check if it is the first node
                model.add(tf.layers.dense({
                    units: Number(layer_data.neuron_ct),
                    inputShape: [X.shape[1]],
                    useBias: true,
                    activation: get_activation(current_uuid)
                }))
            } else { // if not, add it like normal
                model.add(tf.layers.dense({
                    units: Number(layer_data.neuron_ct),
                    useBias: true,
                    activation: get_activation(current_uuid)
                }));
            }
        }

        // if current type of dropout, then ignore it and move on
        if(current_node_data.type === 'do'){
            continue
        }
        
        current_uuid = next_uuid
    }
}

document.getElementById('test-net').addEventListener('click', (evt) => {
    dflog(defaultinput, "test -r")
    if(model == null) {
        dflog(warningmsg, "You must train before you can test!")
        dflog(errormsg, "Testing aborted.")
        return
    }

    // select a random input
    let length = tX.shape[0]
    let index = Math.floor(Math.random() * (length-1))

    let dataPoint = tf.tensor2d([tXarr[index]])

    let ys = model.predict(dataPoint)
    ys.print();

    let pred = ys.arraySync()
    pred[0].forEach((e) => {
         Math.round(e*1000)/1000
        
    })
    
    for(let i = 0; i < pred[0].length; i++){
        pred[0][i] = Math.round(pred[0][i]*1000)/1000
    }

    dflog(debugmsg, `Input: ${tXarr[index]}`)
    dflog(debugmsg, `Pred: ${pred}`)
    dflog(debugmsg, `Answer: ${tyarr[index]}`)
})

document.getElementById('train-net').addEventListener('click', (evt) => {
    dflog(defaultinput, "trainnet")

    dflog(msg, "Attemping to train...")
    // disable btns
    document.querySelector("#train-net").disabled = true
    document.querySelector("#train-net").classList.add('disable')
    document.querySelector("#test-net").disabled = true
    document.querySelector("#test-net").classList.add('disable')

    let last_neuron_ct = check_network()
    if(last_neuron_ct === 0){ // complete check first
        dflog(errormsg, "Training aborted.")
        document.querySelector("#train-net").disabled = false
        document.querySelector("#train-net").classList.remove('disable')
        document.querySelector("#test-net").disabled = false
        document.querySelector("#test-net").classList.remove('disable')
        return
    }
    
    // partition data
    let training_full = JSON.parse(JSON.parse(localStorage.getItem(INPUT_DAT_UUID)).data)
    let label_full = JSON.parse(JSON.parse(localStorage.getItem(OUTPUT_DAT_UUID)).data)

    // check if training length and label length match
    
    if(Object.keys(training_full).length !== Object.keys(label_full).length){
        dflog(errormsg, "Input and output length mismatch. Training aborted.")
        document.querySelector("#train-net").disabled = false
        document.querySelector("#train-net").classList.remove('disable')
        document.querySelector("#test-net").disabled = false
        document.querySelector("#test-net").classList.remove('disable')
        return
    }
    
    dflog(successmsg, "No errors found in IO files")
    
    // start partition
    let split_index = Math.floor(Object.keys(training_full).length * (document.getElementById('test-part-slider').value / 100))
    dflog(debugmsg, `${split_index} testing data`)
    dflog(debugmsg, `${Object.keys(training_full).length-split_index} training data`)
    
    for (let i = 0; i < Object.keys(training_full).length-1; i++){
        if (i < split_index){
            kX.push(training_full[i])
            ky.push(label_full[i])
        } else {
            ktX.push(training_full[i])
            kty.push(label_full[i])
        }
    }

    // convert to tf tensors
    X = tf.tensor2d(kX)
    y = tf.tensor2d(ky)
    tX = tf.tensor2d(ktX)
    ty = tf.tensor2d(kty)
    tXarr = tX.arraySync()
    tyarr = ty.arraySync()
 
    // check last node's validity
    console.log(last_neuron_ct)
    if(Number(last_neuron_ct) !== Number(y.shape[1])){
        dflog(errormsg, "A fatal error occured, training aborted. Reason: Invalid output node shape")
        document.querySelector("#train-net").disabled = false
        document.querySelector("#train-net").classList.remove('disable')
        document.querySelector("#test-net").disabled = false
        document.querySelector("#test-net").classList.remove('disable')
        return 
    }

    create_model()
    console.log("Compiled: network structure:")
    model.summary()
    dflog(successmsg, "Successfully built the network. If you would like to verify the strucutre, press [F12 > Console].")

    // compile model
    let epoch = Number(document.querySelector("#epoch-part-slider").value)
    let b_size = Number(document.querySelector("#batch-part-slider").value)    
    let opt = tf.train.adam(learningRate = lr, beta2 = lr/epoch)

    let config = { // add to training parameters later
        optimizer: opt,
        // loss: "categoricalCrossentropy"
        loss: "binaryCrossentropy"
        // loss: "meanSquaredError"
    }
    model.compile(config)
    dflog(successmsg, "Network compiled without error. Starting Training process:")
    train(model, epoch, b_size, X, y, document.getElementById('test-part-slider').value / 100).then(() => dflog(successmsg, "Model Trained Successfully")) // start async function of training network
})

document.getElementById('export-net').addEventListener('click', (evt) => {
    dflog(defaultinput, "exportnet")
    dflog(supportmsg, "This feature is currently in development. If you would like you to you can support the development on my GitHub!")
})

document.getElementById('term-input').addEventListener('keydown', (evt) => {
    if(evt.keyCode === 13){
        parse_cmd(document.getElementById('term-input').value)

        document.getElementById('term-input').value = '' // clear command
    }
})

// training model for EPOCH amount of times
async function train(model, epoch, b_size, X, y, valSplit) {
    for (let i = 0; i < epoch; i++){
        // calculate total batch
        let data_length = X.shape[0]
        let total_batches = Math.ceil(data_length / b_size)

        dflog(msg, `Epoch ${i+1} / ${epoch}`)
        const response = await model.fit(X, y, { // get response from model fit (will upgrade to gradient tape later)
            batchSize: b_size,
            epoch: 1,
            shuffle: true,
            validationSplit: valSplit,
            callbacks: onBatchEnd = (batch, logs) => {
            }
        })

        let loss = Math.round(Number(response.history.loss[0])*10000000)/10000000
        dflog(msg, `-- Loss ${loss}`)
    }
    document.querySelector("#train-net").disabled = false
    document.querySelector("#train-net").classList.remove('disable')
    document.querySelector("#test-net").disabled = false
    document.querySelector("#test-net").classList.remove('disable')

    dfnl()
}