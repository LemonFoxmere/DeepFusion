// clear local storage
localStorage.clear()

// warn user of reload
// window.onbeforeunload = function() {
//     return "Data will be lost if you leave the page, are you sure?";
// };

document.body.addEventListener('mouseup', (e) => {
    document.body.style.cursor = 'default'
    document.querySelectorAll('.node-out').forEach((e) => {
        e.style.cursor = 'grab'
    })
})

// define node jsons
function create_node_data(dest, is_edge, is_start, data, type){
    return {
        "dest" : dest,
        "is_edge" : is_edge,
        "is_start" : is_start,
        "data" : data,
        "type" : type
    }
}

function create_edge_data(input, dest){
    return {
        "input" : input,
        "dest" : dest
    }
}

/*
node type standard
in = input
ou = output
de = dense
ac = activation
do = dropout

element type standard
00 = node
01 = edge
02 = some stuff
...
FF = ?
*/

const INPUT_UUID = "6e9328d7-7b71-4af8-8b70-1b4c8cd2a708"
const OUTPUT_UUID = "dde3a704-50f9-4b74-a641-57720cbb5c0e"

let hovering_uuid = null
let selected_uuid = null

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

function createLineElement(x, y, length, angle, id) {
    var line = document.createElement("div");
    var styles = 'border: 1px solid #7e7e7f; '
               + 'width: ' + length + 'px; '
               + 'height: 0px; '
               + '-moz-transform: rotate(' + angle + 'rad); '
               + '-webkit-transform: rotate(' + angle + 'rad); '
               + '-o-transform: rotate(' + angle + 'rad); '  
               + '-ms-transform: rotate(' + angle + 'rad); '  
               + 'position: absolute; '
               + 'top: ' + y + 'px; '
               + 'left: ' + x + 'px; '
               + 'z-index: 1;'
               + 'pointer-events: none;';
    line.setAttribute('style', styles);  
    line.classList.add('node')
    line.classList.add('edge')
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

function create_node(template, id){
    let htmlObject = document.createElement('div');
    htmlObject.classList.add('node');
    htmlObject.id = id
    htmlObject.innerHTML = json2html.render({'id_tag' : id}, template);
    return htmlObject
}
let main_canvas = document.getElementById('main-canvas')
let base_canvas = document.getElementById('base-canvas')
let edge_start_node = null
let edge_start_node_sq = null

// create input node
document.getElementById('input_node_add').addEventListener('click', (e) => {
    if(localStorage.getItem(INPUT_UUID)) return

    let uuid = '00'+INPUT_UUID // THIS WILL ALWAYS BE THE STARTING UUID
    let html = create_node(INPUT_NODE, uuid)
    main_canvas.appendChild(html)
    dragElement(document.getElementById(uuid)); // add element drag

    // add highlighting
    document.getElementById(`${uuid}header`).addEventListener('mousedown', (e) => {
        document.querySelectorAll('.node-drag').forEach((elm) => {
            elm.classList.remove('selected-node')
        })
        if(document.getElementById(`${uuid}header`).classList.contains('selected-node')){
            document.getElementById(`${uuid}header`).classList.remove('selected-node')
            return
        }
        document.getElementById(`${uuid}header`).classList.add('selected-node')
    })

    // EDGE CREATION START
    document.getElementById(uuid).addEventListener('mouseover', (e) => {
        hovering_uuid = uuid
    })

    document.getElementById(uuid).addEventListener('mouseout', (e) => {
        hovering_uuid = null
    })

    // add node out drag function
    document.getElementById(`${uuid}out`).addEventListener('mousedown', (e) => {
        document.body.style.cursor = 'grabbing'
        document.getElementById(`${uuid}out`).style.cursor = 'grabbing'

        let outnode = document.getElementById(`${uuid}`)
        let outnodesq = document.getElementById(`${uuid}out`)

        main_canvas.appendChild(createLine(
            outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
            outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
            outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
            outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
            'temp_edge'));

        edge_start_node = outnode
        edge_start_node_sq = outnodesq

        // set draggin UUID to outnode's uuid
        selected_uuid = uuid
    })
    // EDGE CREATION END

    // create matching node data
    let input_node_dat = create_node_data(null, true, true, null, "in")

    // create a node value in local storage
    localStorage.setItem(uuid,JSON.stringify(input_node_dat))
    
    // disable the input button
    document.getElementById('input_node_add').classList.add('disable')
})

// create output node
document.getElementById('output_node_add').addEventListener('click', (e) => {
    if(localStorage.getItem(OUTPUT_UUID)) return

    let uuid = '00'+OUTPUT_UUID // THIS WILL ALWAYS BE THE OUTPUT UUID
    let html = create_node(OUTPUT_NODE, uuid)
    main_canvas.appendChild(html)
    dragElement(document.getElementById(uuid)); // add element drag
    
    document.getElementById(uuid).addEventListener('mouseover', (e) => {
        hovering_uuid = uuid
    })

    document.getElementById(uuid).addEventListener('mouseout', (e) => {
        hovering_uuid = null
    })

    // add highlighting
    document.getElementById(`${uuid}header`).addEventListener('mousedown', (e) => {
        document.querySelectorAll('.node-drag').forEach((elm) => {
            elm.classList.remove('selected-node')
        })
        if(document.getElementById(`${uuid}header`).classList.contains('selected-node')){
            document.getElementById(`${uuid}header`).classList.remove('selected-node')
            return
        }
        document.getElementById(`${uuid}header`).classList.add('selected-node')
    })
    // create matching node data
    let input_node_dat = create_node_data(null, true, false, null, "ou")

    // create a node value in local storage
    localStorage.setItem(uuid,JSON.stringify(input_node_dat))
    
    // disable the input button
    document.getElementById('output_node_add').classList.add('disable')
})

// create dense node
document.getElementById('dense_node_add').addEventListener('click', (e) => {
    let uuid = '00'+uuidv4()
    let html = create_node(DENSE_NODE, uuid)
    main_canvas.appendChild(html)
    dragElement(document.getElementById(uuid)); // add element drag
    
    // add highlighting
    document.getElementById(`${uuid}header`).addEventListener('mousedown', (e) => {
        document.querySelectorAll('.node-drag').forEach((elm) => {
            elm.classList.remove('selected-node')
        })
        if(document.getElementById(`${uuid}header`).classList.contains('selected-node')){
            document.getElementById(`${uuid}header`).classList.remove('selected-node')
            return
        }
        document.getElementById(`${uuid}header`).classList.add('selected-node')
    })

    // EDGE CREATION START
    document.getElementById(uuid).addEventListener('mouseover', (e) => {
        hovering_uuid = uuid
    })


    document.getElementById(uuid).addEventListener('mouseout', (e) => {
        hovering_uuid = null
    })

    // add node out drag function
    document.getElementById(`${uuid}out`).addEventListener('mousedown', (e) => {
        document.body.style.cursor = 'grabbing'
        document.getElementById(`${uuid}out`).style.cursor = 'grabbing'

        let outnode = document.getElementById(`${uuid}`)
        let outnodesq = document.getElementById(`${uuid}out`)

        main_canvas.appendChild(createLine(
            outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
            outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
            outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
            outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
            'temp_edge'));

        edge_start_node = outnode
        edge_start_node_sq = outnodesq

        // set draggin UUID to outnode's uuid
        selected_uuid = uuid
    })
    // EDGE CREATION END

    // create matching node data
    let input_node_dat = create_node_data(null, false, false, null, "de")

    // create a node value in local storage
    localStorage.setItem(uuid,JSON.stringify(input_node_dat))
})

// create activation node
document.getElementById('act_node_add').addEventListener('click', (e) => {
    let uuid = '00'+uuidv4()
    let html = create_node(ACT_NODE, uuid)
    main_canvas.appendChild(html)
    dragElement(document.getElementById(uuid)); // add element drag
    
    // add highlighting
    document.getElementById(`${uuid}header`).addEventListener('mousedown', (e) => {
        document.querySelectorAll('.node-drag').forEach((elm) => {
            elm.classList.remove('selected-node')
        })
        if(document.getElementById(`${uuid}header`).classList.contains('selected-node')){
            document.getElementById(`${uuid}header`).classList.remove('selected-node')
            return
        }
        document.getElementById(`${uuid}header`).classList.add('selected-node')
    })

    // EDGE CREATION START
    document.getElementById(uuid).addEventListener('mouseover', (e) => {
        hovering_uuid = uuid
    })


    document.getElementById(uuid).addEventListener('mouseout', (e) => {
        hovering_uuid = null
    })

    // add node out drag function
    document.getElementById(`${uuid}out`).addEventListener('mousedown', (e) => {
        document.body.style.cursor = 'grabbing'
        document.getElementById(`${uuid}out`).style.cursor = 'grabbing'

        let outnode = document.getElementById(`${uuid}`)
        let outnodesq = document.getElementById(`${uuid}out`)

        main_canvas.appendChild(createLine(
            outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
            outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
            outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
            outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
            'temp_edge'));

        edge_start_node = outnode
        edge_start_node_sq = outnodesq
        
        // set draggin UUID to outnode's uuid
        selected_uuid = uuid
    })
    // EDGE CREATION END

    // create matching node data
    let input_node_dat = create_node_data(null, false, false, null, "ac")

    // create a node value in local storage
    localStorage.setItem(uuid,JSON.stringify(input_node_dat))
})

// create activation node
document.getElementById('drop_node_add').addEventListener('click', (e) => {
    let uuid = '00'+uuidv4()
    let html = create_node(DROP_NODE, uuid)
    main_canvas.appendChild(html)
    dragElement(document.getElementById(uuid)); // add element drag
    
    // add highlighting
    document.getElementById(`${uuid}header`).addEventListener('mousedown', (e) => {
        document.querySelectorAll('.node-drag').forEach((elm) => {
            elm.classList.remove('selected-node')
        })
        if(document.getElementById(`${uuid}header`).classList.contains('selected-node')){
            document.getElementById(`${uuid}header`).classList.remove('selected-node')
            return
        }
        document.getElementById(`${uuid}header`).classList.add('selected-node')
    })

    // EDGE CREATION START
    document.getElementById(uuid).addEventListener('mouseover', (e) => {
        hovering_uuid = uuid
    })

    document.getElementById(uuid).addEventListener('mouseout', (e) => {
        hovering_uuid = null
    })

    // add node out drag function
    document.getElementById(`${uuid}out`).addEventListener('mousedown', (e) => {
        document.body.style.cursor = 'grabbing'
        document.getElementById(`${uuid}out`).style.cursor = 'grabbing'

        let outnode = document.getElementById(`${uuid}`)
        let outnodesq = document.getElementById(`${uuid}out`)

        main_canvas.appendChild(createLine(
            outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
            outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
            outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
            outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
            'temp_edge'));

        edge_start_node = outnode
        edge_start_node_sq = outnodesq

        // set draggin UUID to outnode's uuid
        selected_uuid = uuid
    })
    // EDGE CREATION END

    // create matching node data
    let input_node_dat = create_node_data(null, false, false, null, "do")

    // create a node value in local storage
    localStorage.setItem(uuid,JSON.stringify(input_node_dat))
})

// listen for delete command
document.addEventListener('keydown', (evt) => {
    if(evt.keyCode === 46){
        let htmlObject = document.querySelector('.selected-node')
        if(!htmlObject) return

        // remove from local storage
        let node_uuid = htmlObject.id.substring(0, htmlObject.id.length-6)
        localStorage.removeItem(node_uuid)
        if(node_uuid === INPUT_UUID) document.getElementById('input_node_add').classList.remove('disable')
        if(node_uuid === OUTPUT_UUID) document.getElementById('output_node_add').classList.remove('disable')

        main_canvas.removeChild(document.getElementById(node_uuid))

        hovering_uuid = null // the node's own listener will stop functioning, so we'll have to reset it
    }
})

// ----------------------------

const crosshair = document.querySelector('.crosshair')

// update cursor edge position
document.body.onmousemove = (e) => {
    // upadte edge offset based on crosshair position
    if(document.getElementById('temp_edge') !== null){
        let relative_middle_x = edge_start_node.offsetLeft + (edge_start_node.getBoundingClientRect().width/2)/zoom
        let relative_bottom_y = edge_start_node.offsetTop + (edge_start_node.getBoundingClientRect().height - edge_start_node_sq.getBoundingClientRect().height/2)/zoom
        let absolute_middle_x = edge_start_node_sq.getBoundingClientRect().x + (edge_start_node_sq.getBoundingClientRect().width/2)/zoom
        let absolute_bottom_y = edge_start_node_sq.getBoundingClientRect().y + (edge_start_node_sq.getBoundingClientRect().height/2)/zoom
        let offset_x = absolute_middle_x - relative_middle_x

        // delete current edge and make new edge
        main_canvas.removeChild(document.getElementById('temp_edge'))
        main_canvas.appendChild(createLine(
            relative_middle_x,
            relative_bottom_y,
            relative_middle_x - (absolute_middle_x - e.x)/zoom,
            relative_bottom_y - (absolute_bottom_y - e.y)/zoom,
            'temp_edge'));   
    }
}

// update all non-temporary edges
// setTimeout((e) => {
//     let edges = document.querySelectorAll('.edge')
//     for(let i = 0; i < edges.length; i++){ // for loop cuz it's a bit faster
//         let edge = edges[i]
//         if(edge.id === perm_edge){
//             // if matching, 
//         }
//     }
// }, 3)

// delete cursor edge and create connection if cursor release detected
document.body.onmouseup = (e) => {
    // see if it exists
    if(document.getElementById('temp_edge') !== null){
        // if it exist remove all traces of it
        main_canvas.removeChild(document.getElementById('temp_edge'))
        
        // check if there are any nodes that are being hovered, and if it is the same as the starting node
        if(hovering_uuid !== selected_uuid){
            // if not, proceed with creating a visual line
            let outnode = document.getElementById(`${selected_uuid}`)
            let outnodesq = document.getElementById(`${selected_uuid}out`)

            let innode = document.getElementById(`${hovering_uuid}`)

            main_canvas.appendChild(createLine(
                outnode.offsetLeft + (outnode.getBoundingClientRect().width/2)/zoom,
                outnode.offsetTop + (outnode.getBoundingClientRect().height-outnodesq.getBoundingClientRect().height/2)/zoom,
                innode.offsetLeft + (innode.getBoundingClientRect().width/2)/zoom,
                innode.offsetTop + 5/zoom,
                'perm_edge'));

            // add edge entry to local storage
            let edge_uuid = '01'+uuidv4()
            let edge_data = create_edge_data(selected_uuid, hovering_uuid)
            localStorage.setItem(edge_uuid,JSON.stringify(edge_data))

            // TODO: manipulate the internal data structure too
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

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.querySelectorAll('.node').forEach(elmnt => {
            elmnt.classList.add('notransition')
        });

        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;

    }

    function elementDrag(e) {
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2/zoom) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1/zoom) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        // add back transition
        document.querySelectorAll('.node').forEach(elmnt => {
            elmnt.classList.remove('notransition')
        });
    }
}

// add selection highlight
document.querySelectorAll('.node-drag').forEach((elm) => {
    elm.addEventListener('mousedown', (e) => {
        document.querySelectorAll('.node-drag').forEach((elm2) => {
            elm2.classList.remove('selected-node')
        })
        if(elm.classList.contains('selected-node')){
            elm.classList.remove('selected-node')
            return
        }
        elm.classList.add('selected-node')
    })
})