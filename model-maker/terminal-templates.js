const separator = [
    { // node in triangle
        "<>" : "span",
        "text" : "==="
    }
]

const msg = [
    { // node in triangle
        "<>" : "span",
        "text" : "[Fusion] ${msg}"
    }
]

const successmsg = [
    { // node in triangle
        "<>" : "span",
        "text" : "["
    },{ // node in triangle
        "<>" : "span",
        "style" : "color: greenyellow; margin:0",
        "text" : "Success"
    },{ // node in triangle
        "<>" : "span",
        "html" : "] ${msg}"
    }
]

const debugmsg = [
    { // node in triangle
        "<>" : "span",
        "text" : "["
    },{ // node in triangle
        "<>" : "span",
        "style" : "color: #247cff",
        "text" : "Debug"
    },{ // node in triangle
        "<>" : "span",
        "html" : "] ${msg}"
    }
]

const warningmsg = [
    { // node in triangle
        "<>" : "span",
        "text" : "["
    },{ // node in triangle
        "<>" : "span",
        "style" : "color: #ffb300",
        "text" : "Warning"
    },{ // node in triangle
        "<>" : "span",
        "html" : "] ${msg}"
    }
]

const errormsg = [
    { // node in triangle
        "<>" : "span",
        "text" : "["
    },{ // node in triangle
        "<>" : "span",
        "style" : "color: rgb(255, 68, 68); margin:0",
        "text" : "Error"
    },{ // node in triangle
        "<>" : "span",
        "style" : "margin:0; line-height:0",
        "html" : "] ${msg}"
    }
]

const supportmsg = [
    { // node in triangle
        "<>" : "span",
        "text" : "["
    },{ // node in triangle
        "<>" : "span",
        "style" : "color: #e60ef9; margin:0",
        "text" : "Fusion"
    },{ // node in triangle
        "<>" : "span",
        "style" : "margin:0; line-height:0",
        "html" : "] ${msg}"
    }
]

const blankmsg = [
    { // node in triangle
        "<>" : "span",
        "style" : "font-weight:600; margin:0",
        "html" : "${pref}"
    },{
        "<>" : "span",
        "style" : "margin:1vh 0 0 0; line-height:0",
        "html" : "${msg}"
    }
]

// user input msgs
const defaultinput = [
    { // node in triangle
        "<>" : "span",
        "style":"font-weight:400; color:#fff",
        "text" : ">>> "
    },{ // node in triangle
        "<>" : "span",
        "style" : "margin:0; line-height:0; font-weight:400; color:#fff",
        "text" : "${msg}"
    }
]