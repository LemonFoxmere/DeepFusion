// Update menu sliders to the node"s display value. This is for SLIDER ELEMENTS in the menu ONLY!!!
// Note: INFO name is the SAME as the DATA name!!!


// ===================== SET NODES MENUS =====================


// ===================== UPDATE NODES MENUS =====================


function set_reshape_menu(uuid, data){
    let htmlObject = create_menu_container()
    htmlObject.innerHTML = json2html.render([{"uuid" : uuid}], RESHAPE_NODE_MENU);
    set_menu(htmlObject)
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