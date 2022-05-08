const update_multi_ins = (evt) => {
    const multi_ins = document.querySelectorAll(".multi-input-container");
    if(multi_ins.length !== 0){
        multi_ins.forEach(multi_ins_parent => {
            const idfk = multi_ins_parent.childNodes;
            const multi_in_container = idfk[idfk.length-1]; // get last input element
            const input_element = multi_in_container.childNodes[multi_in_container.childNodes.length-1];
            const last_input_element = idfk[idfk.length-2].childNodes[idfk[idfk.length-2].childNodes.length-1];
            setTimeout(() => {
                const last_inp_empty = input_element.value === "";
                
                // if the last elmnt isn't empty, add another box idfk
                if(!last_inp_empty){
                    multi_ins_parent.appendChild(make_multi_in_box());
                }
                
                if(!!last_input_element){
                    const work_you_piece_of_shit = last_input_element.value === "";
                    if(work_you_piece_of_shit){
                        multi_ins_parent.removeChild(multi_ins_parent.childNodes[multi_ins_parent.childNodes.length-1]);
                    }   
                }
            }, 10); // wait 10ms before checking
        })
    }
}

const make_multi_in_box = () => {
    const p = document.createElement("p");
    p.classList.add("multi-input-sep");
    const input = document.createElement("input");
    input.classList.add("number-box", "multi-input-nb");
    input.style = "cursor:text";
    input.placeholder = "?";
    const div = document.createElement("div");
    div.classList.add("multi-input-input");
    div.appendChild(p);
    div.appendChild(input);
    return div
}