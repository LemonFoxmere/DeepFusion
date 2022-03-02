// show warning message before unloading
// window.onbeforeunload = function (e) {
//     e = e || window.event;

//     // For IE and Firefox prior to version 4
//     if (e) {
//         e.returnValue = "Leaving this site WILL result in your work permanatly erased. But your IO data will be kept. Are you sure?";
//     }

//     // For Safari
//     return "Leaving this site WILL result in your work permanatly erased. But your IO data will be kept. Are you sure?";
// };

let font_size = 0.75 // This is for the terminal. unit: rem

document.getElementById("del-selected").disabled = true // disable the delete button in case if it is enabled from a previous session

name_p1 = ["Imaginary", "Wholesome", "Chaotic", "Tiny", "Giant", "Majestic", "Exotic", "Big","Small","Long","Special","Powerful","Strange","Beautiful", "Advanced",
"Fierce","Fancy"]
name_p2 = ["Theory", "Nhilist", "Cat", "Rice", "Point", "Bean", "Space", "Lemon", "Kitten", "Oil", "Orange","Computer","Apple","Rice","Dog","Water","Brick","Science",
"Clue","TV","Rock","Cow","Paper","Soda","Wire","Potato"]
name_p3 = ["Analyser", "Generator", "Picker", "Debugger", "Creator", "Sorter", "Performer", "Classifier", "Analyser", "Calculator","Finder","Editor","Helper","Selector"]

// set bottom menu height automatically
setInterval(() => {
    document.getElementById("networkname").style.width = `calc(50vw - 15rem - 4rem - ${
        document.getElementById("canvas-ctrl").getBoundingClientRect().width/2
    }px)`
}, 10);

let p1 = name_p1[Math.floor(Math.random() * name_p1.length)];
let p2 = name_p2[Math.floor(Math.random() * name_p2.length)];
let p3 = name_p3[Math.floor(Math.random() * name_p3.length)];

var networkname = p1+p2+p3

document.getElementById("networkname").value = networkname

// add event listeners for terminal customization
document.getElementById("zoom-in-term").addEventListener("click", e => {
    font_size += 0.1;
    update_terminal_font()
})
document.getElementById("zoom-out-term").addEventListener("click", e => {
    if(font_size - 0.1 > 0){ // to prevent it from going negative
        font_size -= 0.1;
        update_terminal_font()
    }
})

function update_terminal_font(){
    document.querySelectorAll("span").forEach(e => {
        e.style.fontSize = font_size + "rem";
        e.style.lineHeight = (font_size+0.25) + "rem";
    })
}

// contorl dock buttons
// reset canvas position
document.getElementById("reset-canvas").addEventListener("click", async (e) => {
    document.querySelectorAll(".node").forEach((e) => {
        e.classList.remove("notransition")
    })
    document.querySelectorAll(".crosshair").forEach((e) => {
        e.classList.remove("notransition")
    })
    document.querySelectorAll("#main-canvas").forEach((e) => {
        e.classList.remove("notransition")
    })

    document.querySelectorAll(".node").forEach((e) => {
        e.style.top = (e.offsetTop - canvas_position_y) + "px";
        e.style.left = (e.offsetLeft + canvas_position_x) + "px";
    })

    document.querySelectorAll(".crosshair").forEach((e) => {
        e.style.top = (e.offsetTop - canvas_position_y) + "px";
        e.style.left = (e.offsetLeft + canvas_position_x) + "px";
    })

    // move the background along
    let bgposY = document.querySelector("#main-canvas").style.backgroundPositionY
    let bgposX = document.querySelector("#main-canvas").style.backgroundPositionX

    document.querySelector("#main-canvas").style.backgroundPositionX = Number(bgposX.substring(0,bgposX.length-2))
    + canvas_position_x + "px";
    document.querySelector("#main-canvas").style.backgroundPositionY = Number(bgposY.substring(0,bgposY.length-2))
    - canvas_position_y + "px";
    
    canvas_position_y = 0
    canvas_position_x = 0
    document.querySelector("#position_debug").innerHTML = canvas_position_x + "," + canvas_position_y
})

document.getElementById("reset-coord").addEventListener("click", async (e) => {
    canvas_position_x = 0
    canvas_position_y = 0
    document.querySelector("#position_debug").innerHTML = Math.round(canvas_position_x) + "," + Math.round(canvas_position_y)


})

// add zoom functionality
document.getElementById("zoom-in").addEventListener("click", (e) => {
    document.querySelectorAll(".node").forEach((e) => {
        e.classList.remove("notransition")
    })
    document.querySelectorAll(".crosshair").forEach((e) => {
        e.classList.remove("notransition")
    })
    document.querySelectorAll("#main-canvas").forEach((e) => {
        e.classList.remove("notransition")
    })

    zoom += CLICK_ZOOM_SPEED
    if(zoom > 4){
        zoom = 4        
    }
    canvas.style.transform = `scale(${zoom})`;  
    // update_zoom_text()
})

document.getElementById("zoom-out").addEventListener("click", (e) => {
    document.querySelectorAll(".node").forEach((e) => {
        e.classList.remove("notransition")
    })
    document.querySelectorAll(".crosshair").forEach((e) => {
        e.classList.remove("notransition")
    })
    document.querySelectorAll("#main-canvas").forEach((e) => {
        e.classList.remove("notransition")
    })

    zoom -= CLICK_ZOOM_SPEED
    if(zoom < 0.2){
        zoom = 0.2        
    }
    canvas.style.transform = `scale(${zoom})`;  
    // update_zoom_text()
})

document.getElementById("zoom-res").addEventListener("click", (e) => {
    document.querySelectorAll(".node").forEach((e) => {
        e.classList.remove("notransition")
    })
    document.querySelectorAll(".crosshair").forEach((e) => {
        e.classList.remove("notransition")
    })
    document.querySelectorAll("#main-canvas").forEach((e) => {
        e.classList.remove("notransition")
    })
    
    canvas.style.transform = `scale(${zoom = 1})`;  
    // update_zoom_text()
})

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