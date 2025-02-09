var col = 1;

function btnDrawClick(){
    var fromx = $("#txtFromX").val();
    var fromy = $("#txtFromY").val();
    var tox = $("#txtToX").val();
    var toy = $("#txtToY").val();

    const theTile = document.getElementById("Tile" + col + "1");
    const ctx = theTile.getContext("2d");
    
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox,toy);
    ctx.strokeStyle = "brown";
    ctx.stroke();
    col += 1;
}

function loadTiles(tileId){
    // const theTile = document.getElementById(tileId);
    // const ctx = theTile.getContext("2d");
    
    // ctx.beginPath();
    // ctx.moveTo(100, 0);
    // ctx.lineTo(100,150);
    // ctx.stroke();
    
    // ctx.moveTo(0, 75);
    // ctx.lineTo(210, 75);
    // ctx.stroke();
}

