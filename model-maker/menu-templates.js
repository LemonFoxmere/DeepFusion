// ===================== NODES MENUS =====================
// <input id="training-input" type="file" name="name" style="display: none;" />
// onclick="document.querySelector('#training-input').click();


const RESHAPE_NODE_MENU = [ // uuid, neuronct
    {
        "<>" : "h3",
        "style" : "margin-bottom:1%",
        "html" : "Reshape"
    },{
        "<>" : "hr",
        "style" : "width: 30%; opacity:0.1; color: white",
    },{
        "<>" : "section",
        "class" : "input-parent-container",
        "html" : [
            {
                "<>" : "p",
                "style" : "font-weight:300; margin-top:0.1rem; font-size: 0.9rem",
                "text" : "Original Dimension:",
            }, { // original dim old (for display)
                "<>" : "p",
                "style" : "font-weight:500; opacity:0.6; font-size: 0.9rem",
                "id" : "${uuid}originalshape",
                "text" : "Connect a Node to view"
            },{
                "<>" : "p",
                "style" : "font-weight:300; margin-top:0.5rem; font-size: 0.9rem",
                "text" : "Target Dimension:",
            },
            // bottom padding
            {
                "<>" : "section",
                "style" : "width:100%; height:1.5rem;"
            }
        ],
    },
]

const ACT_NODE_MENU = [ // uuid, value
    {
        "<>" : "h3",
        "style" : "margin-bottom:1%",
        "html" : "Activation Layer"
    },{
        "<>" : "hr",
        "style" : "width: 30%; opacity:0.1; color: white",
    },{
        "<>" : "section",
        "class" : "input-parent-container",
        "html" : [
            {
                "<>" : "p",
                "class" : "unselectable section-text",
                "text" : "Activation:",
            },{
                "<>" : "select",
                "id" : "${uuid}activation",
                "class" : "actiavtion-selector",
                "style" : "margin-top:3%",
                "html" : [ // all the options
                    {
                        "<>" : "option",
                        "value" : "li",
                        "text" : "Linear", 
                    },{
                        "<>" : "option",
                        "value" : "si",
                        "text" : "Sigmoid", 
                    },{
                        "<>" : "option",
                        "value" : "re",
                        "text" : "Relu", 
                    },{
                        "<>" : "option",
                        "value" : "se",
                        "text" : "Selu", 
                    },{
                        "<>" : "option",
                        "value" : "so",
                        "text" : "Softmax", 
                    },{
                        "<>" : "option",
                        "value" : "ta",
                        "text" : "Tanh", 
                    },{
                        "<>" : "option",
                        "value" : "el",
                        "text" : "Elu", 
                    },
                ],
            },
            // bottom padding
            {
                "<>" : "section",
                "style" : "width:100%; height:1.5rem;"
            }
        ],
    },
]

const DROP_NODE_MENU = [ // uuid, neuronct
    {
        "<>" : "h3",
        "style" : "margin-bottom:1%",
        "html" : "Dropout"
    },{
        "<>" : "hr",
        "style" : "width: 30%; opacity:0.1; color: white",
    },{
        "<>" : "section",
        "class" : "input-parent-container",
        "html" : [
            {
                "<>" : "p",
                "class" : "unselectable section-text",
                "text" : "Probability (%):",
            },{ // slider 1
                "<>" : "section",
                "class" : "slider-container",
                "html" : [
                    {
                        "<>" : "input",
                        "type" : "range",
                        "min" : "0",
                        "max" : "90",
                        "value" : "${chance}",
                        "class" : "slider",
                        "id" : "${uuid}prob-slider",
                    }, {
                        "<>" : "input",
                        "type" : "number",
                        "class" : "number-box",
                        "id" : "${uuid}prob",
                    }
                ],
            },
            // bottom padding
            {
                "<>" : "section",
                "style" : "width:100%; height:1.5rem;"
            }
        ],
    },
]


const DEFAULT_NODE_MENU = [
    {
        "<>" : "p",
        "html" : "Click on a node to edit it"
    }
]

// MENU TEMPLATE
const MENU_TEMPLATE = [
    {
        "<>" : "h3",
        "style" : "margin-bottom:1%",
        "html" : "Sample Menu"
    },{
        "<>" : "hr",
        "style" : "width: 30%; opacity:0.1; color: white",
    },{
        "<>" : "section",
        "class" : "input-parent-container",
        "html" : [
            
            /*
             * All the content goes inside here
             */

            // bottom padding
            {
                "<>" : "section",
                "style" : "width:100%; height:1.5rem;"
            }
        ],
    },
]