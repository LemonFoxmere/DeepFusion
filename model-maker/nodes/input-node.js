class input_node{
    // fields
    constructor(UUID, dataUUID, wipe_data=true) {

        this.menu_template = [ // set menu template field
            {
                "<>" : "h3",
                "style" : "margin-bottom:1%",
                "html" : "Input"
            },{
                "<>" : "hr",
                "style" : "width: 30%; opacity:0.2; color: white"
            },{
                "<>" : "input",
                "id" : "input-file",
                "type" : "file",
                "style" : "display:none"
            },{
                "<>" : "section",
                "style" : "width: 85%; display:flex; align-items:flex-start; flex-direction:column",
                "html" : [
                    {
                        "<>" : "section",
                        "style" : "width:100%; height:fit-content; display:flex; flex-direction:row; margin-bottom: 0.2rem",
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
                            "style" : "width:fit-content",
                            "html":[{
                                "<>":"p",
                                "id":"default-upload-text",
                                "style" : "margin:0 0.1rem 0 0.1rem",
                                "text":"Default"
                            }]
                        }]
                    },
                    {
                        "<>" : "p",
                        "style" : "font-weight:300; display:flex; align-items:center",
                        "text" : "File Name:",
                        "html" : [{
                            "<>" : "button",
                            "id" : "clear-input",
                            "text" : "Clear"
                        }]
                    }, {
                        "<>" : "p",
                        "id" : "inputmenuname",
                        "style" : "font-weight:500; opacity:0.6",
                        "text" : "${file_name}"
                    },
                    {
                        "<>" : "p",
                        "style" : "font-weight:300; margin-top:3%",
                        "text" : "# of Samples:"
                    }, {
                        "<>" : "p",
                        "id" : "inputmenusamples",
                        "style" : "font-weight:500; opacity:0.6",
                        "text" : "${samples}"
                    },
                    {
                        "<>" : "p",
                        "style" : "font-weight:300; margin-top:3%",
                        "text" : "Sample Dimension:"
                    }, {
                        "<>" : "p",
                        "id" : "inputmenudim",
                        "style" : "font-weight:500; opacity:0.6",
                        "text" : "${dimension}"
                    },
                    {
                        "<>" : "section",
                        "style" : "width:100%; height:1.5rem;"
                    }
                ]
            }
        ]

        this.node_template = [ // set node template field
            {
                "<>" : "div",
                "class" : "node-drag",
                "id" : "${id_tag}header",
                "html": [{
                        "<>" : "h3",
                        "class" : "unselectable node-title",
                        "style" : "cursor:move",
                        "text" : "Input"
                    }, {
                        "<>" : "hr"
                    }, {
                        "<>" : "p",
                        "id" : "inputinfo",
                        "class" : "unselectable node-text",
                        "style" : "cursor:move",
                        "html" : "File: No Data"
                    }, {
                        "<>" : "hr"
                    }, {
                        "<>" : "p",
                        "class" : "unselectable node-text",
                        "style" : "cursor:move",
                        "html" : "Click To Add/Modify"
                    }, { 
                        "<>" : "p",
                        "class" : "unselectable node-text",
                        "style" : "cursor:move",
                        "html" : "Training Input"
                    }]
            }, {
                "<>" : "div",
                "class" : "node-out",
                "id" : "${id_tag}out"
            }
        ]

        this.uuid = UUID; // set node uuid field
        this.data_uuid = dataUUID; // set data uuid field
        let empty_node_data = { // set data field
            "name" : "No Data",
            "data" : null,
            "samples" : null,
            // outdim is requrired by ALL nodes that produces an output. It must be an array, with integers inside.
            "outdim":null,
            "indim":null
        }
        
        create_node(this.uuid, this.data_uuid, this.node_template, "in", this) // create a visual node after both promise are fulfilled 
        
        // CALLBACK DEFINITIONS
        this.populate_menu = data => { // populate menu with data
            let menu_container = create_menu_container()
            let name = data.name
            let samples = data.samples || "N/A"
            let dim = String(data.outdim || "N/A").replace(",","×")
        
            menu_container.innerHTML = json2html.render([{"file_name" : name, "samples" : samples, "dimension": dim}], this.menu_template);
        
            render_menu(menu_container)
            this.add_menu_events()
        }
        this.update_data = (name, value, dim) => { // this runs when the input data is changed | (name of file, content of file, full dimension of file)
            let new_data = JSON.parse(localStorage.getItem(this.data_uuid))
            new_data.name = name // store name in local storage
            new_data.data = value // store value in local storage
            new_data.samples = dim===null?null:dim[0] // store dimension in local storage
            new_data.outdim = dim===null?null:dim.slice(1) // store outdim in local storage
            localStorage.setItem(this.data_uuid, JSON.stringify(new_data)) // write to local storage
        
            document.getElementById("inputinfo").innerHTML = `File: ${name}` // change node display info
            update_non_temp_edges() // update edges to match new width
            
            // ----- the code below will update the data in the menu, if it exists -----
            if(document.getElementById("inputmenuname") !== null) document.getElementById("inputmenuname").innerHTML = `${name}`
            else return // there are no menus to update
    
            // update the menu items
            document.getElementById("inputmenudim").innerHTML = String(new_data.outdim || "N/A").replace(",", "×")
            document.getElementById("inputmenusamples").innerHTML = new_data.samples || "N/A"
        }

        // DATA RECOVERY
        if(wipe_data || JSON.parse(localStorage.getItem(this.data_uuid)) === null){ // if it's brand new or the data never existed
            localStorage.setItem(this.data_uuid, JSON.stringify(empty_node_data)) // write empty data to local storage
        } else { // data recovery
            let dat = JSON.parse(localStorage.getItem(this.data_uuid))
            this.update_data(dat.name, dat.data, [dat.samples, dat.outdim])
        }
    }

    // =============================== HELPER METHODS ===============================  
    
    add_menu_events(){ // NOTE: these events are specific to this node only!!
        // add input field listender
        let e = document.getElementById("input-upload")
        if(e === null) return
            
        document.querySelector("#input-file").onchange = () => {
            let file = document.querySelector("#input-file").files[0], read = new FileReader()
            let file_name = file.name
            let data = null
            let dim = null
    
            // check file type
            if(file.type !== "text/csv"){
                dflog(errormsg, "Upload failed: Only CSV files are supported for now!")
                dflog(blankmsg, "Or if you don't have a CSV file, you can click the <strong>⋮</strong> next to the upload button for a sample dataset.")
                return;
            }

            read.readAsBinaryString(file); // convert to String
            read.onloadend = () => { // NOTE: this MUST be a callback function
                // when uploading, lag stems from here. This needs to be shifted to a backend server for processing in the future.
                // let data = CSVToJSON(read.result)
                
                CSVToJSON(read.result).then(dat => {
                    this.update_data(file_name, dat, detectDim(dat)) // update values
                }) .catch(err => {
                    return -1
                })
            }

        }
    
        // clear file button
        document.getElementById("clear-input").addEventListener("click", (evt) => {
            this.update_data("No Data", null, null)
        })
    
        document.getElementById("input-upload").addEventListener("click", (evt) => {
            document.getElementById("input-file").click()
        })
        document.getElementById("default-input-upload").addEventListener("click", (evt) => { // upload default data
            fetch("../dataset/x.csv").then(res => res.text()).then(rawdat => {
                CSVToJSON(rawdat).then(data => {
                    let dim = detectDim(data)
                    this.update_data("RGB-inputs.csv", data, dim) // update values
                }) .catch(err => {
                    return -1
                })
            }).catch(err => {
                dflog(errormsg, "An internal error has occured, and the default input dataset cannot be loaded. Please submit a bug report here.")
            })
        })
    }
}