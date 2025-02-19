var currentActionType = -1;

async function loadGame(gameId) {
    try{
        var displayBoard = loadTiles(gameId);
        var displayPlayerHuds = loadPlayerHuds(gameId);
        
        await displayBoard;
        await displayPlayerHuds;

        listenForMessage(gameId);
    }
    catch(e){
        console.error(`WK failure: ${e.message}`);
    }
}

function listenForMessage(gameId) {
    let message = null;
    let tester = 0;
    while (!message) {
        $.ajax({
            type: 'GET',
            url: 'GetPlayerMessage/' + gameId,
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
}

function processPlayerMessage(message) {
    currentActionType = message.actionType;

    switch (message.actionType) {
        case ACTION_SELECT_TILE:
            let playerHud = $("#playerHud" + message.playerId);
            playerHud.append("<div>Please select a tile</div>");
            playerHud.slideToggle();
            $("#boardContainer").addClass("highlightGameElement");
            break;
        case ACTION_SELECT_CUSTOM_OPTION:
            alert("select custom");
            break;
    }
}