// show warning message before unloading
// window.onbeforeunload = function (e) {
//     e = e || window.event;

//     // For IE and Firefox prior to version 4
//     if (e) {
//         e.returnValue = 'Leaving this site WILL result in your work permanatly erased. But your IO data will be kept. Are you sure?';
//     }

//     // For Safari
//     return 'Leaving this site WILL result in your work permanatly erased. But your IO data will be kept. Are you sure?';
// };

name_p1 = ["Colossal", "Decisive", "Marked", "Jaded", "Petite", "Handsome", "Tiny", "Giant", "Likeable", "Exotic", "Big","Small","Long","Special","Bland","Strange","Beautiful",
"Cynical","Sociopathic","Amazing"]
name_p2 = ["Theory", "Cat", "Rice", "Point", "Bean", "Space", "Lemon", "Kitten", "Oil", "Orange","Computer","Apple","Rice","Dog","Water","Brick","Hypothesis","Clue","Television",
"RandomNumber","Cow","Paper","Conference","Wire","Tablet"]
name_p3 = ["Analyser", "Generator", "Picker", "Debugger", "Creator", "Sorter", "Performer", "Manipulater", "Analyser", "Calculator","Finder","Editor","Helper","Selector"]

// set bottom menu height automatically
setInterval(() => {
    document.getElementById("networkname").style.width = `calc(50vw - clamp(1rem, 15vw, 17rem) - 4vh - ${
        document.getElementById("canvas-ctrl").getBoundingClientRect().width/2
    }px)`
}, 10);

let p1 = name_p1[Math.floor(Math.random() * name_p1.length)];
let p2 = name_p2[Math.floor(Math.random() * name_p2.length)];
let p3 = name_p3[Math.floor(Math.random() * name_p3.length)];

var networkname = p1+p2+p3

document.getElementById("networkname").value = networkname