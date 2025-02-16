function loadPlayerHuds(gameId) {
    var data = {
        GameId: gameId
    };

    $.ajax({
        type: 'GET',
        url: 'GetPlayers/' + gameId,
        dataType: 'json',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (ret) {
            var players = JSON.parse(ret.response);
            displayPlayerHuds(players);
        }
        //TODO - work out how to capture errors (success = false) 
    });
}

function displayPlayerHuds(players) {
    players.forEach(player => {
        $("#playerHudsContainer").append("<div id='playerHud" + player.playerId + "' class='playerHud' style='border: 4px solid " + player.colour + "'><div class='col-8' style='color:" + player.colour + "'>" + player.name + "</div></div>");
    });
}