class reshape_node{ // <-- change this to match your node
    // fields
    constructor(UUID, dataUUID, wipe_data=true) {

        this.menu_template = [ // set menu template field (uuid, neuronct)
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
                        "text" : "Input Dimension:",
                    }, { // original dim old (for display)
                        "<>" : "p",
                        "style" : "font-weight:500; opacity:0.6; font-size: 0.9rem",
                        "id" : "${uuid}menuinfo-originalshape",
                        "text" : "Connect a node to view"
                    },{
                        "<>" : "p",
                        "style" : "font-weight:300; margin-top:0.5rem; font-size: 0.9rem",
                        "text" : "Target Dimension:",
                    },{
                        "<>" : "div",
                        "id" : "${uuid}targetdim",
                        "class" : "multi-input-container",
                        "style" : "margin-top:0.5rem",
                        "html" : [
                            {
                                "<>" : "div",
                                "class" : "multi-input-input",
                                "id" : "base_in",
                                "html" : [
                                    {
                                        "<>" : "input",
                                        "class" : "number-box multi-input-nb",
                                        "style" : "cursor:text",
                                        "placeholder" : "?",
                                        "value" : "64"
                                    }
                                ]
                            },{
                                "<>" : "div",
                                "class" : "multi-input-input",
                                "html" : [
                                    {
                                        "<>" : "p",
                                        "class" : "multi-input-sep"
                                    },{
                                        "<>" : "input",
                                        "class" : "number-box multi-input-nb",
                                        "style" : "cursor:text",
                                        "placeholder" : "?",
                                        "value" : "64"
                                    }
                                ]
                            },{
                                "<>" : "div",
                                "class" : "multi-input-input",
                                "html" : [
                                    {
                                        "<>" : "p",
                                        "class" : "multi-input-sep"
                                    },{
                                        "<>" : "input",
                                        "class" : "number-box multi-input-nb",
                                        "style" : "cursor:text",
                                        "placeholder" : "?",
                                    }
                                ]
                            }
                        ]
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
                        "text" : "Reshape"
                    }, { // horizontal line
                        "<>" : "hr"
                    }, { // display node display
                        "<>" : "p",
                        "id" : "${id_tag}info-originalshape",
                        "class" : "unselectable node-text",
                        "style" : "cursor:move",
                        "html" : "Original: Unknown"
                    }, { // display node display
                        "<>" : "p",
                        "id" : "${id_tag}info-targetshape",
                        "class" : "unselectable node-text",
                        "style" : "cursor:move; margin-top:0.2rem",
                        "html" : "Target: 64×64"
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
            "target" : [64,64],
            // outdim is requrired by ALL nodes that produces an output. It must be an array, with integers inside.
            "outdim":[64,64], // shape=target
            "indim":null // shape = any
        } 
        localStorage.setItem(this.data_uuid, JSON.stringify(empty_node_data)) // write empty data to local storage
        
        //                                                           v-- set a unique node code. check standards.js for node codes
        create_node(this, "re") // create a visual node 
        
        // CALLBACK DEFINITIONS
        this.populate_menu = data => { // populate menu with data
            let menu_container = create_menu_container() // create the container
            menu_container.innerHTML = json2html.render([{"uuid" : this.uuid}], this.menu_template) // render the tempalte
            render_menu(menu_container)
            
            // update data
            document.getElementById(`${this.uuid}menuinfo-originalshape`).innerHTML = `${String(data.indim || "Connect a node to view").replace(",","×")}`

            // add event listeners for all the sliders and controls
            sync_data_all() // DO NOT DELETE THIS LINE
        }

        this.sync_data = () => {
            let new_data = JSON.parse(localStorage.getItem(this.data_uuid))

            new_data.outdim = new_data.target // update outdim
            
            // update input dimension
            let from_node_uuid = JSON.parse(localStorage.getItem(this.uuid)).from
            let from_node_dat_uuid = localStorage.getItem(from_node_uuid) ? JSON.parse(localStorage.getItem(from_node_uuid)).data : null
            let from_node_data = JSON.parse(localStorage.getItem(from_node_dat_uuid))
            new_data.indim = from_node_data ? from_node_data.outdim : null

            this.update_display_data(new_data)

            localStorage.setItem(this.data_uuid, JSON.stringify(new_data))
        }
    }

    update_display_data(new_data){
        { // update all attributes on the node
            // update original input shape
            document.getElementById(`${this.uuid}info-originalshape`).innerHTML = `Original: ${String(new_data.indim || "Unknown").replace(",","×")}`
        }{ // update all attributes on the menu
            if(document.getElementById(`${this.uuid}menuinfo-originalshape`) !== null){
                document.getElementById(`${this.uuid}menuinfo-originalshape`).innerHTML = `${String(new_data.indim || "Connect a node to view").replace(",","×")}`
            }
        }
    }
}