class output_node{
    // fields
    constructor(UUID, dataUUID, wipe_data=true) {

        this.menu_template = [ // set menu template field
            {
                "<>" : "h3",
                "style" : "margin-bottom:1%",
                "html" : "Ground Truth"
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
                        "style" : "width:100%; height:fit-content; display:flex; flex-direction:row; margin-bottom: 0.2rem",
                        "html": [{
                            "<>" : "button",
                            "id" : "output-upload",
                            "style" : "width:100%;",
                            "html":[{
                                "<>":"p",
                                "text":"Upload"
                            }]
                        },{
                            "<>" : "button",
                            "id" : "default-output-upload",
                            "style" : "width:fit-content",
                            "html":[{
                                "<>":"p",
                                "id":"default-upload-text",
                                "style" : "margin:0 0.1rem 0 0.1rem",
                                "text":"Default"
                            }]
                        }],
                    },
        
                    // name
                    {
                        "<>" : "p",
                        "style" : "font-weight:300; display:flex; align-items:center",
                        "text" : "File Name:",
                        "html" : [{
                            "<>" : "button",
                            "id" : "clear-output",
                            "text" : "Clear"
                        }]
                    }, {
                        "<>" : "p",
                        "id" : "outputmenuname",
                        "style" : "font-weight:500; opacity:0.6",
                        "text" : "${file_name}",
                    },
                    // samples
                    {
                        "<>" : "p",
                        "style" : "font-weight:300; margin-top:3%",
                        "text" : "# of Samples:",
                    }, {
                        "<>" : "p",
                        "id" : "outputmenusamples",
                        "style" : "font-weight:500; opacity:0.6",
                        "text" : "${samples}",
                    },
                    // real dimension
                    {
                        "<>" : "p",
                        "style" : "font-weight:300; margin-top:3%",
                        "text" : "Sample Dimension:",
                    }, {
                        "<>" : "p",
                        "id" : "outputmenudim",
                        "style" : "font-weight:500; opacity:0.6",
                        "text" : "${dimension}",
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
                        "style" : "cursor:move; margin-top:0.1rem",
                        "text" : "Ground Truth"
                    }, { // horizontal line
                        "<>" : "hr"
                    }, { // status
                        "<>" : "p",
                        "id" : "outputinfo",
                        "class" : "unselectable node-text",
                        "style" : "cursor:move",
                        "html" : "File: No Data"
                    }, { // horizontal line
                        "<>" : "hr"
                    }, { // display node display
                        "<>" : "p",
                        "class" : "unselectable node-text",
                        "style" : "cursor:move",
                        "html" : "Click To Add/Modify"
                    }, { // more display 
                        "<>" : "p",
                        "class" : "unselectable node-text",
                        "style" : "cursor:move",
                        "html" : "Training GT"
                    }]
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
        
        create_node(this, "ou") // create a visual node after both promise are fulfilled 

        // CALLBACK DEFINITIONS
        this.populate_menu = data => { // populate menu with data
            let menu_container = create_menu_container()
            let name = data.name
            let samples = data.samples || "N/A"
            let dim = String(data.indim || "N/A").replace(",","×")
        
            menu_container.innerHTML = json2html.render([{"file_name" : name, "samples" : samples, "dimension": dim}], this.menu_template);
        
            render_menu(menu_container)
            this.add_menu_events()
            sync_data_all() // DO NOT DELETE THIS LINE
        }
        this.update_data = (name, value, dim) => { // this runs when the output data is changed
            let new_data = JSON.parse(localStorage.getItem(this.data_uuid))
            new_data.name = name // store name in local storage
            new_data.data = value // store value in local storage
            new_data.samples = dim===null?null:dim[0] // store dimension in local storage
            new_data.indim = dim===null?null:dim.slice(1) // store indim in local storage
            localStorage.setItem(this.data_uuid, JSON.stringify(new_data)) // write to local storage
        
            document.getElementById("outputinfo").innerHTML = `File: ${name}` // change node display info
            update_non_temp_edges() // update edges to match new width
            
            // ----- the code below will update the data in the menu, if it exists -----
            if(document.getElementById("outputmenuname") !== null) document.getElementById("outputmenuname").innerHTML = `${name}`
            else return // there are no menus to update
    
            // update the menu items
            document.getElementById("outputmenudim").innerHTML = String(new_data.indim || "N/A").replace(",", "×")
            document.getElementById("outputmenusamples").innerHTML = new_data.samples || "N/A"

            sync_data_all() // DO NOT DELETE THIS LINE
        }
        this.sync_data = () => {
            return // add more code in the future if needed to sync / update data
        }

        // DATA RECOVERY
        if(wipe_data || JSON.parse(localStorage.getItem(this.data_uuid)) === null){ // if it's brand new or the data never existed
            localStorage.setItem(this.data_uuid, JSON.stringify(empty_node_data)) // write empty data to local storage
        } else { // data recovery
            let dat = JSON.parse(localStorage.getItem(this.data_uuid))
            this.update_data(dat.name, dat.data, [dat.samples, dat.indim])
        }
    }

    // =============================== HELPER METHODS ===============================  
    
    add_menu_events(){ // NOTE: these events are specific to this node only!!
        // add output field listender
        let e = document.getElementById("output-upload")
        if(e === null) return
            
        document.querySelector("#output-file").onchange = () => {
            let file = document.querySelector("#output-file").files[0], read = new FileReader()
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
        document.getElementById("clear-output").addEventListener("click", (evt) => {
            this.update_data("No Data", null, null)
        })
    
        document.getElementById("output-upload").addEventListener("click", (evt) => {
            document.getElementById("output-file").click()
        })
        document.getElementById("default-output-upload").addEventListener("click", (evt) => { // upload default data
            fetch("../dataset/y.csv").then(res => res.text()).then(rawdat => {
                CSVToJSON(rawdat).then(data => {
                    let dim = detectDim(data)
                    this.update_data("Predictions.csv", data, dim) // update values
                }) .catch(err => {
                    return -1
                })
            }).catch(err => {
                dflog(errormsg, "An internal error has occured, and the default output dataset cannot be loaded. Please submit a bug report here.")
            })
        })
    }
}