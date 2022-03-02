function create_menu_container(){
    // create the menu html
    let htmlObject = document.createElement("div");
    htmlObject.classList.add("node-menu-container");
    return htmlObject
}

// ===================== DYNAMIC UPDATE NODE APPEARANCE INFO =====================

function update_node_data(uuid, info_name, new_value, appearance_value, name="Value", affix="", prefix="", disp_info){
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

// ======================== NODE CREATION HANDLING ========================

// create input node
document.getElementById("input_node_add").addEventListener("click", (e) => {
    if(localStorage.getItem(INPUT_UUID)) return // check if it already exists

    new input_node(INPUT_UUID, INPUT_DAT_UUID)

    document.getElementById("input_node_add").classList.add("disable")
})

// create output node
document.getElementById("output_node_add").addEventListener("click", (e) => {
    if(localStorage.getItem(OUTPUT_UUID)) return // check if it already exists
    
    new output_node(OUTPUT_UUID, OUTPUT_DAT_UUID)

    // disable the input button
    document.getElementById("output_node_add").classList.add("disable")
})

// create reshape node
document.getElementById("reshape_node_add").addEventListener("click", (e) => {
    let uuid = "00"+uuidv4()
    create_node(uuid, RESHAPE_NODE, "re", set_reshape_menu, JSON.stringify(create_reshape_data([64,64])))
})

// create dense node
document.getElementById("dense_node_add").addEventListener("click", (e) => {
    let uuid = "00"+uuidv4()
    create_node(uuid, DENSE_NODE, "de", set_dense_menu, JSON.stringify(create_dense_data(10, "li", true, true, "gln", "zer")))
})

{
// TODO: come back and add this later
// document.getElementById("act_node_add").addEventListener("click", (e) => {
//     let uuid = "00"+uuidv4()
//     create_node(uuid, ACT_NODE, "ac", set_act_menu, JSON.stringify(create_act_data("li")))

// })
} // create activation node. TODO: come back and add this later

// create activation node
document.getElementById("drop_node_add").addEventListener("click", (e) => {
    let uuid = "00"+uuidv4()
    create_node(uuid, DROP_NODE, "do", set_drop_menu, JSON.stringify(create_drop_data(0)))
})