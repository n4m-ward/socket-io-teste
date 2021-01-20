const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)

io.on("connection",(socket)=>{

    socket.on("disconnect",()=>{
        console.log("X desconectou: " + socket.id)
    })

    socket.on("mensagem",(data)=>{
        const {msg,username} = data;
        io.emit("showMsg",{msg:`${username}: ${msg}`})
    })
})

app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("index")
})

http.listen(3000,()=>{
    console.log("app rodando")
})