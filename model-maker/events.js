// Make the DIV element draggable:
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

let canvas_position_x = 0;
let canvas_position_y = 0;
let canvas = document.getElementById("main-canvas");
// canvas zooms
let zoom = 1;
const WHEEL_ZOOM_SPEED = 0.1;
const CLICK_ZOOM_SPEED = 0.25;

let prev_window_width = window.innerWidth;
let prev_window_height = window.innerHeight;

// get background grid size, and turn them into numbers
let background_grid_size_x = extract_value(document.getElementById("main-canvas").style.backgroundSize.split(" ")[0])
let background_grid_size_y = extract_value(document.getElementById("main-canvas").style.backgroundSize.split(" ")[1])

let is_selecting = false

dragCanvas(document.querySelector("#canvas-drag"), ".node"); // add canvas drag event
let shifted = false;

window.onpageshow = () => {
    document.querySelector("#main-canvas").style.backgroundPositionY = document.querySelector("#functional-crosshair").offsetTop // setup background grid positions
    - background_grid_size_y/2 + "px";
    document.querySelector("#main-canvas").style.backgroundPositionX = document.querySelector("#functional-crosshair").offsetLeft
    - background_grid_size_x/2 + "px";

    document.querySelector(".decorational-crosshair").style.top = (document.querySelector("#functional-crosshair").offsetTop) -
    document.querySelector(".decorational-crosshair").getBoundingClientRect().height/2 + "px";  // separately setup the decorational crosshair
    document.querySelector(".decorational-crosshair").style.left = (document.querySelector("#functional-crosshair").offsetLeft) -
    document.querySelector(".decorational-crosshair").getBoundingClientRect().width/2 + "px"; 
}

function dragCanvas(canvas, elmnts) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    canvas.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if(is_selecting) return

        e.preventDefault();

        // change cursor
        document.body.style.cursor = "move"
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;

        // check if its inside of any node / menus
        let x = false;
        document.querySelectorAll(elmnts).forEach(elmnt => {
            let box = elmnt.getBoundingClientRect()
            if(pos3 > box.x && pos3 < box.x + box.width &&
                pos4 > box.y && pos4 < box.y + box.height){
                    if(elmnt.classList.contains("edge")){
                        x += false;
                    } else {
                        x += true;
                    }
            }
            
        });

        if(x) return

        document.querySelectorAll(".node-drag").forEach((elm2) => {
            elm2.classList.remove("selected-node")
            reset_editor_menu()
            document.getElementById("del-selected").disabled = true // enable option for delete
        }) // remove all node selection and disable node deletion button

        document.querySelectorAll(".menu-container").forEach(elmnt => {
            let box = elmnt.getBoundingClientRect()
            if(pos3 > box.x && pos3 < box.x + box.width &&
                pos4 > box.y && pos4 < box.y + box.height){
                x = true;
            }
        });

        if(x) return

        // remove transition temporarily
        document.querySelectorAll(elmnts).forEach(elmnt => {
            elmnt.classList.add("notransition")
        });
        document.querySelectorAll(".crosshair").forEach(elmnt => {
            elmnt.classList.add("notransition")
        });
        document.querySelectorAll("#main-canvas").forEach((elmnt) => {
            elmnt.classList.add("notransition")
        })

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
        // set the element"s new position:
        document.querySelectorAll(elmnts).forEach(elmnt => {
            elmnt.style.top = (elmnt.offsetTop - pos2/zoom) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1/zoom) + "px";
        });

        
        document.querySelector(".crosshair").style.top = (document.querySelector(".crosshair").offsetTop - pos2/zoom) + "px";
        document.querySelector(".crosshair").style.left = (document.querySelector(".crosshair").offsetLeft - pos1/zoom) + "px";
        document.querySelector(".decorational-crosshair").style.top = (document.querySelector(".decorational-crosshair").offsetTop - pos2/zoom) + "px";
        document.querySelector(".decorational-crosshair").style.left = (document.querySelector(".decorational-crosshair").offsetLeft - pos1/zoom) + "px";

        // move the background along
        document.querySelector("#main-canvas").style.backgroundPositionY = document.querySelector(".crosshair").offsetTop
         - background_grid_size_y/2 + "px";
        document.querySelector("#main-canvas").style.backgroundPositionX = document.querySelector(".crosshair").offsetLeft
         - background_grid_size_x/2 + "px";
        
        canvas_position_x += pos1/zoom; //it"s the opposite way around
        canvas_position_y -= pos2/zoom; //it"s the opposite way around
        // get string and apply
        document.querySelector("#position_debug").innerHTML = Math.floor(canvas_position_x) + "," + Math.floor(canvas_position_y)
        
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

        // add no ransition
        document.querySelectorAll(".node").forEach((e) => {
            e.classList.remove("notransition")
        })
        document.querySelectorAll(".crosshair").forEach((e) => {
            e.classList.remove("notransition")
        })
        document.querySelectorAll("#main-canvas").forEach((e) => {
            e.classList.remove("notransition")
        })

        // move the background along
        // document.querySelector("#main-canvas").style.backgroundPositionY = (document.querySelector("#functional-crosshair").offsetTop)
        // - background_grid_size_y/2 + "px";
        // document.querySelector("#main-canvas").style.backgroundPositionX = (document.querySelector("#functional-crosshair").offsetLeft)
        // - background_grid_size_x/2 + "px";
    }
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
        if(is_selecting) return

        document.getElementById(elmnt.id + "header").classList.add("node-dragging") // add the node draggin style, which shows what is under this current node

        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.querySelectorAll(".node").forEach(elmnt => {
            elmnt.classList.add("notransition")
            elmnt.style.zIndex = 1;
        });
        document.getElementById(elmnt.id).style.zIndex=2 // add the node draggin style, which shows what is under this current node

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
        // set the element"s new position:
        elmnt.style.top = (elmnt.offsetTop - pos2/zoom) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1/zoom) + "px";

        // update the node"s edges too
        update_non_temp_edges()
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        // add back transition
        document.querySelectorAll(".node").forEach(elmnt => {
            elmnt.classList.remove("notransition")
        });

        document.getElementById(elmnt.id + "header").classList.remove("node-dragging")
    }
}

// On window resize. This is used to compensate the error that CSS brings to the canvas, which shifts the canvas and grid in an incorrect direction.
window.addEventListener("resize", e => {

    document.querySelectorAll(".node").forEach((e) => {
        e.classList.add("notransition")
    })
    document.querySelectorAll(".crosshair").forEach((e) => {
        e.classList.add("notransition")
    })
    document.querySelectorAll("#main-canvas").forEach((e) => {
        e.classList.add("notransition")
    })

    let offset_y = 2*(window.innerHeight-prev_window_height)
    let offset_x = 2*(window.innerWidth-prev_window_width)

    // console.log(prev_window_height, window.innerHeight, offset_y)

    document.querySelectorAll(".crosshair").forEach((e) => {
        // console.log(e.style.left, e.offsetLeft + offset_x + "px")
        e.style.top = e.offsetTop + offset_y + "px";
        e.style.left = e.offsetLeft + offset_x + "px";
    })

    // move background
    document.querySelector("#main-canvas").style.backgroundPositionY = document.querySelector(".crosshair").offsetTop // setup background grid positions
    - background_grid_size_y/2 + "px";
    document.querySelector("#main-canvas").style.backgroundPositionX = document.querySelector(".crosshair").offsetLeft
    - background_grid_size_x/2 + "px";

    // move nodes
    document.querySelectorAll(".node").forEach(elmnt => {
        elmnt.style.top = (elmnt.offsetTop + offset_y) + "px";
        elmnt.style.left = (elmnt.offsetLeft + offset_x) + "px";
    });

    // update the previous window sizes
    prev_window_height = window.innerHeight
    prev_window_width = window.innerWidth
})

document.getElementById("canvas-drag").addEventListener("wheel", e => { 
    e.preventDefault()

    // check if not in menus
    let x = false
    document.querySelectorAll(".menu-container").forEach(elmnt => {
        let box = elmnt.getBoundingClientRect()
        if(e.x > box.x && e.x < box.x + box.width &&
            e.y > box.y && e.y < box.y + box.height){
                x = true
        }
    });
    if(x) return

    document.querySelectorAll(".node").forEach((e) => {
        e.classList.add("notransition")
    })
    document.querySelectorAll(".crosshair").forEach((e) => {
        e.classList.add("notransition")
    })
    document.querySelectorAll("#main-canvas").forEach((e) => {
        e.classList.add("notransition")
    })
    
    
    if (e.ctrlKey) {
        let sensitivity = (20<Math.abs(e.deltaY)?20:Math.abs(e.deltaY))
        if(e.deltaY > 0){ 
            if(zoom > 0.3162){  // zoom out
                canvas.style.transform = `scale(${(zoom -= sensitivity * 0.013/2)*zoom})`;                    
                if(zoom < 0.3162){ // set zoom to sqrt(0.1)
                    zoom = 0.3162
                    canvas.style.transform = `scale(0.1)`;    
                }
            }
        }else{
            if(zoom < 4){ // zoom in
                canvas.style.transform = `scale(${(zoom -= -sensitivity * 0.013/2)*zoom})`;
                if(zoom > 4){ // set zoom to 4
                    zoom = 4
                    canvas.style.transform = `scale(16)`;    
                }
            }
        }
        return
    }
    // move with trackpad
    let offset_y = 2*(window.innerHeight-prev_window_height)
    let offset_x = 2*(window.innerWidth-prev_window_width)

    let deltaX = e.deltaX / zoom
    let deltaY = e.deltaY / zoom
    
    document.querySelectorAll(".crosshair").forEach((elmnt) => {
        elmnt.style.top = (elmnt.offsetTop - deltaY) + "px";
        elmnt.style.left = (elmnt.offsetLeft - deltaX) + "px";
    })

    // move background
    document.querySelector("#main-canvas").style.backgroundPositionY = document.querySelector(".crosshair").offsetTop // setup background grid positions
    - background_grid_size_y/2 - deltaY + "px";
    document.querySelector("#main-canvas").style.backgroundPositionX = document.querySelector(".crosshair").offsetLeft
    - background_grid_size_x/2 - deltaX + "px";

    // move nodes
    document.querySelectorAll(".node").forEach(elmnt => {
        elmnt.style.top = (elmnt.offsetTop - deltaY) + "px";
        elmnt.style.left = (elmnt.offsetLeft - deltaX) + "px";
    });

    // update canvas postitions
    canvas_position_y -= deltaY
    canvas_position_x += deltaX
    document.querySelector("#position_debug").innerHTML = Math.round(canvas_position_x) + "," + Math.round(canvas_position_y)

}, {passive:false});

// function update_zoom_text(){
//     document.getElementById("zoom-scale").innerHTML = Math.floor(zoom*100) + "%"
// }

// field input related
document.querySelectorAll(".slider").forEach((e) => { // add all slider events
    e.onmousedown = (evt) => {
        e.onmousemove = (evt2) => {
            if(document.getElementById(e.id.substring(0,e.id.length-7))){
                document.getElementById(e.id.substring(0,e.id.length-7)).value = e.value;
            }
        }
    }
    e.onmouseup = (evt) => {
        e.onmousemove = null
    }
})

document.querySelectorAll(".number-box").forEach((e) => { // add all input field events
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
        }
    })

    if(document.getElementById(e.id + "-slider")){
        e.value = document.getElementById(e.id + "-slider").value;
    }
})

function add_output_menu_events(){
    // add output field listender
    let e = document.getElementById("output-upload")
    if(e === null) return
        
    document.querySelector("#output-file").onchange = () => {
        // read csv file from the upload button
        let file = document.querySelector("#output-file").files[0], read = new FileReader()
        let file_name = file.name
        
        // check file type
        if(file.type !== "text/csv"){
            dflog(errormsg, "Upload failed: Only CSV files are supported for now!")
            dflog(blankmsg, "Or if you don't have a CSV file, you can click the <strong>⋮</strong> next to the upload button for a sample dataset.")
            return;
        }

        read.readAsBinaryString(file); // convert to String
        read.onloadend = function(){
            // when uploading, lag stems from here. This needs to be shifted to a backend server for processing in the future.
            // let data = CSVToJSON(read.result)
            CSVToJSON(read.result).then(data => {
                let dim = detectDim(data)
                update_output_data(file_name, data, dim) // update values
            }) .catch(err => {
                return -1
            })
        }
    }

    // clear file button
    document.getElementById("clear-output").addEventListener("click", (evt) => {
        update_output_data("No Output File", null, null)
    })
    
    document.getElementById("output-upload").addEventListener("click", (evt) => { // user selects their own data
        document.getElementById("output-file").click()
    })
    document.getElementById("default-output-upload").addEventListener("click", (evt) => { // upload default data
        fetch("../dataset/Y.csv").then(res => res.text()).then(rawdat => {
            CSVToJSON(rawdat).then(data => {
                let dim = detectDim(data)
                update_output_data("prediction.csv", data, dim) // update values
            }) .catch(err => {
                return -1
            })
        }).catch(err => {
            dflog(errormsg, "An internal error has occured, and the default output dataset cannot be loaded. Please submit a bug report here.")
        })
    })
}

function add_drop_menu_events(uuid){
    update_menu_slider(uuid, "prob", "Chance", data_affix="%")
}

// TODO: come back later and add multi selection

// function update_shortcuts(e){
//     is_selecting = true
//     document.getElementById("selection").classList.add("hovering-subtle-btn")
// }
// function reset_shortcuts(e){
//     is_selecting = false
//     document.getElementById("selection").classList.remove("hovering-subtle-btn")
// }

// window.addEventListener ? document.addEventListener("keydown", update_shortcuts) : document.attachEvent("keydown", update_shortcuts);
// window.addEventListener ? document.addEventListener("keyup", reset_shortcuts) : document.attachEvent("keydown", reset_shortcuts);

// button events related

// TODO: come back later and add multi selection. This is that button responsible for triggering it.
// document.getElementById("selection").addEventListener("click", e=>{ // for updating selection button
//     is_selecting = !is_selecting;
//     if(is_selecting){
//         document.getElementById("selection").classList.add("hovering-subtle-btn")
//     } else {
//         document.getElementById("selection").classList.remove("hovering-subtle-btn")
//     }
// })

// CSV to json
async function CSVToJSON (csvData) {
    return new Promise((res, rej) => { // TODO: integrate with backend server for processing later
         try {
            let jsonFormat = "["
            let i = 0
            let splitted_data = csvData.split("\n")
            for(let i = 0; i < splitted_data.length; i++){
                jsonFormat += "[" + splitted_data[i] + "]" + (csvData.split("\n").length-1 != i ? "," : "")
            }
            jsonFormat += "]"
            res(JSON.parse(jsonFormat)) // fulfill promise
        } catch (error) {
            dflog(errormsg, "An internal error occured while parsing file. Please check your data or, if you believe this is a system error, file a bug report <a style=\"cursor:pointer\" href=\"https://github.com/LemonOrangeWasTaken/DeepFusion/issues/new\" target=\"_blank\">here</a>.")
            rej() // reject promise
            return
        }
    })
}

function detectDim(jsonData) { // recursive algorithm to determine the data dimensions
    // console.log(jsonData.length)
    if(jsonData.length == undefined){ // base case
        return [1]
    }
    return [jsonData.length].concat(detectDim(jsonData[0]))
}

// extracting dom values
function extract_value(txt) {
    var numbers = txt.match(/\d/g);
    return Number((numbers) ? numbers.join("") : "");
}