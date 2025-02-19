function loadPlayerHuds(gameId) {
    return $.ajax({
        type: 'GET',
        url: 'GetPlayers/' + gameId,
        contentType: "application/json; charset=utf-8",
        success: function (ret) {
            var players = JSON.parse(ret.response);
            displayPlayerHuds(players);
        }
        //TODO - work out how to capture errors (success = false) 
    });
}

function displayPlayerHuds(players) {
    var textColor = calculateTextColorForBackgroundColor("#123456");

    players.forEach(player => {
        var playerTextColor = calculateTextColorForBackgroundColor(player.colour);
        $("#playerHudsContainer").append("<div class='panel'><div class='panel-head' style='background-color: " + player.colour + "; color: " + playerTextColor + ";'>" + player.name + "</div><div class='panel-body' id='playerHud" + player.playerId + "' style='border: solid 1px " + player.colour + "; display:none;'></div></div>");
    });
}