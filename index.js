const express=require("express");
const http=require("http");
const path=require('path');

const {Server}=require("socket.io");

const app=express();

const server=http.createServer(app);

app.use(express.static(path.join(__dirname,"public")));

const io=new Server(server);

io.on("connection",(socket)=>{
    console.log("New client connected");
    socket.on('message', (message)=>{
        // console.log('message', message);
        io.emit('message', message);
    })
});


app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname,"public"));
})


server.listen(8976, ()=>{
    console.log("Server is running on port 8976");
})