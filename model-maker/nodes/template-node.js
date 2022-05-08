class sample_node{ // <-- change this to match your node
    // fields
    constructor(UUID, dataUUID, wipe_data=true) {

        this.menu_template = [ // set menu template field (uuid, neuronct)
            {
                "<>" : "h3",
                "style" : "margin-bottom:1%;",
                "html" : "Sample" // <-- Layer Name
            },{
                "<>" : "hr",
                "style" : "width: 30%; height:1px; opacity:0.1; color: white",
            },{
                "<>" : "section",
                "class" : "input-parent-container",
                "html" : [
                    
                    // MENU CONTENT GOES HERE

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
            }, // if needed, comment this out
            {
                "<>" : "div",
                "class" : "node-drag",
                "id" : "${id_tag}header",
                "html": [{ // display node title
                        "<>" : "h3",
                        "class" : "unselectable node-title",
                        "style" : "cursor:move",
                        "text" : "Sample" // <-- Node name
                    }, { // horizontal line
                        "<>" : "hr"
                    }, 
                    
                    // NODE CONTENT GOES HERE
                    
                    { // horizontal line
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
           
            // DATA CONTENT GOES HERE

            // outdim is requrired by ALL nodes that produces an output. It must be an array, with integers inside.
            "outdim":[30,1], // shape=(30,1)
            "indim":[null, 1] // shape = (any,1)
        } 
        localStorage.setItem(this.data_uuid, JSON.stringify(empty_node_data)) // write empty data to local storage
        
        //                                                           v-- set a unique node code. check standards.js for node codes
        create_node(this.uuid, this.data_uuid, this.node_template, "xx", this) // create a visual node 
        
        // CALLBACK DEFINITIONS
        this.populate_menu = data => { // populate menu with data
            let menu_container = create_menu_container() // create the container
            menu_container.innerHTML = json2html.render([{"uuid" : this.uuid}], this.menu_template) // render the tempalte
            render_menu(menu_container)
          
            // add event listeners for all the sliders and controls
        }

        this.sync_data = () => {
            return // if syncying data from one attribute to another is required, delete this line and implement it below

            let new_data = JSON.parse(localStorage.getItem(this.data_uuid))

            // DATA SYNCING GOES HERE

            localStorage.setItem(this.data_uuid, JSON.stringify(new_data))
        }
    }
}