function render_menu(htmlObject){ // controls the rendering of the menu
    // remove previous menu containers
    node_menu.removeChild(document.querySelector(".node-menu-container"))
    // add new html
    node_menu.appendChild(htmlObject)
}

// ================================== EVENT LISTENER ADDERS ==================================

function update_menu_slider(uuid, data_name, display_name, data_affix="", limit_inputs=false){
    { // ADDING INPUT FIELD EVENTS
        // add input field listender
        let e = document.getElementById(`${uuid}${data_name}`) //check is the dataname that is being updated even exist
        if(e === null) return
        
        // if the slider indeed exists, then set its current value
        document.getElementById(e.id + "-slider").value = JSON.parse(
            localStorage.getItem(
                JSON.parse(localStorage.getItem(uuid)).data
            )
        )[data_name]

        e.value = JSON.parse(localStorage.getItem(
            JSON.parse(localStorage.getItem(uuid)).data
        ))[data_name];

        e.addEventListener("keypress", function (evt) {
            if (evt.which < 48 || evt.which > 57){
                evt.preventDefault();
            }
    
            if (evt.which === 13){
                e.blur()
            }
        }); // prevent unorthodox number entering
        
        e.addEventListener("focusout", (evt) => {
            if(document.getElementById(e.id + "-slider")){
                let slider = document.getElementById(e.id + "-slider")
                if(limit_inputs){ // if limiting is set to true
                    let max_val = slider.max
                    let min_val = slider.min
                    if (Number(e.value) > max_val){
                        e.value = max_val;
                    } else if (Number(e.value) < min_val){
                        e.value = min_val;
                    }
                }
                slider.value = e.value
                update_node_data(e.id.substring(0,e.id.length-data_name.length), data_name, e.value, e.value, name=display_name, affix=data_affix, "", true)
            }
        })
    } { // ADDING SLIDER EVENTS
        let e = document.getElementById(`${uuid}${data_name}-slider`)
        e.onmousedown = (evt) => {
            e.onmousemove = (evt2) => {
                let slider_value = e.value
                if(document.getElementById(e.id.substring(0,e.id.length-7))){
                    document.getElementById(e.id.substring(0,e.id.length-7)).value = slider_value;
                }
                update_node_data(e.id.substring(0,e.id.length-data_name.length-7), data_name, e.value, e.value, name=display_name, affix=data_affix, "", true)
            }
        }
        e.onmouseup = (evt) => {
            e.onmousemove = null
        }
    }
}

function update_menu_dropdown(uuid, data_name, display_name, name_standard){
    let e = document.getElementById(`${uuid}${data_name}`) // check that is the dataname exists
    if(e === null) return

    // if the dropdown indeed exists, then set its current value
    document.getElementById(e.id).value = JSON.parse(
        localStorage.getItem(
            JSON.parse(localStorage.getItem(uuid)).data
        )
    )[data_name]

    e.onchange = (evt) => { // add the event listener
        update_node_data(e.id.substring(0,e.id.length-data_name.length), data_name, e.value, name_standard[e.value],
            name=display_name, affix="", "", true)
    }
}

function update_menu_toggle(uuid, data_name, display_name, toggle_functionality){
    let e = document.getElementById(`${uuid}${data_name}`) // check that is the dataname exists
    if(e === null) return

    // if the slider indeed exists, then set its current value
    document.getElementById(e.id).checked = JSON.parse(
        localStorage.getItem(
            JSON.parse(localStorage.getItem(uuid)).data
        )
    )[data_name] ? true : false

    e.onchange = (evt) => { // add the event listener
        update_node_data(e.id.substring(0,e.id.length-data_name.length), data_name, e.checked, e.checked?"Yes":"No",
            name=display_name, affix="", "", !toggle_functionality)
        if(toggle_functionality){
            set_node_enable_appearance(e.id.substring(0,e.id.length-data_name.length), e.checked)
        }
    }
}