// create nodes
function create_node(uuid, template, node_type, set_node_template=null, default_data){
    // check node type validness
    if(recognized_node_code.indexOf(node_type) === -1) throw `invalid node code "${node_type}"`

    // create html element
    let html = create_node_element(template, uuid)
    main_canvas.appendChild(html)

    // set its left and top properties for resizing
    document.getElementById(uuid).style.top = (document.getElementById(uuid).offsetTop) + "px";
    document.getElementById(uuid).style.left = (document.getElementById(uuid).offsetLeft) + "px";

    dragElement(document.getElementById(uuid)); // add element drag

    // add file name updating
    if(node_type === "in"){
        document.getElementById(`inputinfo`).innerHTML = `File: ${JSON.parse(localStorage.getItem(INPUT_DAT_UUID)).name}`
    } if(node_type === "ou"){
        document.getElementById(`outputinfo`).innerHTML = `File: ${JSON.parse(localStorage.getItem(OUTPUT_DAT_UUID)).name}`
    }

    // add highlighting
    document.getElementById(`${uuid}header`).addEventListener("mousedown", (e) => {
        document.querySelectorAll(".node-drag").forEach((elm) => { // reset allcurrent selected node"s selected-node class
            elm.classList.remove("selected-node")
        })

        document.getElementById(`${uuid}header`).classList.add("selected-node")
        document.getElementById("del-selected").disabled = false // enable option for delete

        // set the menu
        if(set_node_template !== null){
            let data = JSON.parse(localStorage.getItem( JSON.parse(localStorage.getItem(uuid)).data )) // get the data
            set_node_template(uuid, data)
        }
    })

    // EDGE CREATION START
    document.getElementById(uuid).addEventListener("mouseover", (e) => {
        hovering_uuid = uuid
    })

    document.getElementById(uuid).addEventListener("mouseout", (e) => {
        hovering_uuid = null
    })

    // add node out drag function
    if(node_type !== "ou"){
        document.getElementById(`${uuid}out`).addEventListener("mousedown", (e) => {
            document.body.style.cursor = "grabbing"
            document.getElementById(`${uuid}out`).style.cursor = "grabbing"
    
            let outnode = document.getElementById(`${uuid}`)
            let outnodesq = document.getElementById(`${uuid}out`)

            document.querySelectorAll(".node-drag").forEach(elmnt => {
                elmnt.classList.add("node-edge-dragging")
            })
            document.querySelectorAll(".node").forEach(elmnt => {
                elmnt.classList.add("node-edge-dragging-cont")
            })
    
            main_canvas.appendChild(createLine(
                outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
                outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
                outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
                outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
                "temp_edge"));
    
            edge_start_node = outnode
            edge_start_node_sq = outnodesq
    
            // set draggin UUID to outnode"s uuid
            selected_uuid = uuid
        })
    }

    // add node deletion function
    if(node_type !== "in"){
        document.getElementById(`${uuid}in`).addEventListener("mousedown", (e) => {
            // check if there is a from node. Continue only if there is
            if(JSON.parse(localStorage.getItem(uuid)).from === null) return
    
            document.body.style.cursor = "grabbing" // set cursor
            document.getElementById(`${uuid}in`).style.cursor = "grabbing"
    
            let node_data = JSON.parse(localStorage.getItem(uuid))
            let outnode = document.getElementById(`${node_data.from}`)
            let outnodesq = document.getElementById(`${node_data.from}out`)
    
            document.querySelectorAll(".node-drag").forEach(elmnt => {
                elmnt.classList.add("node-edge-dragging")
            })
            document.querySelectorAll(".node").forEach(elmnt => {
                elmnt.classList.add("node-edge-dragging-cont")
            })

            main_canvas.appendChild(createLine(
                outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
                outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
                outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
                outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
                "temp_edge"));
    
            edge_start_node = outnode
            edge_start_node_sq = outnodesq
    
            // set draggin UUID to outnode"s uuid
            selected_uuid = node_data.from
    
            // delete front node"s dest and edge
            let from_node_data = JSON.parse(localStorage.getItem(node_data.from))
            from_node_data.dest = null
            // remove graphical line
            remove_edge(from_node_data.edge)
            from_node_data.edge = null
            localStorage.setItem(node_data.from, JSON.stringify(from_node_data))
            // delete this node"s from
            node_data.from = null
            node_data.connected = false
            // write it
            localStorage.setItem(uuid, JSON.stringify(node_data))

            // add a temp node to the mouse cursor
            let relative_middle_x = edge_start_node.offsetLeft + (edge_start_node.getBoundingClientRect().width/2)/zoom
            let relative_bottom_y = edge_start_node.offsetTop + (edge_start_node.getBoundingClientRect().height - edge_start_node_sq.getBoundingClientRect().height/2)/zoom
            let absolute_middle_x = edge_start_node_sq.getBoundingClientRect().x + (edge_start_node_sq.getBoundingClientRect().width/2)/zoom
            let absolute_bottom_y = edge_start_node_sq.getBoundingClientRect().y + (edge_start_node_sq.getBoundingClientRect().height/2)/zoom
            let offset_x = -4
            let offset_y = -7

            // delete current edge and make new edge
            main_canvas.removeChild(document.getElementById("temp_edge"))
            main_canvas.appendChild(createLine(
                relative_middle_x,
                relative_bottom_y,
                relative_middle_x - (absolute_middle_x - e.x)/zoom + offset_x,
                relative_bottom_y - (absolute_bottom_y - e.y)/zoom + offset_y,
                "temp_edge"));   
        })
    }

    // EDGE CREATION END

    // create data based on type (only if it is not an input or output)
    
    let data_uuid = "02"+uuidv4()
    if(default_data !== null){
        let data_string = JSON.stringify(default_data)
        localStorage.setItem(data_uuid, default_data)
    }

    // create matching node data
    let node_dat = create_node_data(null, null, false, false, data_uuid, node_type)
    if(node_type === "in"){
        node_dat = create_node_data(null, null, true, true, INPUT_DAT_UUID, node_type)
    } else if(node_type === "ou"){
        node_dat = create_node_data(null, null, true, false, OUTPUT_DAT_UUID, node_type)
    }

    // create a node value in local storage
    localStorage.setItem(uuid,JSON.stringify(node_dat))
}

// deleting nodes
function delete_selected_node(){
    let htmlObject = document.querySelector(".selected-node")
    if(!htmlObject) return

    // remove node"s IO node pointers from local storage
    let del_node_uuid = htmlObject.id.substring(0, htmlObject.id.length-6)
    let del_node_data = JSON.parse(localStorage.getItem(del_node_uuid)) // get the node being deleted"s data
    
    if(del_node_data.from !== null){ // check if input node exists
        // if input node exist, wipe it"s dest node and edge attribute
        let from_node_data = JSON.parse(localStorage.getItem(del_node_data.from))
        from_node_data.dest = null
        
        // remove the edge connecting TO this node
        let edge_uuid = from_node_data.edge
        // remove edge
        remove_edge(edge_uuid)

        from_node_data.edge = null // remove the edge pointer on the other side too
        localStorage.setItem(del_node_data.from, JSON.stringify(from_node_data))
    } if(del_node_data.dest !== null){ // check if dest node exists
        // if input node exist, wipe it"s dest node and edge attribute
        let to_node_data = JSON.parse(localStorage.getItem(del_node_data.dest))
        to_node_data.from = null
        to_node_data.connected = false

        // remove the edge connecting TO this node
        let edge_uuid = del_node_data.edge
        // remove edge
        remove_edge(edge_uuid)

        del_node_data.edge = null
        localStorage.setItem(del_node_data.dest, JSON.stringify(to_node_data))
    }

    if(del_node_uuid === INPUT_UUID) document.getElementById("input_node_add").classList.remove("disable")
    if(del_node_uuid === OUTPUT_UUID) document.getElementById("output_node_add").classList.remove("disable")

    // remove linked data
    if(del_node_data.type !== "ou" && del_node_data.type !== "in"){
        localStorage.removeItem(del_node_data.data)
    }

    //remove node element from local storage
    localStorage.removeItem(del_node_uuid)
    main_canvas.removeChild(document.getElementById(del_node_uuid))

    hovering_uuid = null // the node"s own listener will stop functioning, so we"ll have to reset it
    reset_editor_menu() // reset the editor menu

    // set delete selected to disabled
    document.getElementById("del-selected").disabled = true
}

// create input node
document.getElementById("input_node_add").addEventListener("click", (e) => {
    if(localStorage.getItem(INPUT_UUID)) return // check if it already exists

    create_node(INPUT_UUID, INPUT_NODE, "in", set_input_menu, null)

    // disable the input button
    document.getElementById("input_node_add").classList.add("disable")
})

// create output node
document.getElementById("output_node_add").addEventListener("click", (e) => {
    if(localStorage.getItem(OUTPUT_UUID)) return // check if it already exists
    
    create_node(OUTPUT_UUID, OUTPUT_NODE, "ou", set_output_menu, null)

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

// create activation node
// TODO: come back and add this later
// document.getElementById("act_node_add").addEventListener("click", (e) => {
//     let uuid = "00"+uuidv4()
//     create_node(uuid, ACT_NODE, "ac", set_act_menu, JSON.stringify(create_act_data("li")))

// })

// create activation node
document.getElementById("drop_node_add").addEventListener("click", (e) => {
    let uuid = "00"+uuidv4()
    create_node(uuid, DROP_NODE, "do", set_drop_menu, JSON.stringify(create_drop_data(0)))
})