// define node jsons
const INPUT_NODE = [
    { // node in triangle
        "<>" : "div",
        "class" : "node-in",
    }, {
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
            }, { // horizontal line
                "<>" : "hr"
            }, { // status
                "<>" : "p",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : " No File Added"
            }]
    }, { // node out
        "<>" : "div",
        "class" : "node-out",
    }
]

const OUTPUT_NODE = [
    { // node in triangle
        "<>" : "div",
        "class" : "node-in",
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
            }, { // display node display
                "<>" : "p",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : "Click To Add/Modify"
            }, { // more display 
                "<>" : "p",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : "Training Label"
            }, { // horizontal line
                "<>" : "hr"
            }, { // status
                "<>" : "p",
                "class" : "unselectable node-text",
                "style" : "cursor:move",
                "html" : " No File Added"
            }]
    }, { // node out
        "<>" : "div",
        "class" : "node-out",
    }
]

function create_node(template, id){
    let htmlObject = document.createElement('div');
    htmlObject.classList.add('node');
    htmlObject.id = id
    console.log(json2html.render({'id_tag' : id}, template))
    htmlObject.innerHTML = json2html.render({'id_tag' : id}, template);
    return htmlObject
}
let main_canvas = document.getElementById('main-canvas')

// create input node
document.getElementById('input_node_add').addEventListener('click', (e) => {
    let uuid = uuidv4()
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
})

// create output node
document.getElementById('output_node_add').addEventListener('click', (e) => {
    let uuid = uuidv4()
    let html = create_node(OUTPUT_NODE, uuid)
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
})

// listen for delete command
document.addEventListener('keydown', (evt) => {
    console.log(evt)
    if(evt.keyCode === 46){
        let htmlObject = document.querySelector('.selected-node')
        main_canvas.removeChild(document.getElementById(htmlObject.id.substring(0, htmlObject.id.length-6)))
    }
})

//-----------------------------

let data = fetch('./test-template.json').then((res) => {
    console.log(res)
})

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