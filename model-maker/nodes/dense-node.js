class dense_node{
    // fields
    constructor(UUID, dataUUID, wipe_data=true) {

        this.menu_template = [ // set menu template field (uuid, neuronct)
            {
                "<>" : "h3",
                "style" : "margin-bottom:1%;",
                "html" : "Dense"
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
                                "value" : "1",
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
                                "value" : "one",
                                "text" : "Ones", 
                            },{
                                "<>" : "option",
                                "value" : "glu",
                                "text" : "Glorot Uniform", 
                            },{
                                "<>" : "option",
                                "value" : "gln",
                                "text" : "Glorot Normal", 
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

        this.node_template = [ // set node template field
            { // node in triangle
                "<>" : "div",
                "class" : "node-in",
                "id" : "${id_tag}in"
            }, {
                "<>" : "div",
                "class" : "node-drag",
                "id" : "${id_tag}header",
                "html": [{ // display node title
                        "<>" : "h3",
                        "class" : "unselectable node-title",
                        "style" : "cursor:move",
                        "text" : "Dense"
                    }, { // horizontal line
                        "<>" : "hr"
                    }, { // display node info 1
                        "<>" : "p",
                        "id" : "${id_tag}info-neuron",
                        "class" : "unselectable node-text",
                        "style" : "cursor:move",
                        "text" : "Neurons: 30"
                    }, { // display node info 2
                        "<>" : "p",
                        "id" : "${id_tag}info-activation",
                        "class" : "unselectable node-text",
                        "style" : "cursor:move; margin-top:0.2rem",
                        "text" : "Activation: ReLU"
                    }, { // display node info 3
                        "<>" : "p",
                        "id" : "${id_tag}info-usebias",
                        "class" : "unselectable node-text",
                        "style" : "cursor:move; margin-top:0.2rem",
                        "text" : "Using Bias: Yes"
                    }, { // display node info 4
                        "<>" : "p",
                        "id" : "${id_tag}info-kernelinit",
                        "class" : "unselectable node-text",
                        "style" : "cursor:move; margin-top:0.2rem",
                        "text" : "Kernel Init: Glorot Normal"
                    }, { // display node info 5
                        "<>" : "p",
                        "id" : "${id_tag}info-biasinit",
                        "class" : "unselectable node-text",
                        "style" : "cursor:move; margin-top:0.2rem",
                        "text" : "Bias Init: Zeros"
                    }, { // horizontal line
                        "<>" : "hr"
                    }, { // status
                        "<>" : "p",
                        "class" : "unselectable node-text",
                        "style" : "cursor:move",
                        "html" : "Click To Modify"
                    }]
            }, { // node out
                "<>" : "div",
                "class" : "node-out",
                "id" : "${id_tag}out"
            }
        ]

        this.uuid = UUID; // set node uuid field
        this.data_uuid = dataUUID; // set data uuid field
        let empty_node_data = { // set default data field
            "neuron":30,
            "activation":"re",
            "usebias" :true,
            "trainable":true,
            "kernelinit":"gln",
            "biasinit":"zer",
            // outdim is requrired by ALL nodes that produces an output. It must be an array, with integers inside.
            "outdim":[30,1], // shape=(30,1)
            "indim":[null, 1] // shape = (any,1)
        } 
        localStorage.setItem(this.data_uuid, JSON.stringify(empty_node_data)) // write empty data to local storage
        
        create_node(this, "ou") // create a visual node after both promise are fulfilled 

        // CALLBACK DEFINITIONS
        this.populate_menu = data => { // populate menu with data
            let menu_container = create_menu_container() // create the container
            menu_container.innerHTML = json2html.render([{"uuid" : this.uuid}], this.menu_template) // render the tempalte
            render_menu(menu_container)
          
            // add event listeners for all the sliders and controls
            update_menu_slider(this, "neuron", "Neurons") // the neuron slider
            update_menu_dropdown(this, "activation", "Activation", activation_name_std) // the activation selection
            update_menu_dropdown(this, "kernelinit", "Kernel Init", kernel_bias_init_name_std) // the activation selection
            update_menu_dropdown(this, "biasinit", "Bias Init", kernel_bias_init_name_std) // the activation selection
            update_menu_toggle(this, "usebias", "Using Bias", false) // the toggle switch
            update_menu_toggle(this, "trainable", "", true) // the toggle switch

            sync_data_all() // DO NOT DELETE THIS LINE
        }

        this.sync_data = () => {
            let new_data = JSON.parse(localStorage.getItem(this.data_uuid))
            new_data.outdim = [new_data.neuron, 1]
            localStorage.setItem(this.data_uuid, JSON.stringify(new_data))
        }
    }
}