// ===================== NODE ABSTRACT OBJECTS =====================

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

function sync_data_all(){
    Object.keys(all_node_obj).forEach(key => {
        all_node_obj[key].sync_data()
    })
    update_non_temp_edges() // update the edges just in case if node dimension changed
}

// ===================== NODE DOM & DATA OBJECTS =====================

function create_node(self, node_type){ // this function should create a node, its event listeners, and data.
    // check node type validness
    if(recognized_node_code.indexOf(node_type) === -1) throw `invalid node code "${node_type}"`

    // make the abstract data structure of the node first:
    let node_dat = create_node_data(null, null, false, false, self.data_uuid, node_type) // create matching node data
    if(node_type === "in"){ // different options for identifying input and output nodes
        node_dat = create_node_data(null, null, true, true, self.data_uuid, node_type)
    } else if(node_type === "ou"){ // different options for identifying input and output nodes
        node_dat = create_node_data(null, null, true, false, self.data_uuid, node_type)
    }
    // write the node to local storage
    localStorage.setItem(self.uuid,JSON.stringify(node_dat))
    // add the node to tracking object
    all_node_obj[self.uuid] = self

    
    // create html container
    let html = create_node_element(self.node_template, self.uuid)
    main_canvas.appendChild(html)

    // set its left and top properties for resizing
    document.getElementById(self.uuid).style.top = (document.getElementById(self.uuid).offsetTop) + "px";
    document.getElementById(self.uuid).style.left = (document.getElementById(self.uuid).offsetLeft) + "px";

    dragElement(document.getElementById(self.uuid)); // add element drag

    // add highlighting (visual)
    document.getElementById(`${self.uuid}header`).addEventListener("mousedown", (e) => { // event for when the node is selected
        document.querySelectorAll(".node-drag").forEach((elm) => { // reset allcurrent selected node"s selected-node class
            elm.classList.remove("selected-node")
        })

        document.getElementById(`${self.uuid}header`).classList.add("selected-node") // select this node
        document.getElementById("del-selected").disabled = false // enable option for delete

        // populate the menu
        let data = JSON.parse(localStorage.getItem( JSON.parse(localStorage.getItem(self.uuid)).data )) // get the data
        self.populate_menu(data)
    })

    // Add event to watch for edge creation
    document.getElementById(self.uuid).addEventListener("mouseover", (e) => { // when the yellow node out square is hovered over
        hovering_uuid = self.uuid // update the current hovering uuid
    })

    document.getElementById(self.uuid).addEventListener("mouseout", (e) => { // reset the hovering uuis when hover out
        hovering_uuid = null
    })

    // add edge out drag function
    if(document.getElementById(`${self.uuid}out`) !== null){ // if the node out square is enabled for the node
        document.getElementById(`${self.uuid}out`).addEventListener("mousedown", (e) => { // watch for when the square is pressed down
            document.body.style.cursor = "grabbing" // set cursor styles
            document.getElementById(`${self.uuid}out`).style.cursor = "grabbing"
    
            let outnode = document.getElementById(`${self.uuid}`)
            let outnodesq = document.getElementById(`${self.uuid}out`)

            document.querySelectorAll(".node-drag").forEach(elmnt => { // styling for node hover
                elmnt.classList.add("node-edge-dragging")
            })
            document.querySelectorAll(".node").forEach(elmnt => { // more styling
                elmnt.classList.add("node-edge-dragging-cont")
            })
    
            main_canvas.appendChild(createLine( // create a temporary edge connecting to the cursor
                outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
                outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
                outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
                outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
                "temp_edge"));
    
            edge_start_node = outnode
            edge_start_node_sq = outnodesq
    
            selected_uuid = self.uuid // set draggin UUID to outnode's uuid
        })
    }

    document.body.onmouseup = e => {
        if(document.getElementById("temp_edge") !== null) main_canvas.removeChild(document.getElementById("temp_edge"))
        // remove dragging style
        document.querySelectorAll(".node-drag").forEach(elmnt => elmnt.classList.remove("node-edge-dragging"))
        document.querySelectorAll(".node").forEach(elmnt => elmnt.classList.remove("node-edge-dragging-cont"))
        
        // check if there are any nodes that are being hovered
        // // and if it is the same as the starting node or input node
        // console.log(JSON.parse(localStorage.getItem(selected_uuid)).edge === null)
        if(selected_uuid !== null && hovering_uuid !== selected_uuid && hovering_uuid !== INPUT_UUID && hovering_uuid !== null &&
            JSON.parse(localStorage.getItem(selected_uuid)).edge === null &&
            !JSON.parse(localStorage.getItem(hovering_uuid)).connected) {
            // if not, proceed with creating a visual line
            let outnode = document.getElementById(`${selected_uuid}`)
            let outnodesq = document.getElementById(`${selected_uuid}out`)
            let innode = document.getElementById(`${hovering_uuid}`)
            let edge_uuid = "01"+uuidv4()

            main_canvas.appendChild(createLine(
                outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
                outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
                innode.offsetLeft + (innode.getBoundingClientRect().width/2)/zoom,
                innode.offsetTop + 5/zoom,
                edge_uuid));

            // add edge entry to local storage
            let edge_data = create_edge_data(selected_uuid, hovering_uuid)
            localStorage.setItem(edge_uuid,JSON.stringify(edge_data))

            // update the node"s edge, from and dest node
            let selected_node_data = JSON.parse(localStorage.getItem(selected_uuid))
            let hovering_node_data = JSON.parse(localStorage.getItem(hovering_uuid))

            //store dest and from node information
            selected_node_data.dest = hovering_uuid
            hovering_node_data.from = selected_uuid
            
            hovering_node_data.connected = true

            // store edge information
            selected_node_data.edge = edge_uuid
        
            // store them back
            localStorage.setItem(selected_uuid, JSON.stringify(selected_node_data))
            localStorage.setItem(hovering_uuid, JSON.stringify(hovering_node_data))
        }
        // clear selected node
        selected_uuid = null

        // sync data for every node
        sync_data_all()
    }

    // add edge deletion function
    if(document.getElementById(`${self.uuid}in`) !== null){ // if the node in triangle is enabled for the node
        document.getElementById(`${self.uuid}in`).addEventListener("mousedown", (e) => {
            // check if there is a from node. Continue only if there is
            if(JSON.parse(localStorage.getItem(self.uuid)).from === null) return
    
            document.body.style.cursor = "grabbing" // set cursor
            document.getElementById(`${self.uuid}in`).style.cursor = "grabbing"
    
            let node_data = JSON.parse(localStorage.getItem(self.uuid))
            let outnode = document.getElementById(`${node_data.from}`)
            let outnodesq = document.getElementById(`${node_data.from}out`)
    
            // styling
            document.querySelectorAll(".node-drag").forEach(elmnt => {
                elmnt.classList.add("node-edge-dragging")
            })
            document.querySelectorAll(".node").forEach(elmnt => {
                elmnt.classList.add("node-edge-dragging-cont")
            })

            // create temp edge
            main_canvas.appendChild(createLine(
                outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
                outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
                outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
                outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
                "temp_edge"));
    
            edge_start_node = outnode
            edge_start_node_sq = outnodesq
    
            // set draggin UUID to outnode's uuid
            selected_uuid = node_data.from
    
            // delete front node's dest and edge
            let from_node_data = JSON.parse(localStorage.getItem(node_data.from))
            from_node_data.dest = null
            // remove graphical line
            remove_edge(from_node_data.edge)
            from_node_data.edge = null
            localStorage.setItem(node_data.from, JSON.stringify(from_node_data))
            // delete this node"s from
            node_data.from = null
            node_data.connected = false
            // write it to local storage
            localStorage.setItem(self.uuid, JSON.stringify(node_data))

            // add a temp node to the mouse cursor
            let relative_middle_x = edge_start_node.offsetLeft + (edge_start_node.getBoundingClientRect().width/2)/(Math.pow(zoom,2))
            let relative_bottom_y = edge_start_node.offsetTop + (edge_start_node.getBoundingClientRect().height - edge_start_node_sq.getBoundingClientRect().height/2)/(Math.pow(zoom,2))
            let absolute_middle_x = edge_start_node_sq.getBoundingClientRect().x + (edge_start_node_sq.getBoundingClientRect().width/2)/(Math.pow(zoom,2))
            let absolute_bottom_y = edge_start_node_sq.getBoundingClientRect().y + (edge_start_node_sq.getBoundingClientRect().height/2)/(Math.pow(zoom,2))
            let offset_x = -4
            let offset_y = -7

            // delete current edge and make new edge
            main_canvas.removeChild(document.getElementById("temp_edge"))
            main_canvas.appendChild(createLine(
                relative_middle_x,
                relative_bottom_y,
                relative_middle_x - (absolute_middle_x - e.x)/(Math.pow(zoom,2)) + offset_x,
                relative_bottom_y - (absolute_bottom_y - e.y)/(Math.pow(zoom,2)) + offset_y,
                "temp_edge"));   
        })
    }
}

// deleting nodes
function delete_selected_node(){
    let htmlObject = document.querySelector(".selected-node")
    if(!htmlObject) return

    // remove node's IO node pointers from local storage
    let del_node_uuid = htmlObject.id.substring(0, htmlObject.id.length-6)
    let del_node_data = JSON.parse(localStorage.getItem(del_node_uuid)) // get the node being deleted"s data

    if(all_node_obj[del_node_uuid] !== undefined) delete all_node_obj[del_node_uuid] // delete from all_node_obj hashmap
    
    if(del_node_data.from !== null){ // check if in node exists
        // if in node exist, wipe it"s dest node and edge attribute
        let from_node_data = JSON.parse(localStorage.getItem(del_node_data.from))
        from_node_data.dest = null
        
        // remove the edge connecting TO this node
        let edge_uuid = from_node_data.edge
        // remove edge
        remove_edge(edge_uuid)

        from_node_data.edge = null // remove the edge pointer on the other side too
        localStorage.setItem(del_node_data.from, JSON.stringify(from_node_data))
    } if(del_node_data.dest !== null){ // check if dest node exists
        // if dest node exist, wipe it's dest node and edge attribute
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

    hovering_uuid = null // the node's own listener will stop functioning, so we'll have to reset it
    reset_editor_menu() // reset the editor menu

    // set delete selected to disabled
    document.getElementById("del-selected").disabled = true
}


// ===================== DYNAMIC UPDATE NODE APPEARANCE INFO =====================

function update_node_data(self, uuid, info_name, new_value, appearance_value, name="Value", affix="", prefix="", disp_info){
    // update the appearance value if requested
    if(disp_info){
        document.getElementById(uuid+"info-"+info_name).innerHTML = `${name}: ${appearance_value}${affix}` // get the element and set info text
    }

    let data_uuid = JSON.parse(localStorage.getItem(uuid)).data //get local storage 
    let new_data = JSON.parse(localStorage.getItem(data_uuid))
    new_data[info_name] = new_value
    localStorage.setItem(data_uuid, JSON.stringify(new_data))

    // execute the syncdata
    self.sync_data()

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
