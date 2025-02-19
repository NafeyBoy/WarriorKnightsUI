//WKLIB.index = (function ($) {
function btnShowLoadInfoClick() { 
    $("#selectGameToLoad").show();
}

function btnLoadGameClick() { 
    var data = {
        GameId: $("#txtGameId").val()
    };

    $.ajax({
        type: 'POST',
        url: 'Game/LoadGame',
        dataType: 'json',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (ret) {
            var players = JSON.parse(ret.response);
            for (let i = 0; i < players.length; ++i){
                $("#cmbPlayers").append(createNewPlayerDropdDownItem(players[i].playerId, players[i].name));
            }
            $("#selectPlayerToLoad").show();
        }
        //TODO - work out how to capture errors (success = false) 
    });
}

function createNewPlayerDropdDownItem(newPlayerId, newPlayerName) {
    return '<option value="' + newPlayerId + '">' + newPlayerName +'</option>';
}

function btnLaunchGameClick(baseUrl) {
    location.href = baseUrl + "?gameId=" + $("#txtGameId").val() + "&playerId=" + $("#cmbPlayers").val();    
}

function btnTestGameClick() {
    location.href = "/Game/RunGame?gameId=D91A2989-3776-4D4F-806E-BF293109FC91";
}

function btnCancelLoadGameClick() { 
    $("#selectGameToLoad").hide();
    $("#selectPlayerToLoad").hide();
}



//     return {
//         btnShowLoadInfoClick: btnShowLoadInfoClick,
//         btnLoadGameClick: btnLoadGameClick,
//         btnCancelLoadGameClick: btnCancelLoadGameClick
//     };
// })(jQuery);

/* TODO - work out how to convert these to WKLIB.index type files. */