
function btnAddPlayerClick() {
    var newPlayerName = $("#txtNewPlayerName").val();
    var newPlayerColour = $("#colNewPlayerColour").val();

    if (!newPlayerName) {
        alert("Player name cannot be blank!");
        return;
    }
    
    $('#lstPlayers tbody').append(createNewPlayerRowHTML(newPlayerName, newPlayerColour));
    //$("#txtNewPlayerName").val("");
}

function createNewPlayerRowHTML(newPlayerName, newPlayerColour) {
    return '<tr class="newPlayerRow"><td>' + newPlayerName + '</td><td data-colour="' +
        newPlayerColour + '"><div style="width: 8%; background-color: ' +
        newPlayerColour + '; color: ' +
        newPlayerColour + ';">0</div></td><td class="newPlayerDelete" id="btnDeletePlayer' +
        newPlayerName + '" onclick="deleteNewPlayerRow(this)"><i class="bi-x-square"></i></td></tr>';
}

function deleteNewPlayerRow(clickedButton) {
    var playersTableHtml = $("#lstPlayers").html();

    var rowToDelete = $(clickedButton).closest("tr");
    rowToDelete.remove();
}

function btnClearAllPlayersClick(){
    $("#lstPlayers tbody").empty();
}

function btnStartGameClick(url) {
    var newGameName = $("#txtNewGameName").val();

    if (!newGameName) {
        alert("Game name cannot be blank!");
        return;
    }

    var players = [];
    $(".newPlayerRow").each(function () {
        var cellsInThisRow = $(this).find("td");
        
        players.push({
            Name: $(cellsInThisRow[0]).text(),
            Colour: $(cellsInThisRow[1]).data("colour")
        });
    });

    var data = {
        GameName: newGameName,
        Players: players
    };

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: url,
        data: JSON.stringify(data)
     });
}