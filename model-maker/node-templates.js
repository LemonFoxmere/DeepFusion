// ===================== NODE DATA =====================
function create_io_data(name, data, dim){
    return {
        "name" : name,
        "data" : data,
        "dimension" : dim,
    }    
}

function create_dense_data(neuron_ct, activation, usebias){
    return {
        "neuron" : neuron_ct,
        "activation" : activation,
        "usebias" : usebias
    }    
}

function create_act_data(type){
    return {
        "activation" : type,
    }    
}

function create_drop_data(perc){
    return {
        "prob" : perc,
    }    
}

// ===================== NODE OBJECT DATA =====================

function create_edge_data(input, dest){
    return {
        "input" : input,
        "dest" : dest
    }
}

// define node jsons
function create_node_data(from, dest, is_edge, is_start, data, type){
    return {
        "from" : from,
        "dest" : dest,
        "is_edge" : is_edge,
        "is_start" : is_start,
        "connected" : false,
        "data" : data,
        "type" : type,
        "edge" : null
    }
}


// ===================== NODES =====================
const INPUT_NODE = [
    {
        "<>" : "div",
        "class" : "node-drag",
        "id" : "${id_tag}header",
        "html": [{ // display node title
                "<>" : "h3",
                "class" : "unselectable node-title",
                "style" : "cursor:move",
                "text" : "Input"
            }, { // horizontal line
                "<>" : "hr"
            }, { // status
                "<>" : "p",
                "id" : "inputinfo",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : "No File Added"
            }, { // horizontal line
                "<>" : "hr"
            }, { // display node display
                "<>" : "p",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : "Click To Add/Modify"
            }, { // more display 
                "<>" : "p",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : "Training Input"
            }]
    }, { // node out
        "<>" : "div",
        "class" : "node-out",
        "id" : "${id_tag}out"
    }
]

const OUTPUT_NODE = [
    { // node in triangle
        "<>" : "div",
        "class" : "node-in",
        "id" : "${id_tag}in"
    }, {
        "<>" : "div",
        "class" : "node-drag",
        "id" : "${id_tag}header",
        "html": [{ // display node title
                "<>" : "h3",
                "class" : "unselectable node-title",
                "style" : "cursor:move",
                "text" : "Output"
            }, { // horizontal line
                "<>" : "hr"
            }, { // status
                "<>" : "p",
                "id" : "outputinfo",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : " No File Added"
            }, { // horizontal line
                "<>" : "hr"
            }, { // display node display
                "<>" : "p",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : "Click To Add/Modify"
            }, { // more display 
                "<>" : "p",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : "Training Output"
            }]
    }
]

const DENSE_NODE = [
    { // node in triangle
        "<>" : "div",
        "class" : "node-in",
        "id" : "${id_tag}in"
    }, {
        "<>" : "div",
        "class" : "node-drag",
        "id" : "${id_tag}header",
        "html": [{ // display node title
                "<>" : "h3",
                "class" : "unselectable node-title",
                "style" : "cursor:move",
                "text" : "Dense"
            }, { // horizontal line
                "<>" : "hr"
            }, { // display node info 1
                "<>" : "p",
                "id" : "${id_tag}info-neuron",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "text" : "Neurons: 10"
            }, { // display node info 2
                "<>" : "p",
                "id" : "${id_tag}info-activation",
                "class" : "unselectable node-text",
                "style" : "cursor:move; margin-top:0.2rem",
                "text" : "Activation: Linear"
            }, { // display node info 3
                "<>" : "p",
                "id" : "${id_tag}info-usebias",
                "class" : "unselectable node-text",
                "style" : "cursor:move; margin-top:0.2rem",
                "text" : "Using Bias: Yes"
            }, { // display node info 4
                "<>" : "p",
                "id" : "${id_tag}info-kernelinit",
                "class" : "unselectable node-text",
                "style" : "cursor:move; margin-top:0.2rem",
                "text" : "Kernel Init Glorot Uniform"
            }, { // display node info 5
                "<>" : "p",
                "id" : "${id_tag}info-biasinit",
                "class" : "unselectable node-text",
                "style" : "cursor:move; margin-top:0.2rem",
                "text" : "Bias Init: Glorot Uniform"
            }, { // horizontal line
                "<>" : "hr"
            }, { // status
                "<>" : "p",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : "Click To Modify"
            }]
    }, { // node out
        "<>" : "div",
        "class" : "node-out",
        "id" : "${id_tag}out"
    }
]

const ACT_NODE = [
    { // node in triangle
        "<>" : "div",
        "class" : "node-in",
        "id" : "${id_tag}in"
    }, {
        "<>" : "div",
        "class" : "node-drag",
        "id" : "${id_tag}header",
        "html": [{ // display node title
                "<>" : "h3",
                "class" : "unselectable node-title",
                "style" : "cursor:move",
                "text" : "Activation"
            }, { // horizontal line
                "<>" : "hr"
            }, { // display node display
                "<>" : "p",
                "id" : "${id_tag}info-activation",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : "Type: Linear"
            }, { // horizontal line
                "<>" : "hr"
            }, { // status
                "<>" : "p",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : "Click To Modify"
            }]
    }, { // node out
        "<>" : "div",
        "class" : "node-out",
        "id" : "${id_tag}out"
    }
]

const DROP_NODE = [
    { // node in triangle
        "<>" : "div",
        "class" : "node-in",
        "id" : "${id_tag}in"
    }, {
        "<>" : "div",
        "class" : "node-drag",
        "id" : "${id_tag}header",
        "html": [{ // display node title
                "<>" : "h3",
                "class" : "unselectable node-title",
                "style" : "cursor:move",
                "text" : "Dropout"
            }, { // horizontal line
                "<>" : "hr"
            }, { // display node display
                "<>" : "p",
                "id" : "${id_tag}info-prob",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : "Probability: 0%"
            }, { // horizontal line
                "<>" : "hr"
            }, { // status
                "<>" : "p",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : "Click To Modify"
            }]
    }, { // node out
        "<>" : "div",
        "class" : "node-out",
        "id" : "${id_tag}out"
    }
]