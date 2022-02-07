// constant UUID init
const INPUT_UUID = "006e9328d7-7b71-4af8-8b70-1b4c8cd2a708"
const INPUT_DAT_UUID = "026e9328d7-7b71-4af8-8b70-1b4c8cd2a708"
const OUTPUT_UUID = "00dde3a704-50f9-4b74-a641-57720cbb5c0e"
const OUTPUT_DAT_UUID = "02dde3a704-50f9-4b74-a641-57720cbb5c0e"

let main_canvas = document.getElementById("main-canvas")
let base_canvas = document.getElementById("base-canvas")
let node_menu = document.getElementById("node-editor")
let edge_start_node = null
let edge_start_node_sq = null

let hovering_uuid = null
let selected_uuid = null

// store previous session"s input and output
// let prev_session_input = localStorage.getItem(INPUT_DAT_UUID)
// let prev_session_output = localStorage.getItem(OUTPUT_DAT_UUID)

let previous_input = localStorage.getItem(INPUT_DAT_UUID)
let previous_output = localStorage.getItem(OUTPUT_DAT_UUID)
let restore_input = null
let restore_output = null
try{
    restore_input = JSON.parse(localStorage.getItem(INPUT_DAT_UUID)).data != null
    restore_output = JSON.parse(localStorage.getItem(OUTPUT_DAT_UUID)).data != null
    localStorage.clear()
} catch (err){
    // if nothing exists, clear everything
    localStorage.clear()
}

if(restore_input){ // restore the input
    localStorage.setItem(INPUT_DAT_UUID, previous_input)

    create_node(INPUT_UUID, INPUT_NODE, "in", set_input_menu, null)
    document.getElementById("input_node_add").classList.add("disable")
    if(restore_output){ // shift it to the left a bit if the output also exist
        document.getElementById(INPUT_UUID).style.left = `${document.getElementById(INPUT_UUID).offsetLeft-100}px`
    }
    dflog(supportmsg, "Successfully restored input file.")
} else {
    // store empty input and output file data
    localStorage.setItem(INPUT_DAT_UUID, JSON.stringify(create_io_data("No Input Files", null, null)))
    console.warn("No input data to be recovered. This message can be ignored.")
}

if(restore_output){ // restore the output
    localStorage.setItem(OUTPUT_DAT_UUID, previous_output)
    create_node(OUTPUT_UUID, OUTPUT_NODE, "ou", set_output_menu, null)
    document.getElementById("output_node_add").classList.add("disable")
    if(restore_input){ // shift it to the left a bit if the output also exist
        document.getElementById(OUTPUT_UUID).style.left = `${document.getElementById(OUTPUT_UUID).offsetLeft+100}px`
    }
    dflog(supportmsg, "Successfully restored output file.")
} else {
    localStorage.setItem(OUTPUT_DAT_UUID, JSON.stringify(create_io_data("No Output Files", null, null)))
    console.warn("No output data to be recovered. This message can be ignored.")
}

// warn user of reload
// window.onbeforeunload = function() {
//     return "Data will be lost if you leave the page, are you sure?";
// };

// update edges at resize
window.onresize = update_non_temp_edges

document.body.addEventListener("mouseup", (e) => {
    document.body.style.cursor = "default"
    document.querySelectorAll(".node-out").forEach((e) => {
        e.style.cursor = "grab"
    })
    document.querySelectorAll(".node-in").forEach((e) => {
        e.style.cursor = "grab"
    })
})

function createLineElement(x, y, length, angle, id, type) {
    var line = document.createElement("div");
    var styles = "border: 1px solid #f0f0f0; "
               + "width: " + length + "px; "
               + "height: 0px; "
               + "-moz-transform: rotate(" + angle + "rad); "
               + "-webkit-transform: rotate(" + angle + "rad); "
               + "-o-transform: rotate(" + angle + "rad); "  
               + "-ms-transform: rotate(" + angle + "rad); "  
               + "position: absolute; "
               + "top: " + y + "px; "
               + "left: " + x + "px; "
               + "z-index: 1;"
               + "pointer-events: none;";
    line.setAttribute("style", styles);  
    line.classList.add("node")
    line.classList.add("edge")
    line.classList.add(type)
    line.id = id
    return line;
}

function createLine(x1, y1, x2, y2, id) {
    var a = x1 - x2,
        b = y1 - y2,
        c = Math.sqrt(a * a + b * b);

    var sx = (x1 + x2) / 2,
        sy = (y1 + y2) / 2;

    var x = sx - c / 2,
        y = sy;

    var alpha = Math.PI - Math.atan2(-b, a);

    return createLineElement(x, y, c, alpha, id);
}

function create_node_element(template, id){
    let htmlObject = document.createElement("div");
    htmlObject.classList.add("node");
    htmlObject.id = id
    htmlObject.innerHTML = json2html.render({"id_tag" : id}, template);
    return htmlObject
}

function reset_editor_menu(){
    // create the menu html
    let htmlObject = document.createElement("div");
    htmlObject.classList.add("node-menu-container");
    htmlObject.id = "default-node-menu"
    htmlObject.innerHTML = json2html.render([{}], DEFAULT_NODE_MENU);

    // remove previous menu containers
    node_menu.removeChild(document.querySelector(".node-menu-container"));

    // add new html
    node_menu.appendChild(htmlObject)
}

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

// listen for delete command
document.addEventListener("keydown", (evt) => {
    if(evt.keyCode === 46){
        delete_selected_node()
    }
})

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

function remove_edge(uuid){
    // remove from local storage first
    localStorage.removeItem(uuid)
    // remove graphically
    main_canvas.removeChild(document.getElementById(uuid))
}

// ----------------------------

const crosshair = document.querySelector(".crosshair")

// update cursor edge position
document.body.onmousemove = (e) => {
    // upadte edge offset based on crosshair position
    if(document.getElementById("temp_edge") !== null){
        let relative_middle_x = edge_start_node.offsetLeft + (edge_start_node.getBoundingClientRect().width/2)/zoom
        let relative_bottom_y = edge_start_node.offsetTop + (edge_start_node.getBoundingClientRect().height - edge_start_node_sq.getBoundingClientRect().height/2)/zoom
        let absolute_middle_x = edge_start_node_sq.getBoundingClientRect().x + (edge_start_node_sq.getBoundingClientRect().width/2)/zoom
        let absolute_bottom_y = edge_start_node_sq.getBoundingClientRect().y + (edge_start_node_sq.getBoundingClientRect().height/2)/zoom
        let offset_x = absolute_middle_x - relative_middle_x

        // delete current edge and make new edge
        main_canvas.removeChild(document.getElementById("temp_edge"))
        main_canvas.appendChild(createLine(
            relative_middle_x,
            relative_bottom_y,
            relative_middle_x - (absolute_middle_x - e.x)/zoom,
            relative_bottom_y - (absolute_bottom_y - e.y)/zoom,
            "temp_edge"));   
    }
}

// update all non-temporary edges
function update_non_temp_edges(){
    let edges = document.querySelectorAll(".edge")

    for(let i = 0; i < edges.length; i++){ // for loop cuz it"s a bit faster
        let edge = edges[i]
        if(edge.id !== "temp_edge"){
            // if matching, find io nodes and get their position and update the edge
            let edge_data = JSON.parse(localStorage.getItem(edge.id))
            let innode = document.getElementById(edge_data.dest) // edge_data.output is where the line starts
            let outnode = document.getElementById(edge_data.input)
            let outnodesq = document.getElementById(`${edge_data.input}out`)
            let edge_uuid = edge.id

            main_canvas.removeChild(document.getElementById(edge_uuid))
            main_canvas.appendChild(createLine(
                outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
                outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
                innode.offsetLeft + (innode.getBoundingClientRect().width/2)/zoom,
                innode.offsetTop + 5/zoom,
                edge_uuid));
        }
    }
}

// delete cursor edge and create connection if cursor release/drop detected
document.body.onmouseup = (e) => {
    // remove dragging style
    document.querySelectorAll(".node-drag").forEach(elmnt => {
        elmnt.classList.remove("node-edge-dragging")
    })

    // see if it exists
    if(document.getElementById("temp_edge") !== null){
        // if it exist remove all traces of it
        main_canvas.removeChild(document.getElementById("temp_edge"))
        
        // check if there are any nodes that are being hovered
        // // and if it is the same as the starting node or input node
        // console.log(JSON.parse(localStorage.getItem(selected_uuid)).edge === null)
        if(hovering_uuid !== selected_uuid && hovering_uuid !== INPUT_UUID && hovering_uuid !== null &&
            JSON.parse(localStorage.getItem(selected_uuid)).edge === null &&
            !JSON.parse(localStorage.getItem(hovering_uuid)).connected){
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
    }

    // clear selected node
    selected_uuid = null
}

//-----------------------------

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function createNodeElement() {
    let node = document.createElement("div");
    // create unique uuid
    let uuid = uuidv4()
    node.id = uuid

    return node;
}

// add selection highlight
document.querySelectorAll(".node-drag").forEach((elm) => {
    elm.addEventListener("mousedown", (e) => {
        document.querySelectorAll(".node-drag").forEach((elm2) => {
            elm2.classList.remove("selected-node")
        })
        if(elm.classList.contains("selected-node")){
            elm.classList.remove("selected-node")
            return
        }
        elm.classList.add("selected-node")
    })
})