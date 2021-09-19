function parse_cmd(command){
    let parts = command.split(' ')

    let execute = null
    let values = []
    let attributes = {}
    // look for command
    for(let i = 0; i < parts.length; i++){
        if(parts[i] !== ''){
            if(execute === null){ // find execution portion
                execute = parts[i]
            } else { // find values or attributes
                if(parts[i][0] === '-'){
                    // add attribute
                    let attr = parts[i].substring(1)
                    let value = i < parts.length-1 ? parts[i+1] : ''
                    attributes[attr] = value
                    i += i < parts.length-1 ? 1 : 0
                } else {
                    // add value
                    values.push(parts[i])
                }
            }
        }    
    }

    console.log(execute)
    console.log(values)
    console.log(attributes)
}

function execute_cmd(){
    
}