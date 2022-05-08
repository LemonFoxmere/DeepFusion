// set of all node objects
let all_node_obj = {
    // uuid : instance
}

function create_menu_container(){
    // create the menu html
    let htmlObject = document.createElement("div");
    htmlObject.classList.add("node-menu-container");
    return htmlObject
}

// ======================== NODE CREATION HANDLING ========================

// create input node
document.getElementById("input_node_add").addEventListener("click", (e) => {
    if(localStorage.getItem(INPUT_UUID)) return // check if it already exists

    new input_node(INPUT_UUID, INPUT_DAT_UUID, false)

    document.getElementById("input_node_add").classList.add("disable")
})

// create output node
document.getElementById("output_node_add").addEventListener("click", (e) => {
    if(localStorage.getItem(OUTPUT_UUID)) return // check if it already exists
    
    new output_node(OUTPUT_UUID, OUTPUT_DAT_UUID, false)

    // disable the input button
    document.getElementById("output_node_add").classList.add("disable")
})

// create reshape node
document.getElementById("reshape_node_add").addEventListener("click", e => new reshape_node("00"+uuidv4(), "02"+uuidv4()))  // 00 for node uuid, 02 for dat uuid

// create dense node
document.getElementById("dense_node_add").addEventListener("click", e => new dense_node("00"+uuidv4(), "02"+uuidv4()))// 00 for node uuid, 02 for dat uuid

// create activation node
document.getElementById("drop_node_add").addEventListener("click", e => new dropout_node("00"+uuidv4(), "02"+uuidv4())) // 00 for node uuid, 02 for dat uuid

// TODO: come back and add this later
// document.getElementById("act_node_add").addEventListener("click", (e) => {
//     let uuid = "00"+uuidv4()
//     create_node(uuid, ACT_NODE, "ac", set_act_menu, JSON.stringify(create_act_data("li")))

// })
// create activation node. TODO: come back and add this later