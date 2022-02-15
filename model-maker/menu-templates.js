// ===================== NODES MENUS =====================
// <input id="training-input" type="file" name="name" style="display: none;" />
// onclick="document.querySelector('#training-input').click();
const INPUT_NODE_MENU = [ // file_name
    {
        "<>" : "h3",
        "style" : "margin-bottom:1%",
        "html" : "Input File"
    },{
        "<>" : "hr",
        "style" : "width: 30%; opacity:0.2; color: white",
    },{
        "<>" : "input",
        "id" : "input-file",
        "type" : "file",
        "style" : "display:none",  
    },{
        "<>" : "section",
        "style" : "width: 85%; display:flex; align-items:flex-start; flex-direction:column",
        "html" : [
            {
                "<>" : "section",
                "style" : "width:100%; height:fit-content; display:flex; flex-direction:row;",
                "html": [{
                    "<>" : "button",
                    "id" : "input-upload",
                    "style" : "width:calc(100% - 0rem)",
                    "html":[{
                        "<>":"p",
                        "text":"Upload"
                    }]
                },{
                    "<>" : "button",
                    "id" : "default-input-upload",
                    "class" : "default-upload",
                    "html":[{
                        "<>":"p",
                        "id":"",
                        "class":"default-upload-decor",
                        "text":"···"
                    },{
                        "<>":"p",
                        "id":"default-upload-text",
                        "style":"margin-left:0.1rem",
                        "text":"use default"
                    }]
                }],
            },
            
            // name
            {
                "<>" : "p",
                "style" : "font-weight:300; width:100%",
                "text" : "File Name:",
            }, {
                "<>" : "p",
                "id" : "inputmenuname",
                "style" : "font-weight:500; opacity:0.6",
                "text" : "${file_name}",
            },
            // dimension
            {
                "<>" : "p",
                "style" : "font-weight:300; margin-top:3%",
                "text" : "Dimension:",
            }, {
                "<>" : "p",
                "id" : "inputmenudim",
                "style" : "font-weight:500; opacity:0.6",
                "text" : "${dimension}",
            }
        ],
    }
]

const OUTPUT_NODE_MENU = [ // file_name
    {
        "<>" : "h3",
        "style" : "margin-bottom:1%",
        "html" : "Output File"
    },{
        "<>" : "hr",
        "style" : "width: 30%; opacity:0.2; color: white",
    },{
        "<>" : "input",
        "id" : "output-file",
        "type" : "file",
        "style" : "display:none",
    },{
        "<>" : "section",
        "style" : "width: 85%; display:flex; align-items:flex-start; flex-direction:column",
        "html" : [
            {
                "<>" : "section",
                "style" : "width:100%; height:fit-content; display:flex; flex-direction:row",
                "html": [{
                    "<>" : "button",
                    "id" : "output-upload",
                    "style" : "width:100%",
                    "html":[{
                        "<>":"p",
                        "text":"Upload"
                    }]
                },{
                    "<>" : "button",
                    "id" : "default-output-upload",
                    "class" : "default-upload",
                    "html":[{
                        "<>":"p",
                        "id":"",
                        "class":"default-upload-decor",
                        "text":"···"
                    },{
                        "<>":"p",
                        "id":"default-upload-text",
                        "style":"margin-left:0.1rem",
                        "text":"use default"
                    }]
                }],
            },

            // name
            {
                "<>" : "p",
                "style" : "font-weight:300",
                "text" : "Current File:",
            }, {
                "<>" : "p",
                "id" : "outputmenuname",
                "style" : "font-weight:500; opacity:0.6",
                "text" : "${file_name}",
            },
            // dimension
            {
                "<>" : "p",
                "style" : "font-weight:300; margin-top:3%",
                "text" : "Dimension:",
            }, {
                "<>" : "p",
                "id" : "outputmenudim",
                "style" : "font-weight:500; opacity:0.6",
                "text" : "${dimension}",
            }
        ],
    }
]

const DENSE_NODE_MENU = [ // uuid, neuronct
    {
        "<>" : "h3",
        "style" : "margin-bottom:1%;",
        "html" : "Dense Layer"
    },{
        "<>" : "hr",
        "style" : "width: 30%; height:1px; opacity:0.1; color: white",
    },{
        "<>" : "section",
        "class" : "input-parent-container",
        "html" : [
            // Neuron Count
            {
                "<>" : "p",
                "class" : "unselectable section-text",
                "text" : "Neurons:",
            },{ // slider 1
                "<>" : "section",
                "class" : "slider-container",
                "html" : [
                    {
                        "<>" : "input",
                        "type" : "range",
                        "min" : "1",
                        "max" : "1000",
                        "value" : "${neuronct}",
                        "class" : "slider",
                        "id" : "${uuid}neuron-slider",
                    }, {
                        "<>" : "input",
                        "type" : "number",
                        "class" : "number-box",
                        "id" : "${uuid}neuron",
                    },
                ],
            },
            // Activation Selection
            {
                "<>" : "p",
                "class" : "unselectable section-text",
                "style" : "margin-top:5%",
                "text" : "Activation:",
            },{
                "<>" : "select",
                "id" : "${uuid}activation",
                "class" : "actiavtion-selector",
                "style" : "margin-top:0.3rem",
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
            
            // initializer and regulator settings
            { 
                "<>" : "hr",
                "style" : "width: 100%; height:1px; opacity:0.1; color: white; margin:0.75rem 0 0.75rem 0",
            },

            // Kernel Initializer Selection
            {
                "<>" : "p",
                "class" : "unselectable section-text",
                "style" : "margin-top:0.5rem",
                "text" : "Kernel Initializer:",
            },{
                "<>" : "select",
                "id" : "${uuid}kernelinit",
                "class" : "actiavtion-selector",
                "style" : "margin-top:0.3rem",
                "html" : [ // all the options
                    {
                        "<>" : "option",
                        "value" : "gln",
                        "text" : "Glorot Normal (default)", 
                    },{
                        "<>" : "option",
                        "value" : "glu",
                        "text" : "Glorot Uniform", 
                    },{
                        "<>" : "option",
                        "value" : "con",
                        "text" : "Constant", 
                    },{
                        "<>" : "option",
                        "value" : "hen",
                        "text" : "He-Normal", 
                    },{
                        "<>" : "option",
                        "value" : "heu",
                        "text" : "He-Uniform", 
                    },{
                        "<>" : "option",
                        "value" : "lec",
                        "text" : "LeCun Normal", 
                    },{
                        "<>" : "option",
                        "value" : "leu",
                        "text" : "LeCun Uniform", 
                    },{
                        "<>" : "option",
                        "value" : "one",
                        "text" : "Ones", 
                    },{
                        "<>" : "option",
                        "value" : "zer",
                        "text" : "Zeros", 
                    },{
                        "<>" : "option",
                        "value" : "ort",
                        "text" : "Orthogonal", 
                    },{
                        "<>" : "option",
                        "value" : "ran",
                        "text" : "Random Normal", 
                    },{
                        "<>" : "option",
                        "value" : "rau",
                        "text" : "Random Uniform", 
                    },{
                        "<>" : "option",
                        "value" : "trn",
                        "text" : "Truncated Normal", 
                    },{
                        "<>" : "option",
                        "value" : "var",
                        "text" : "Varience Scaling", 
                    }
                ],
            },
            
            // Bias initializer selection
            {
                "<>" : "p",
                "class" : "unselectable section-text",
                "style" : "margin-top:0.75rem",
                "text" : "Bias Initializer:",
            },{
                "<>" : "select",
                "id" : "${uuid}biasinit",
                "class" : "actiavtion-selector",
                "style" : "margin-top:0.3rem",
                "html" : [ // all the options
                    {
                        "<>" : "option",
                        "value" : "zer",
                        "text" : "Zeros (default)", 
                    },{
                        "<>" : "option",
                        "value" : "zer",
                        "text" : "Glorot Uniform", 
                    },{
                        "<>" : "option",
                        "value" : "gln",
                        "text" : "Glorot Normal", 
                    },{
                        "<>" : "option",
                        "value" : "con",
                        "text" : "Constant", 
                    },{
                        "<>" : "option",
                        "value" : "hen",
                        "text" : "He-Normal", 
                    },{
                        "<>" : "option",
                        "value" : "heu",
                        "text" : "He-Uniform", 
                    },{
                        "<>" : "option",
                        "value" : "lec",
                        "text" : "LeCun Normal", 
                    },{
                        "<>" : "option",
                        "value" : "leu",
                        "text" : "LeCun Uniform", 
                    },{
                        "<>" : "option",
                        "value" : "one",
                        "text" : "Ones", 
                    },{
                        "<>" : "option",
                        "value" : "ort",
                        "text" : "Orthogonal", 
                    },{
                        "<>" : "option",
                        "value" : "ran",
                        "text" : "Random Normal", 
                    },{
                        "<>" : "option",
                        "value" : "rau",
                        "text" : "Random Uniform", 
                    },{
                        "<>" : "option",
                        "value" : "trn",
                        "text" : "Truncated Normal", 
                    },{
                        "<>" : "option",
                        "value" : "var",
                        "text" : "Varience Scaling", 
                    }
                ],
            }
            
            // Training settings
            ,{
                "<>" : "hr",
                "style" : "width: 100%; height:1px; opacity:0.1; color: white; margin:0.75rem 0 0.75rem 0",
            },{ //checkbox for using bias
                "<>" : "section",
                "class" : "slider-container",
                "style" : "justify-content: space-between;",
                "html" : [
                    {
                        "<>" : "p",
                        "class" : "unselectable section-text",
                        "text" : "Using Bias",
                    },{
                        "<>" : "label",
                        "style" : "margin-left:5%; margin-top:2%",
                        "class" : "switch",
                        "html" : [
                            {
                                "<>" : "input",
                                "type" : "checkbox",
                                "id" : "${uuid}usebias",
                                "class" : "custom-checkbox",
                                "checked" : ""
                            },{
                                "<>" : "span",
                                "class" : "checkbox-slider round",
                            }
                        ]
                    }
                ],
            },{ //checkbox for trainable
                "<>" : "section",
                "class" : "slider-container",
                "style" : "justify-content: space-between; margin-top:0.25rem",
                "html" : [
                    {
                        "<>" : "p",
                        "class" : "unselectable section-text",
                        "text" : "Trainable",
                    },{
                        "<>" : "label",
                        "style" : "margin-left:5%; margin-top:2%",
                        "class" : "switch",
                        "html" : [
                            {
                                "<>" : "input",
                                "type" : "checkbox",
                                "id" : "${uuid}trainable",
                                "class" : "custom-checkbox",
                                "checked" : ""
                            },{
                                "<>" : "span",
                                "class" : "checkbox-slider round",
                            }
                        ]
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
            }
        ],
    },
]

const DROP_NODE_MENU = [ // uuid, neuronct
    {
        "<>" : "h3",
        "style" : "margin-bottom:1%",
        "html" : "Dropout Layer"
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
            }
        ],
    },
]

// place holder

const DEFAULT_NODE_MENU = [{
    "<>" : "p",
    "html" : "Click on a node to edit it"
}]