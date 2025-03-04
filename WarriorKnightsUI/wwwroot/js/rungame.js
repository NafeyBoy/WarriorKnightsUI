var currentGameId = "";
var currentActionType = -1;
var currentPlayerMessageId = "";

async function loadGame(gameId) {
    try {
        currentGameId = gameId;
        var displayBoard = loadTiles(currentGameId);
        var displayPlayerHuds = loadPlayerHuds(currentGameId);
        
        await displayBoard;
        await displayPlayerHuds;

        listenForMessage(currentGameId);
    }
    catch(e){
        console.error(`WK failure: ${e.message}`);
    }
}

function listenForMessage() {
    console.log("listen start");
    let message = null;
    let tester = 0;
    while (!message) {
        $.ajax({
            type: 'GET',
            url: 'GetPlayerMessage/' + currentGameId,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (ret) {
                message = JSON.parse(ret.response);
            }
            //TODO - work out how to capture errors (success = false) 
            //TODO - create js function to reuse $.ajax call 
        });
    }

    processPlayerMessage(message);
    console.log("listen ends");
}

function processPlayerMessage(message) {
    console.log("process");
    currentActionType = message.actionType;
    currentPlayerMessageId = message.playerMessageId;

    switch (message.actionType) {
        case ACTION_SELECT_TILE:
            let playerHud = $("#playerHud" + message.playerId);
            playerHud.empty();
            playerHud.append("<div>Please select a tile</div>");
            playerHud.slideDown();
            $("#boardContainer").addClass("highlightGameElement");
            break;
        case ACTION_SELECT_CUSTOM_OPTION:
            alert("select custom");
            break;
    }
}

async function respondToPlayerMessage(responseValue) {
    console.log("respond" + responseValue);
    var data = {
        PlayerMessageId: currentPlayerMessageId,
        GameId: currentGameId,
        ResponseValues: { TileId: responseValue }
    };

    return $.ajax({
        type: 'POST',
        url: 'RespondToPlayerMessage',
        dataType: 'json',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        //TODO - work out how to capture errors (success = false) 
    })
        .then((ret) => loadTile(responseValue, currentGameId))
        .then((ret2) => cleanUpAfterPlayerResponse());
}

function cleanUpAfterPlayerResponse() {
    console.log("cleanup");
    if (currentActionType == ACTION_SELECT_TILE) {
        $(".player-hud-body").slideUp();
    }
    
    currentActionType = -1;
    currentPlayerMessageId = "";
    
    //TODO - put this line back in and work out why it's only refreshing board at the process step (listen for message is blocking)
    return;
}
