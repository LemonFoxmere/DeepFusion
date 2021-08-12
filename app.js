const http = require('http')
const fs = require('fs')
const express = require ('express')
var path = require('path');

var app = express()
app.use(express.static(__dirname + '/.'));

const port = 3000

// set up to listen on a port
var server = app.listen(port, (error) => {
    if(error){
        console.log("Something went wrong...", error)
    } else {
        console.log("Server is listening on port ", port)
    }
})

app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html'})
    fs.readFile('index.html', (error,data) => {
        if(error){
            res.writeHead(404)
            res.write("404 Page Not Found")
        } else {
            res.write(data)
        }
        res.end()
    })
    //  console.log("recieved request")
})