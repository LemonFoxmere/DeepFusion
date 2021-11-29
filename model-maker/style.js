name_p1 = ["Colossal", "Decisive", "Marked", "Roasted", "Petite", "Handsome", "Tiny", "Giant", "Likeable", "Exotic"]
name_p2 = ["Theory", "Cat", "Rice", "Point", "Bean", "Space", "Lemon", "kitten", "Oil", "Orange"]
name_p3 = ["Analyser", "Generator", "Picker", "Debugger", "Creator", "Sorter", "Performer", "Manipulater", "Analyser"]

// set bottom menu height automatically
setInterval(() => {
    document.getElementById("networkname").style.width = `calc(50vw - clamp(1rem, 15vw, 17rem) - 4vh - ${
        document.getElementById("canvas-ctrl").getBoundingClientRect().width/2
    }px)`
}, 10);

let p1 = name_p1[Math.floor(Math.random() * name_p1.length)];
let p2 = name_p2[Math.floor(Math.random() * name_p2.length)];
let p3 = name_p3[Math.floor(Math.random() * name_p3.length)];
document.getElementById("networkname").value = p1+p2+p3+".h5"