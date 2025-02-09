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

function loadTiles(gameId) {
    var data = {
        GameId: gameId
    };

    $.ajax({
        type: 'GET',
        url: 'LoadTiles/' + gameId,
        dataType: 'json',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (ret) {
            var tiles = JSON.parse(ret.response);
            displayBoard(tiles);
        }
        //TODO - work out how to capture errors (success = false) 
    });
}

function displayBoard(tiles) {
    $("#board").empty();
    
    tiles.sort(sortTilesByEastingsDesc).sort(sortTilesByNorthingsDesc);
    var maxEast = tiles[0].eastings;
    var maxNorth = tiles[0].northings;
    createTileDivs(maxEast, maxNorth);
    drawRoads(tiles);
}

function sortTilesByEastingsDesc(a, b){
    var aEasting = a.eastings;
    var bEasting = b.eastings; 
    return ((aEasting > bEasting) ? -1 : ((aEasting < bEasting) ? 1 : 0));
}
function sortTilesByNorthingsDesc(a, b){
    var aNorthing = a.northings;
    var bNorthing = b.northings; 
    return ((aNorthing > bNorthing) ? -1 : ((aNorthing < bNorthing) ? 1 : 0));
}

function createTileDivs(maxEast, maxNorth) {
    for (let north = maxNorth; north >= 0; --north) {
        for (let east = 0; east <= maxEast; ++east){        
            if (east == 0) createBoardRow(north, maxEast);
            var tileGridRef = String.fromCharCode(97 + east) + north;
            $("#boardRow" + north).append("<div id='tile_" + tileGridRef + "' class='col-2'><canvas id='" + tileGridRef + "' class='boardTile'/></div>");
        }
    }
}
function createBoardRow(northIndex, maxEast) {
    $("#board").append("<div id='boardRow" + northIndex +"' class='row' style='width: '" + (200 * (maxEast + 1)) + "px;'></div>")
}

function drawRoads(tiles) {
    var test = 0;
    tiles.forEach(tile => {
        var tileGridRef = String.fromCharCode(97 + tile.eastings) + tile.northings;
        
        let tileDiv = $("#tile_" + tileGridRef);
        let eastMid = tileDiv.width() / 2;
        let northMid = tileDiv.height() / 2;
        let eastMax = tileDiv.width();
        let northMax = tileDiv.height();
        
        const tileCanvasJS = document.getElementById(tileGridRef);
        const tileContext = tileCanvasJS.getContext("2d");
        tileContext.strokeStyle = "brown";

        if (tile.roadNorth) {
            tileContext.beginPath();
            tileContext.moveTo(eastMid, 0);
            if (tile.roadSouth) {
                tileContext.lineTo(eastMid, northMax);
            }
            else {
                tileContext.lineTo(eastMid, northMid);
            }
            tileContext.strokeStyle = "brown";
            tileContext.stroke();
        }
        if (tile.roadEast) {
            tileContext.beginPath();
            tileContext.moveTo(eastMax, northMid);
            if (tile.roadWest) {
                tileContext.lineTo(0, northMid);
            }
            else {
                tileContext.lineTo(eastMid, northMid);
            }
            tileContext.strokeStyle = "brown";
            tileContext.stroke();
        }
        if (tile.roadSouth) {
            tileContext.beginPath();
            tileContext.moveTo(eastMid, northMax);
            if (tile.roadNorth) {
                tileContext.lineTo(eastMid, 0);
            }
            else {
                tileContext.lineTo(eastMid, northMid);
            }
            tileContext.strokeStyle = "brown";
            tileContext.stroke();
        }
        if (tile.roadWest) {
            tileContext.beginPath();
            tileContext.moveTo(0, northMid);
            if (tile.roadEast) {
                tileContext.lineTo(eastMax, northMid);
            }
            else {
                tileContext.lineTo(eastMid, northMid);
            }
            tileContext.strokeStyle = "brown";
            tileContext.stroke();
        }
        
        ++test;

    });
}

