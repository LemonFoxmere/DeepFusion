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

    new input_node(INPUT_UUID, INPUT_DAT_UUID, false)
    document.getElementById("input_node_add").classList.add("disable")
    if(restore_output){ // shift it to the left a bit if the output also exist
        document.getElementById(INPUT_UUID).style.left = `${document.getElementById(INPUT_UUID).offsetLeft-100}px`
    }
    dflog(supportmsg, "Successfully restored input file.")
} else {
    console.warn("No input data to be recovered. This message can be ignored.")
}

if(restore_output){ // restore the output
    localStorage.setItem(OUTPUT_DAT_UUID, previous_output)
    new output_node(OUTPUT_UUID, OUTPUT_DAT_UUID, false)

    document.getElementById("output_node_add").classList.add("disable")
    if(restore_input){ // shift it to the left a bit if the output also exist
        document.getElementById(OUTPUT_UUID).style.left = `${document.getElementById(OUTPUT_UUID).offsetLeft+100}px`
    }
    dflog(supportmsg, "Successfully restored output file.")
} else {
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
    htmlObject.innerHTML = json2html.render([{}], {
        "<>" : "p",
        "html" : "Click on a node to edit it"
    });

    // remove previous menu containers
    node_menu.removeChild(document.querySelector(".node-menu-container"));

    // add new html
    node_menu.appendChild(htmlObject)
}

// listen for delete command
document.addEventListener("keydown", (evt) => {
    if((evt.keyCode === 8 || evt.keyCode === 46 || evt.key === "d") && evt.target.tagName !== "INPUT"){
        delete_selected_node()
    }
})

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
    document.querySelectorAll(".node").forEach(elmnt => {
        elmnt.classList.remove("node-edge-dragging-cont")
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