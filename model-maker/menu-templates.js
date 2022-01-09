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
        "style" : "width: 85%; display:flex; alight-items:flex-start; flex-direction:column",
        "html" : [
            {
                "<>" : "button",
                "class" : "absolute-btn",
                "id" : "input-upload",
                "style" : "margin-top:2%; margin-bottom:8%",
                "text" : "Upload File"
            },
            // name
            {
                "<>" : "p",
                "style" : "font-weight:300",
                "text" : "Current File:",
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
                "id" : "inputmenuname",
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
        "style" : "width: 85%; display:flex; alight-items:flex-start; flex-direction:column",
        "html" : [
            {
                "<>" : "button",
                "class" : "absolute-btn",
                "id" : "output-upload",
                "style" : "margin-top:2%; margin-bottom:8%",
                "text" : "Upload File"
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
                "id" : "inputmenuname",
                "style" : "font-weight:500; opacity:0.6",
                "text" : "${dimension}",
            }
        ],
    }
]

const DENSE_NODE_MENU = [ // uuid, neuronct
    {
        "<>" : "h3",
        "style" : "margin-bottom:1%",
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
                "text" : "Neuron Count:",
            },{ // slider 1
                "<>" : "section",
                "class" : "slider-container",
                "html" : [
                    {
                        "<>" : "input",
                        "type" : "range",
                        "min" : "1",
                        "max" : "200",
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
            },{
                "<>" : "hr",
                "style" : "width: 100%; height:1px; opacity:0.1; color: white; margin:7% 0 4% 0",
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
                        "max" : "100",
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