// Make the DIV element draggable:
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

let canvas_position_x = 0;
let canvas_position_y = 0;
let canvas = document.getElementById('main-canvas');
// canvas zooms
let zoom = 1;
const WHEEL_ZOOM_SPEED = 0.1;
const CLICK_ZOOM_SPEED = 0.25;

dragCanvas(document.querySelector('#canvas-drag'), '.node'); // add 
let shifted = false;

function dragCanvas(canvas, elmnts) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    canvas.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;

            // check if its inside of any node / menus
        let x = false;
        document.querySelectorAll(elmnts).forEach(elmnt => {
            let box = elmnt.getBoundingClientRect()
            if(pos3 > box.x && pos3 < box.x + box.width &&
                pos4 > box.y && pos4 < box.y + box.height){
                x = true;
            }
        });

        if(x) return
        document.querySelectorAll('.node-drag').forEach((elm2) => {
            elm2.classList.remove('selected-node')
        }) // remove all node selection

        document.querySelectorAll('.menu-container').forEach(elmnt => {
            let box = elmnt.getBoundingClientRect()
            if(pos3 > box.x && pos3 < box.x + box.width &&
                pos4 > box.y && pos4 < box.y + box.height){
                x = true;
            }
        });

        if(x) return

        // remove transition temporarily
        document.querySelectorAll(elmnts).forEach(elmnt => {
            elmnt.classList.add('notransition')
        });

        document.querySelectorAll(".crosshair").forEach(elmnt => {
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
        document.querySelectorAll(elmnts).forEach(elmnt => {
            elmnt.style.top = (elmnt.offsetTop - pos2/zoom) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1/zoom) + "px";
        });

        
        document.querySelector('.crosshair').style.top = (document.querySelector('.crosshair').offsetTop - pos2) + "px";
        document.querySelector('.crosshair').style.left = (document.querySelector('.crosshair').offsetLeft - pos1) + "px";
        
        canvas_position_x -= pos1/zoom; //it's the opposite way around
        canvas_position_y -= pos2/zoom; //it's the opposite way around
        // get string and apply
        document.querySelector('#position_debug').innerHTML = Math.floor(canvas_position_x) + "," + Math.floor(canvas_position_y)
        
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        
        // add back no ransition
        document.querySelectorAll(elmnts).forEach(elmnt => {
            elmnt.classList.remove('notransition')
        });
        document.querySelectorAll(".crosshair").forEach(elmnt => {
            elmnt.classList.remove('notransition')
        });
    }
}

// reset canvas position
document.getElementById('reset-canvas').addEventListener('click', async (e) => {
    document.querySelectorAll('.node').forEach((e) => {
        e.classList.remove('notransition')
    })
    document.querySelectorAll('.crosshair').forEach((e) => {
        e.classList.remove('notransition')
    })

    document.querySelectorAll('.node').forEach((e) => {
        e.style.top = (e.offsetTop - canvas_position_y) + "px";
        e.style.left = (e.offsetLeft - canvas_position_x) + "px";
    })

    document.querySelectorAll('.crosshair').forEach((e) => {
        e.style.top = (e.offsetTop - canvas_position_y) + "px";
        e.style.left = (e.offsetLeft - canvas_position_x) + "px";
    })
    
    canvas_position_y = 0
    canvas_position_x = 0
    document.querySelector('#position_debug').innerHTML = canvas_position_x + "," + canvas_position_y
})

// add zoom functionality
document.getElementById('zoom-in').addEventListener('click', (e) => {
    zoom += CLICK_ZOOM_SPEED
    if(zoom > 3){
        zoom = 3        
    }
    canvas.style.transform = `scale(${zoom})`;  
    update_zoom_text()
})

document.getElementById('zoom-out').addEventListener('click', (e) => {
    zoom -= CLICK_ZOOM_SPEED
    if(zoom < 0.2){
        zoom = 0.2        
    }
    canvas.style.transform = `scale(${zoom})`;  
    update_zoom_text()
})

document.getElementById('zoom-res').addEventListener('click', (e) => {
    canvas.style.transform = `scale(${zoom = 1})`;  
    update_zoom_text()
})

document.addEventListener("wheel", function(e) {  
    if(e.deltaY > 0){ 
        if(zoom < 3){ 
            canvas.style.transform = `scale(${zoom += WHEEL_ZOOM_SPEED})`;  
        }   
    }else{
        if(zoom > 0.25){ 
            canvas.style.transform = `scale(${zoom -= WHEEL_ZOOM_SPEED})`;  }
        }
    update_zoom_text()
});

function update_zoom_text(){
    document.getElementById('zoom-scale').innerHTML = Math.floor(zoom*100) + "%"
}

document.querySelectorAll(".slider").forEach((e) => {
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

// field input related
document.querySelectorAll(".number-box").forEach((e) => {
    e.addEventListener("keypress", function (evt) {
        if (evt.which < 48 || evt.which > 57){
            evt.preventDefault();
        }

        if (evt.which === 13){
            e.blur()
        }
    }); // prevent unorthodox number entering
    
    e.addEventListener("focusout", (evt) => {
        if(document.getElementById(e.id + '-slider')){
            let slider = document.getElementById(e.id + '-slider')
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

    if(document.getElementById(e.id + '-slider')){
        e.value = document.getElementById(e.id + '-slider').value;
    }
})