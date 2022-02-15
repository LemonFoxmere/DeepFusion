// show warning message before unloading
window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = "Leaving this site WILL result in your work permanatly erased. But your IO data will be kept. Are you sure?";
    }

    // For Safari
    return "Leaving this site WILL result in your work permanatly erased. But your IO data will be kept. Are you sure?";
};

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