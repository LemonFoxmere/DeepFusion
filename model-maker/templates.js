// ===================== NODE DATA =====================
function create_io_data(name, data){
    return {
        "name" : name,
        "data" : data,
    }    
}

// store empty input and output file data
localStorage.setItem(INPUT_DAT_UUID, JSON.stringify(create_io_data("No Input Files", null)))
localStorage.setItem(OUTPUT_DAT_UUID, JSON.stringify(create_io_data("No Output Files", null)))

function create_dense_data(neuron_ct){
    return {
        "neuron_ct" : neuron_ct,
    }    
}

function create_act_data(type){
    return {
        "value" : type,
    }    
}

function create_drop_data(perc){
    return {
        "chance" : perc,
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
            }, { // display node display
                "<>" : "p",
                "id" : "${id_tag}info",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : "Neurons: 10"
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
                "id" : "${id_tag}info",
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
                "id" : "${id_tag}info",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : "Prob: 0%"
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



// ===================== NODES MENUS =====================
// <input id="training-input" type="file" name="name" style="display: none;" />
// onclick="document.querySelector('#training-input').click();
const INPUT_NODE_MENU = [ // file_name
    {
        "<>" : "h3",
        "style" : "margin-bottom:1%",
        "html" : "Input File"
    },{
        "<>" : "hr",
        "style" : "width: 80%; opacity:0.3; color: white",
    },{
        "<>" : "button",
        "class" : "absolute-btn",
        "id" : "input-upload",
        "style" : "margin-top:2%",
        "html" : [
            {
                "<>" : "p",
                "class" : "unselectable section-text",
                "text" : "Upload Training Input",
            }
        ],
    },{
        "<>" : "input",
        "id" : "input-file",
        "type" : "file",
        "style" : "display:none",  
    },{
        "<>" : "hr",
        "style" : "width: 30%; opacity:0.3; color: white",
    },{
        "<>" : "section",
        "style" : "width: 85%; display:flex; alight-items:flex-start; flex-direction:column",
        "html" : [ 
            {
                "<>" : "p",
                "style" : "font-weight:300",
                "text" : "Current File:",
            }, {
                "<>" : "p",
                "id" : "inputmenuname",
                "style" : "font-weight:500; opacity:0.6",
                "text" : "${file_name}",
            },
            // {
            //     "<>" : "p",
            //     "style" : "font-weight:300",
            //     "text" : "Data Shape:",
            // }, {
            //     "<>" : "p",
            //     "style" : "font-weight:500; opacity:0.6",
            //     "text" : "${shape}",
            // }
        ],
    }
]

const OUTPUT_NODE_MENU = [ // file_name
    {
        "<>" : "h3",
        "style" : "margin-bottom:1%",
        "html" : "Output File"
    },{
        "<>" : "hr",
        "style" : "width: 80%; opacity:0.3; color: white",
    },{
        "<>" : "button",
        "class" : "absolute-btn",
        "id" : "output-upload",
        "style" : "margin-top:2%",
        "html" : [
            {
                "<>" : "p",
                "class" : "unselectable section-text",
                "text" : "Upload Training Output",
            }
        ],
    },{
        "<>" : "input",
        "id" : "output-file",
        "type" : "file",
        "style" : "display:none",
    },{
        "<>" : "hr",
        "style" : "width: 30%; opacity:0.3; color: white",
    },{
        "<>" : "section",
        "style" : "width: 85%; display:flex; alight-items:flex-start; flex-direction:column",
        "html" : [ 
            {
                "<>" : "p",
                "style" : "font-weight:300",
                "text" : "Current File:",
            }, {
                "<>" : "p",
                "id" : "outputmenuname",
                "style" : "font-weight:500; opacity:0.6",
                "text" : "${file_name}",
            },
            // {
            //     "<>" : "p",
            //     "style" : "font-weight:300",
            //     "text" : "Data Shape:",
            // }, {
            //     "<>" : "p",
            //     "style" : "font-weight:500; opacity:0.6",
            //     "text" : "${shape}",
            // }
        ],
    }
]

const DENSE_NODE_MENU = [ // uuid, neuronct
    {
        "<>" : "h3",
        "style" : "margin-bottom:1%",
        "html" : "Dense Layer"
    },{
        "<>" : "hr",
        "style" : "width: 80%; opacity:0.3; color: white",
    },{
        "<>" : "section",
        "class" : "input-parent-container",
        "html" : [
            {
                "<>" : "p",
                "class" : "unselectable section-text",
                "text" : "Neuron Count:",
            },{ // slider 1
                "<>" : "section",
                "class" : "slider-container",
                "html" : [
                    {
                        "<>" : "input",
                        "type" : "range",
                        "min" : "1",
                        "max" : "200",
                        "value" : "${neuronct}",
                        "class" : "slider",
                        "id" : "${uuid}data-slider",
                    }, {
                        "<>" : "input",
                        "type" : "number",
                        "class" : "number-box",
                        "id" : "${uuid}data",
                    }
                ],
            }
        ],
    },
]

const ACT_NODE_MENU = [ // uuid, value
    {
        "<>" : "h3",
        "style" : "margin-bottom:1%",
        "html" : "Activation Layer"
    },{
        "<>" : "hr",
        "style" : "width: 80%; opacity:0.3; color: white",
    },{
        "<>" : "section",
        "class" : "input-parent-container",
        "html" : [
            {
                "<>" : "p",
                "class" : "unselectable section-text",
                "text" : "Activation:",
            },{
                "<>" : "select",
                "id" : "${uuid}data",
                "class" : "actiavtion-selector",
                "style" : "margin-top:3%",
                "html" : [ // all the options
                    {
                        "<>" : "option",
                        "value" : "li",
                        "text" : "Linear", 
                    },{
                        "<>" : "option",
                        "value" : "si",
                        "text" : "Sigmoid", 
                    },{
                        "<>" : "option",
                        "value" : "re",
                        "text" : "Relu", 
                    },{
                        "<>" : "option",
                        "value" : "se",
                        "text" : "Selu", 
                    },{
                        "<>" : "option",
                        "value" : "so",
                        "text" : "Softmax", 
                    },{
                        "<>" : "option",
                        "value" : "ta",
                        "text" : "Tanh", 
                    },{
                        "<>" : "option",
                        "value" : "el",
                        "text" : "Elu", 
                    },
                ],
            }
        ],
    },
]

const DROP_NODE_MENU = [ // nothing yet
    {
        "<>" : "h3",
        "style" : "margin-bottom:1%",
        "html" : "Dropout Layer"
    },{
        "<>" : "hr",
        "style" : "width: 80%; opacity:0.3; color: white",
    },{
        "<>" : "section",
        "class" : "input-parent-container",
        "html" : [
            {
                "<>" : "p",
                "class" : "unselectable section-text",
                "text" : "This node is currently being worked on.",
            },{
                "<>" : "p",
                "style" : "margin-top:5%; font-weight:200",
                "class" : "unselectable section-text",
                "text" : "You can add this node if you would like to, but it will be ignored.",
            },{
                "<>" : "img",
                "style" : "margin-top:15%",
                "src" : "../applecat.gif",
                "alt" : "coming soon bois",
                "width" : "100%"
            }
        ],
    },
]

const DEFAULT_NODE_MENU = [{
    "<>" : "p",
    "html" : "Click on a node to edit it"
}]

// ===================== SET NODES MENUS =====================

function create_menu_container(){
    // create the menu html
    let htmlObject = document.createElement('div');
    htmlObject.classList.add('node-menu-container');
    return htmlObject
}

function set_menu(htmlObject){
    // console.log(htmlObject.innerHTML)
    // remove previous menu containers
    node_menu.removeChild(document.querySelector('.node-menu-container'));
    // add new html
    node_menu.appendChild(htmlObject)
}



function set_input_menu(uuid, data){
    let htmlObject = create_menu_container()
    let name = data.name
    htmlObject.innerHTML = json2html.render([{"file_name" : name}], INPUT_NODE_MENU);
    set_menu(htmlObject)
    add_input_menu_events()
}
function update_input_data(name, value){
    document.getElementById('inputinfo').innerHTML = `File: \"${name}\"`
    document.getElementById('inputmenuname').innerHTML = `${name}`

    let new_data = JSON.parse(localStorage.getItem(INPUT_DAT_UUID))
    new_data.name = name
    new_data.data = value
    localStorage.setItem(INPUT_DAT_UUID, JSON.stringify(new_data))
}



function set_output_menu(uuid, data){
    let htmlObject = create_menu_container()
    let name = data.name
    htmlObject.innerHTML = json2html.render([{"file_name" : name}], OUTPUT_NODE_MENU);
    set_menu(htmlObject)
    add_output_menu_events()
}
function update_output_data(name, value){
    document.getElementById('outputinfo').innerHTML = `File: \"${name}\"`
    document.getElementById('outputmenuname').innerHTML = `${name}`

    let new_data = JSON.parse(localStorage.getItem(OUTPUT_DAT_UUID))
    new_data.name = name
    new_data.data = value
    localStorage.setItem(OUTPUT_DAT_UUID, JSON.stringify(new_data))
}


function set_dense_menu(uuid, data){
    let htmlObject = create_menu_container()
    let neuron_ct = data.neuron_ct
    htmlObject.innerHTML = json2html.render([{"uuid" : uuid, "neuronct" : neuron_ct}], DENSE_NODE_MENU);
    set_menu(htmlObject)

    document.getElementById(`${uuid}data-slider`).value = neuron_ct // update value
    add_dense_menu_events(uuid)
}
function update_dense_data(uuid, new_value){
    document.getElementById(uuid+'info').innerHTML = `Neurons: ${new_value}`
    let data_uuid = JSON.parse(localStorage.getItem(uuid)).data
    let new_data = JSON.parse(localStorage.getItem(data_uuid))
    new_data.neuron_ct = new_value
    localStorage.setItem(data_uuid, JSON.stringify(new_data))
}



function set_act_menu(uuid, data){
    let htmlObject = create_menu_container()
    let value = data.value
    // console.log(value)
    htmlObject.innerHTML = json2html.render([{"uuid" : uuid, "value" : value}], ACT_NODE_MENU);
    set_menu(htmlObject)
    document.getElementById(`${uuid}data`).value = value // update value
    add_activation_menu_events(uuid)
}
function update_act_data(uuid, new_value){
    document.getElementById(uuid+'info').innerHTML = `Type: ${activation_name_std[new_value]}`
    let data_uuid = JSON.parse(localStorage.getItem(uuid)).data
    let new_data = JSON.parse(localStorage.getItem(data_uuid))
    new_data.value = new_value
    localStorage.setItem(data_uuid, JSON.stringify(new_data))
}



function set_drop_menu(uuid, data){
    let htmlObject = create_menu_container()
    htmlObject.innerHTML = json2html.render([{}], DROP_NODE_MENU);
    set_menu(htmlObject)
}