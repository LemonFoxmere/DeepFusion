// Make the DIV element draggable:
dragElement(document.getElementById('00x0')); // add element drag
dragElement(document.getElementById('00x1')); // add element drag

let canvas_position_x = 0;
let canvas_position_y = 0;
let canvas = document.getElementById('main-canvas');
// canvas zooms
let zoom = 1;
const WHEEL_ZOOM_SPEED = 0.1;
const CLICK_ZOOM_SPEED = 0.25;

dragCanvas(document.querySelector('#main-canvas'), '.node'); // add 
let shifted = false;

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
    }
}

function dragCanvas(canvas, elmnts) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    document.onmousedown = dragMouseDown;

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
                return;
            }
        });

        document.querySelectorAll('.menu-container').forEach(elmnt => {
            let box = elmnt.getBoundingClientRect()
            if(pos3 > box.x && pos3 < box.x + box.width &&
                pos4 > box.y && pos4 < box.y + box.height){
                x = true;
                return;
            }
        });

        console.log(x)

        if(x){
            return
        }

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
        
        canvas_position_x -= pos1; //it's the opposite way around
        canvas_position_y -= pos2; //it's the opposite way around
        // get string and apply
        document.querySelector('#position_debug').innerHTML = canvas_position_x + "," + canvas_position_y
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// add zoom functionality
document.getElementById('zoom-in').addEventListener('click', (e) => {
    if(zoom < 3){
        canvas.style.transform = `scale(${zoom += CLICK_ZOOM_SPEED})`;  
    }
    update_zoom_text()
})

document.getElementById('zoom-out').addEventListener('click', (e) => {
    if(zoom > 0.25){
        canvas.style.transform = `scale(${zoom -= CLICK_ZOOM_SPEED})`;  
    }
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