const separator = [
    { // node in triangle
        "<>" : "span",
        "text" : "==="
    }
]

const msg = [
    { // node in triangle
        "<>" : "span",
        "text" : "[Fusion] ${msg}"
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
        "html" : "] ${msg}"
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
        "html" : "] ${msg}"
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
        "html" : "] ${msg}"
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
        "html" : "] ${msg}"
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
        "html" : "] ${msg}"
    }
]

const blankmsg = [
    { // node in triangle
        "<>" : "span",
        "style" : "font-weight:600; margin:0",
        "html" : "${pref}"
    },{
        "<>" : "span",
        "style" : "margin:1vh 0 0 0; line-height:0",
        "html" : "${msg}"
    }
]

// user input msgs
const defaultinput = [
    { // node in triangle
        "<>" : "span",
        "style":"font-weight:400; color:#fff",
        "text" : ">>> "
    },{ // node in triangle
        "<>" : "span",
        "style" : "margin:0; line-height:0; font-weight:400; color:#fff",
        "text" : "${msg}"
    }
]

let terminal = document.getElementById("dfterm")

function dflog(template, msg, pref=null, indent=0){
    let htmlObject = document.createElement("span");
    htmlObject.style.margin = `0.2vh 0 0 ${indent}`;
    if(pref !== null){
        htmlObject.innerHTML = json2html.render({"msg" : msg, "pref" : pref}, template);
    } else {
        htmlObject.innerHTML = json2html.render({"msg" : msg}, template);
    }
    terminal.appendChild(htmlObject);

    update_term_scroll()
}

function dfnl(){
    let htmlObject = document.createElement("div");
    htmlObject.innerHTML = json2html.render({}, separator);
    terminal.appendChild(htmlObject);
}

// check validity of neural network
function check_network(need_io){
    let valid = true

    // start by checking if input and output neuron exist
    if(document.getElementById(INPUT_UUID) === null){
        dflog(warningmsg, "Missing input node.")
        valid = false
    }
    // check if input and output data is null
    if(JSON.parse(localStorage.getItem(INPUT_DAT_UUID)).data === null){ // CHANGE
        dflog(warningmsg, "Missing input file.")
        valid = false
    }
    if(document.getElementById(OUTPUT_UUID) === null){ // check output node       
        dflog(warningmsg, "Missing output node.")
        valid = false
    }
    if(JSON.parse(localStorage.getItem(OUTPUT_DAT_UUID)).data === null){ // CHANGE
        dflog(warningmsg, "Missing output file.")
        valid = false
    }
    if(!valid){
        dflog(errormsg, "Too many IO errors. Check failed.")
        return -1
    }


    // check continuity of network
    let current_uuid = INPUT_UUID
    let last_neuron_ct = -1
    while(current_uuid !== OUTPUT_UUID){
        let next_uuid = JSON.parse(localStorage.getItem(current_uuid)).dest

        if(next_uuid === null){
            dflog(warningmsg, "Broken network chain.")
            valid = false
            break // to prevent trying to access null pointer in the next iteration
        }

        if(JSON.parse(localStorage.getItem(current_uuid)).from === INPUT_UUID){
            if(JSON.parse(localStorage.getItem(current_uuid)).type === "ac"){
                dflog(warningmsg, "First layer cannot be an activation!")
                valid = false
            }
        }

        // update last neuron count
        // console.log(current_uuid, next_uuid)
        if(JSON.parse(localStorage.getItem(current_uuid)).type === "de"){
            last_neuron_ct = JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem(current_uuid)).data)).neuron
            // console.log(last_neuron_ct)
        }

        // check for repeating activations
        if(JSON.parse(localStorage.getItem(current_uuid)).type === "ac" && 
                JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem(current_uuid)).from)).type === "ac"){
            dflog(warningmsg, "Cannot have 2 or more activation in a row.")
            valid = false
        }

        current_uuid = next_uuid
    }
    
    if(JSON.parse(localStorage.getItem(OUTPUT_UUID)).from === INPUT_UUID) {
        dflog(warningmsg, "You must have at least 1 layer present in your model!")
        valid = false
    }

    if(last_neuron_ct === -1) {
        dflog(warningmsg, "Missing output layer.")
        valid = false
    }

    if(!valid){
        dflog(errormsg, "Invalid network. Check failed.")
        return -1
    }

    if(need_io){
        dflog(successmsg, "Check complete. No structural errors found. There may still be value errors.")
    } else {
        dflog(successmsg, "Check complete. No structural errors found.")
    }
    return last_neuron_ct
}

document.getElementById("check-net").addEventListener("click", (evt) => {
    dflog(defaultinput, "checknet")
    check_network(true)
})

function compile_net(){
    if(check_network(false) === -1){ // check the network first to see if it will work for compilation
        dflog(errormsg, "Compilation aborted.")
        return
    }
    
    // get the input dimensions based on file. The check will ensure that this exists.
    let input_dim = JSON.parse(localStorage.getItem(INPUT_DAT_UUID)).dimension
    
    create_model(input_dim[1])
    
    console.log("Compiled network structure by TensorFlow backend:")
    model.summary()
    dflog(successmsg, "Compilation done. You can validate the network by pressing [F12] > Console.")
}

document.getElementById("compile-net").addEventListener("click", (evt) => { // for model compilation
    dflog(defaultinput, "compnet")
    compile_net()
})

let trained = false
let kX = []; let ky = []; let ktX = []; let kty = [] 
let X = null; let y = null; let tX = null; let ty = null 
let tXarr = null; let tyarr = null;

let model = null
let lr = 0.001

function create_model(custom_input_size){
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

        if(current_node_data.type === "de"){ // if current layer is a dense layer
            // add dense layer with correct neuron count
            let layer_data = JSON.parse(localStorage.getItem(current_node_data.data))
            if(current_node_data.from === INPUT_UUID){ // check if it is the first node
                model.add(tf.layers.dense({
                    units: Number(layer_data.neuron),
                    inputShape: custom_input_size === null ? [X.shape[1]] : custom_input_size, // see if it should use the given or custom input size
                    useBias: layer_data.useBias,
                    activation: activation_code_std[layer_data.activation],
                    kernelInitializer: kernel_bias_init_code_std[layer_data.kernelinit],
                    biasInitializer: kernel_bias_init_code_std[layer_data.biasinit],
                    trainable: layer_data.trainable,
                }))
            } else { // if not, add it like normal
                model.add(tf.layers.dense({
                    units: Number(layer_data.neuron),
                    useBias: Boolean(layer_data.useBias),
                    activation: activation_code_std[layer_data.activation],
                    kernelInitializer: kernel_bias_init_code_std[layer_data.kernelinit],
                    biasInitializer: kernel_bias_init_code_std[layer_data.biasinit],
                    trainable: layer_data.trainable,
                }));
            }
        }


        if(current_node_data.type === "do"){ // if current layer is a dropout layer
            let layer_data = JSON.parse(localStorage.getItem(current_node_data.data))
            drop_rate = Number(layer_data.prob) / 100 // must convert to a percentage scale

            if(current_node_data.from === INPUT_UUID){ // check if it is the first node
                model.add(tf.layers.dropout({
                    rate: Number(drop_rate),
                    inputShape: [X.shape[1]]
                }))
            } else { // if not, add it like normal
                model.add(tf.layers.dropout({
                    rate: Number(drop_rate)
                }));
            }
        }
        
        current_uuid = next_uuid
    }
}

document.getElementById("test-net").addEventListener("click", (evt) => {
    dflog(defaultinput, "test")
    test_net_random()
})
function test_net_random(){
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
}

document.getElementById("train-net").addEventListener("click", (evt) => {
    dflog(defaultinput, "trainnet")
    train_net()
})
function train_net(){
    dflog(msg, "Attemping to train...")
    // disable btns
    document.querySelector("#train-net").disabled = true
    document.querySelector("#train-net").classList.add("disable")
    document.querySelector("#test-net").disabled = true
    document.querySelector("#test-net").classList.add("disable")

    let last_neuron_ct = check_network(true)
    if(last_neuron_ct === -1){ // complete check first
        dflog(errormsg, "Training aborted.")
        document.querySelector("#train-net").disabled = false
        document.querySelector("#train-net").classList.remove("disable")
        document.querySelector("#test-net").disabled = false
        document.querySelector("#test-net").classList.remove("disable")
        return
    }
    
    // partition data
    let training_full = JSON.parse(localStorage.getItem(INPUT_DAT_UUID)).data
    let label_full = JSON.parse(localStorage.getItem(OUTPUT_DAT_UUID)).data

    // check if training length and label length match
    
    if(training_full.length !== label_full.length){
        dflog(warningmsg, `IO length mismatch! InputLength: ${training_full}; OutputLength: ${label_full.length}`)
        document.querySelector("#train-net").disabled = false
        document.querySelector("#train-net").classList.remove("disable")
        document.querySelector("#test-net").disabled = false
        document.querySelector("#test-net").classList.remove("disable")
        dflog(errormsg, `Training aborted.`)
        return
    }
    
    dflog(successmsg, "No errors found in IO files")
    
    // start partition
    let split_index = Math.floor(training_full.length * (document.getElementById("test-part-slider").value / 100))
    dflog(debugmsg, `${split_index} testing data`)
    dflog(debugmsg, `${training_full.length-split_index} training data`)
    
    for (let i = 0; i < training_full.length-1; i++){
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
 
    // check last node"s validity
    // console.log(last_neuron_ct)
    if(Number(last_neuron_ct) !== Number(y.shape[1])){
        dflog(warningmsg, `Invalid output layer shape! Requires: [${y.shape[1]}]; recieved: [${last_neuron_ct}]`)
        document.querySelector("#train-net").disabled = false
        document.querySelector("#train-net").classList.remove("disable")
        document.querySelector("#test-net").disabled = false
        document.querySelector("#test-net").classList.remove("disable")
        dflog(errormsg, `Training aborted.`)
        return 
    }

    create_model()
    console.log("Compiled network structure by TensorFlow backend:")
    model.summary()
    dflog(successmsg, "Successfully built the network. If you would like to verify the strucutre, press [F12] > Console.")

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
    train(model, epoch, b_size, X, y, document.getElementById("test-part-slider").value / 100).then(() => dflog(successmsg, "Model Trained Successfully")) // start async function of training network
}

document.getElementById("export-net").addEventListener("click", (evt) => {
    dflog(defaultinput, "exportnet")
    export_net()
})
function export_net(){
    if(model === null){
        dflog(errormsg, "Model untrained/uncompiled. Cannot export.")
        return
    }

    let file_name = document.getElementById("networkname").value || document.getElementById("networkname").placeholder

    dflog(debugmsg, `Exporting structure file as: "${file_name}.json"`)
    dflog(debugmsg, `Exporting weights file: "${file_name}.weights.bin"`)

    model["createdBy"] = "DeepFusion-Beta-1.0"
    model.save(`downloads://${file_name}`).then(prom => {
        dflog(successmsg, "Network successfully exported.")
    })
}

document.getElementById("term-input").addEventListener("keydown", (evt) => { // TERMINAL HANDLERS
    if(evt.keyCode === 13){
        let original_command = document.getElementById("term-input").value
        let full_command = parse_cmd(original_command) // parse the command
        document.getElementById("term-input").value = "" // clear command

        // check if execution is null
        let execute = full_command[0]
        let values = full_command[1]
        let attributes = full_command[2]

        if(execute === null){
            return
        }

        // execute the command
        execute_cmd(execute, values, attributes, original_command)
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
    document.querySelector("#train-net").classList.remove("disable")
    document.querySelector("#test-net").disabled = false
    document.querySelector("#test-net").classList.remove("disable")

    dfnl()
}