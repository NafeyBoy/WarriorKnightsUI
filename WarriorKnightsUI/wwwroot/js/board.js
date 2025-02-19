var col = 1;
var tileSize = 120;
const eastMid = 150;
const northMid = 75;
const eastMax = 300;
const northMax = 150;

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
    return $.ajax({
        type: 'GET',
        url: 'GetTiles/' + gameId,
        contentType: "application/json; charset=utf-8",
        success: function (ret) {
            var tiles = JSON.parse(ret.response);
            displayBoard(tiles);            
        }
    });
}

function displayBoard(tiles) {
    $("#board").empty();
    
    tiles.sort(sortTilesByEastingsDesc).sort(sortTilesByNorthingsDesc);
    var maxEast = tiles[0].eastings;
    var maxNorth = tiles[0].northings;
    createTileDivs(maxEast, maxNorth);
    drawRoads(tiles);
    drawCities(tiles);
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
    //TODO - alter this method to take an ordered list of tile objects so the id of the board cells can include the tile Id.
    for (let north = maxNorth; north >= 0; --north) {
        for (let east = 0; east <= maxEast; ++east){        
            let borderClass = 'boardTileBorderThreeSides';
            if (east == 0) {
                createBoardRow(north, maxEast);
                borderClass = 'boardTileBorderFull';
            }
            var tileGridRef = String.fromCharCode(97 + east) + north;
            $("#boardRow" + north).append("<td id='tile_" + tileGridRef + "' class='boardCell' style='width: " + tileSize + "px;'><canvas id='" + tileGridRef + "' class='boardTile " + borderClass + "'/></td>");
        }
    }

    // $(".boardCell").click(function () {
    //     alert($(this).attr('id')); 
    // });
    $(".boardCell").click(function () {
        tileClicked($(this)); 
    });
}
function createBoardRow(northIndex, maxEast) {
    $("#board").append("<tr id='boardRow" + northIndex +"' style='padding: 0;'></tr>")
}

function drawRoads(tiles) {
    tiles.forEach(tile => {
        //TODO - work out how to dynamically calculate width, height and midpoints.
        // let eastMid = tileDiv.width() / 2;
        // let northMid = tileDiv.height() / 2;
        // let eastMax = tileDiv.width();
        // let northMax = tileDiv.height();
                       
        var tileGridRef = String.fromCharCode(97 + tile.eastings) + tile.northings;
        const tileCanvasJS = document.getElementById(tileGridRef);
        const tileContext = tileCanvasJS.getContext("2d");
        tileContext.strokeStyle = "brown";
        tileContext.lineWidth = 4;

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
    });
}

function drawCities(tiles) {
    var test = 0;
    let cityEast = eastMid - 25;
    let cityNorth = northMid - 25;

    tiles.forEach(tile => { 
        var tileGridRef = String.fromCharCode(97 + tile.eastings) + tile.northings;
        const tileCanvasJS = document.getElementById(tileGridRef);
        const tileContext = tileCanvasJS.getContext("2d");

        tile.cities.forEach(city => {
            tileContext.beginPath();
            tileContext.lineWidth = 2;
            tileContext.strokeStyle = "red";
            tileContext.strokeRect(cityEast, cityNorth, 50, 50);

            tileContext.font = "20px Arial";
            tileContext.fillText(city.name, cityEast, cityNorth - 4);
            
            tileContext.font = "16px Arial";
            tileContext.fillText(city.defensiveStrength + "/" + city.basicIncome, cityEast, cityNorth + 64);
        })

        ++test;
    });

}

function tileClicked(clickedBoardCell) {
    if (currentActionType == ACTION_SELECT_TILE) {
        let clickedId = clickedBoardCell.attr('id');
        alert("You clicked tile " + clickedId + " when you were supposed to!");
    }
}

