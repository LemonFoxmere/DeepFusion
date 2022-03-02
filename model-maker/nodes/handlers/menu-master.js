function render_menu(htmlObject){ // controls the rendering of the menu
    // remove previous menu containers
    node_menu.removeChild(document.querySelector(".node-menu-container"))
    // add new html
    node_menu.appendChild(htmlObject)
}