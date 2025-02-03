function btnAddPlayerClick(){
    var newPlayerName = $("#txtNewPlayerName").val();
    var newPlayerColour = $("#colNewPlayerColour").val();
    
    $('#lstPlayers tr:last').after('<tr><td>' + newPlayerName + '</td><td><div style="width: 8%; background-color: ' + newPlayerColour + '; color: ' + newPlayerColour + ';">0</div></td></tr>');
}

function btnStartGameClick(){
    
}