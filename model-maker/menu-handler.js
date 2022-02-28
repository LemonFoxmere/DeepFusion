// Update menu sliders to the node"s display value. This is for SLIDER ELEMENTS in the menu ONLY!!!
// Note: INFO name is the SAME as the DATA name!!!
function update_menu_slider(uuid, data_name, display_name, data_affix=""){
    { // ADDING INPUT FIELD EVENTS
        // add input field listender
        let e = document.getElementById(`${uuid}${data_name}`) //check is the dataname that is being updated even exist
        if(e === null) return
        
        // if the slider indeed exists, then set its current value
        document.getElementById(e.id + "-slider").value = JSON.parse(
            localStorage.getItem(
                JSON.parse(localStorage.getItem(uuid)).data
            )
        )[data_name]

        e.addEventListener("keypress", function (evt) {
            if (evt.which < 48 || evt.which > 57){
                evt.preventDefault();
            }
    
            if (evt.which === 13){
                e.blur()
            }
        }); // prevent unorthodox number entering
        
        e.addEventListener("focusout", (evt) => {
            if(document.getElementById(e.id + "-slider")){
                let slider = document.getElementById(e.id + "-slider")
                let max_val = slider.max
                let min_val = slider.min
                if (Number(e.value) > max_val){
                    e.value = max_val;
                } else if (Number(e.value) < min_val){
                    e.value = min_val;
                }
                slider.value = e.value
                update_node_data(e.id.substring(0,e.id.length-data_name.length), data_name, e.value, e.value, name=display_name, affix=data_affix, true)
            }
        })
    
        if(document.getElementById(e.id + "-slider")){
            e.value = document.getElementById(e.id + "-slider").value;
        }
    } { // ADDING SLIDER EVENTS
        let e = document.getElementById(`${uuid}${data_name}-slider`)
        e.onmousedown = (evt) => {
            e.onmousemove = (evt2) => {
                let slider_value = e.value
                if(document.getElementById(e.id.substring(0,e.id.length-7))){
                    document.getElementById(e.id.substring(0,e.id.length-7)).value = slider_value;
                }
                update_node_data(e.id.substring(0,e.id.length-data_name.length-7), data_name, e.value, e.value, name=display_name, affix=data_affix, true)
            }
        }
        e.onmouseup = (evt) => {
            e.onmousemove = null
        }
    }
}

function update_menu_dropdown(uuid, data_name, display_name, name_standard){
    let e = document.getElementById(`${uuid}${data_name}`) // check that is the dataname exists
    if(e === null) return

    // if the dropdown indeed exists, then set its current value
    document.getElementById(e.id).value = JSON.parse(
        localStorage.getItem(
            JSON.parse(localStorage.getItem(uuid)).data
        )
    )[data_name]

    e.onchange = (evt) => { // add the event listener
        update_node_data(e.id.substring(0,e.id.length-data_name.length), data_name, e.value, name_standard[e.value],
            name=display_name, affix="", true)
    }
}

function update_menu_toggle(uuid, data_name, display_name, toggle_functionality){
    let e = document.getElementById(`${uuid}${data_name}`) // check that is the dataname exists
    if(e === null) return

    // if the slider indeed exists, then set its current value
    document.getElementById(e.id).checked = JSON.parse(
        localStorage.getItem(
            JSON.parse(localStorage.getItem(uuid)).data
        )
    )[data_name] ? true : false

    e.onchange = (evt) => { // add the event listener
        update_node_data(e.id.substring(0,e.id.length-data_name.length), data_name, e.checked, e.checked?"Yes":"No",
            name=display_name, affix="", !toggle_functionality)
        if(toggle_functionality){
            set_node_enable_appearance(e.id.substring(0,e.id.length-data_name.length), e.checked)
        }
    }
}

// ===================== SET NODES MENUS =====================
function create_menu_container(){
    // create the menu html
    let htmlObject = document.createElement("div");
    htmlObject.classList.add("node-menu-container");
    return htmlObject
}

function set_menu(htmlObject){
    // console.log(htmlObject.innerHTML)
    // remove previous menu containers
    node_menu.removeChild(document.querySelector(".node-menu-container"));
    // add new html
    node_menu.appendChild(htmlObject)
}

// ===================== DYNAMIC UPDATE NODE APPEARANCE INFO =====================
function update_node_data(uuid, info_name, new_value, appearance_value, name="Value", affix="", disp_info){
    // update the appearance value if requested
    if(disp_info){
        document.getElementById(uuid+"info-"+info_name).innerHTML = `${name}: ${appearance_value}${affix}` // get the element and set info text
    }

    let data_uuid = JSON.parse(localStorage.getItem(uuid)).data //get local storage 
    let new_data = JSON.parse(localStorage.getItem(data_uuid))
    new_data[info_name] = new_value
    localStorage.setItem(data_uuid, JSON.stringify(new_data))

    // update edges to match new width
    update_non_temp_edges()
}
function set_node_enable_appearance(uuid, enabled){
    // update the appearance value
    if(enabled){
        document.getElementById(uuid+"header").style.filter = "brightness(1)";
    } else {
        document.getElementById(uuid+"header").style.filter = "brightness(0.5)";
    }
}

// ===================== UPDATE NODES MENUS =====================

function set_input_menu(uuid, data){ // when a node is clicked, this runs
    let htmlObject = create_menu_container()
    let name = data.name
    let dim = data.dimension
    let samples = "N/A" // this variable is for display only!
    let displaydim = "N/A  "

    if(dim !== null){ // if there exist a value, make displaydim not broken
        // style and display dimension
        displaydim = ""
        dim.forEach(e => {
            if(samples === "N/A") samples = e
            else displaydim += e + " × "
        })
    }

    htmlObject.innerHTML = json2html.render([{"file_name" : name, "samples" : samples, "dimension": displaydim.substring(0,displaydim.length-2)}], INPUT_NODE_MENU);

    set_menu(htmlObject)
    add_input_menu_events()
}
function update_input_data(name, value, dim){ // this runs when the input data is changed
    document.getElementById("inputinfo").innerHTML = `File: ${name}`
    document.getElementById("inputmenuname").innerHTML = `${name}`
    // style and display dimension
    let displaydim = ""
    let samples = "N/A" // this variable is for display only!
    try{
        dim.forEach(e => {
            if(samples === "N/A") samples = e
            else displaydim += e + " × "
        })
    } catch (e){
        displaydim = "N/A**" // the ** is for formatting and not get the message cut off at the end
        samples = "N/A" // the ** is for formatting and not get the message cut off at the end
    }
    // update the menu items
    document.getElementById("inputmenudim").innerHTML=displaydim.substring(0,displaydim.length-2)
    document.getElementById("inputmenusamples").innerHTML=samples

    let new_data = JSON.parse(localStorage.getItem(INPUT_DAT_UUID))
    new_data.name = name // store name in local storage
    new_data.data = value // store value in local storage
    new_data.dimension = dim // store dimension in local storage
    
    localStorage.setItem(INPUT_DAT_UUID, JSON.stringify(new_data))

    // update edges to match new width
    update_non_temp_edges()
}


function set_output_menu(uuid, data){
    let htmlObject = create_menu_container()
    let name = data.name
    let dim = data.dimension
    let samples = "N/A" // this variable is for display only!
    let displaydim = "N/A  "

    if(dim !== null){ // if there exist a value, make displaydim not broken
        // style and display dimension
        displaydim = ""
        dim.forEach(e => {
            if(samples === "N/A") samples = e
            else displaydim += e + " × "
        })
    }

    htmlObject.innerHTML = json2html.render([{"file_name" : name, "samples" : samples, "dimension": displaydim.substring(0,displaydim.length-2)}], OUTPUT_NODE_MENU);

    set_menu(htmlObject)
    add_output_menu_events()
}
function update_output_data(name, value, dim){
    document.getElementById("outputinfo").innerHTML = `File: ${name}`
    document.getElementById("outputmenuname").innerHTML = `${name}`
    // style and display dimension
    let displaydim = ""
    let samples = "N/A" // this variable is for display only!
    try{
        dim.forEach(e => {
            if(samples === "N/A") samples = e
            else displaydim += e + " × "
        })
    } catch (e){
        displaydim = "N/A**" // the ** is for formatting and not get the message cut off at the end
        samples = "N/A" // the ** is for formatting and not get the message cut off at the end
    }
    // update the menu items
    document.getElementById("outputmenudim").innerHTML=displaydim.substring(0,displaydim.length-2)
    document.getElementById("outputmenusamples").innerHTML=samples

    let new_data = JSON.parse(localStorage.getItem(OUTPUT_DAT_UUID))
    new_data.name = name // store name in local storage
    new_data.data = value // store value in local storage
    new_data.dimension = dim // store dimension in local storage

    localStorage.setItem(OUTPUT_DAT_UUID, JSON.stringify(new_data))
    
        // update edges to match new width
        update_non_temp_edges()
}

function set_reshape_menu(uuid, data){
    let htmlObject = create_menu_container()
    htmlObject.innerHTML = json2html.render([{"uuid" : uuid}], RESHAPE_NODE_MENU);
    set_menu(htmlObject)
}

function set_dense_menu(uuid, data){
    let htmlObject = create_menu_container()
    htmlObject.innerHTML = json2html.render([{"uuid" : uuid}], DENSE_NODE_MENU);
    set_menu(htmlObject)
  
    // add event listeners for all the sliders and controls
    update_menu_slider(uuid, "neuron", "Neurons") // the neuron slider
    update_menu_dropdown(uuid, "activation", "Activation", activation_name_std) // the activation selection
    update_menu_dropdown(uuid, "kernelinit", "Kernel Init", kernel_bias_init_name_std) // the activation selection
    update_menu_dropdown(uuid, "biasinit", "Bias Init", kernel_bias_init_name_std) // the activation selection
    update_menu_toggle(uuid, "usebias", "Using Bias", false) // the toggle switch
    update_menu_toggle(uuid, "trainable", "", true) // the toggle switch
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