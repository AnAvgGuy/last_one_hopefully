const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 8081,host:'127.0.0.1'});

var connections = [];
var idd = 0;
wss.on("connection", ws => {
    console.log("I lived btch");
    idd += 1;
    connections.push({
        socket: ws,
        x: 0,
        y:0,
        id: idd
    });
    ws.send(JSON.stringify({id:idd}));
    console.log("Create new user: " + idd);
    ws.on("message", message => {
        
        const dato = JSON.parse(message);
        
        //console.log( dato.x,  dato.y, dato.id);
        for (let i= 0; i<connections.length; i++){
            if (connections[i].id == dato.id){
                connections[i].x = dato.x;
                connections[i].y = dato.y;
            }
        }
        
        
    });
    ws.on("close", () =>{
        console.log("I didnt");
    });

});
function update(){
    if (connections.length==0){
        idd = 0;
    }
    for (let j= 0; j<connections.length; j++){
        ws = connections[j].socket;

        for (let i= 0; i<connections.length; i++){
            
            
            ws.send(JSON.stringify({
                x: connections[i].x,
                y: connections[i].y,
                first: connections[i].id
            }));
        }
    }
}
setInterval(update,4)