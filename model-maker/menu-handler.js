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

// ===================== DYNAMIC UPDATE NODE APPEARANCE INFO =====================
function update_node_data(uuid, info_name, new_value, appearance_value, name="Value", affix=""){
    // update the appearance value
    document.getElementById(uuid+'info-'+info_name).innerHTML = `${name}: ${appearance_value}${affix}` // get the element and set info text

    let data_uuid = JSON.parse(localStorage.getItem(uuid)).data //get local storage 
    let new_data = JSON.parse(localStorage.getItem(data_uuid))
    new_data[info_name] = new_value
    localStorage.setItem(data_uuid, JSON.stringify(new_data))
}

// ===================== UPDATE NODES MENUS =====================

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
  
    // add event listeners for all the sliders and controls
    update_menu_slider(uuid, "neuron", "Neurons") // the neuron slider
    update_menu_dropdown(uuid, "activation", "Activation") // the activation selection
    update_menu_toggle(uuid, "usebias", "Using Bias") // the toggle switch
}



function set_act_menu(uuid, data){
    let htmlObject = create_menu_container()
    let value = data.value
    // console.log(value)
    htmlObject.innerHTML = json2html.render([{"uuid" : uuid, "value" : value}], ACT_NODE_MENU);
    set_menu(htmlObject)

    // add event listeners for all the sliders and controls
    update_menu_dropdown(uuid, "activation", "Activation") // the main activation selection
}



function set_drop_menu(uuid, data){
    let htmlObject = create_menu_container()
    let chance = data.chance
    htmlObject.innerHTML = json2html.render([{"uuid" : uuid, "chance" : chance}], DROP_NODE_MENU);
    set_menu(htmlObject)
    document.getElementById(`${uuid}prob-slider`).value = chance // update value
    
    // add event listeners for all the sliders and controls
    update_menu_slider(uuid, "prob", "Probability", "%") // the probability slider
}