//WKLIB.index = (function ($) {
    function btnShowLoadInfoClick() { 
        $("#loadGameInfo").show();
    }
    
    function btnLoadGameClick(baseUrl) { 
        location.href = baseUrl + "?gameId=" + $("#txtGameId").val();
    }
    
    function btnCancelLoadGameClick() { 
        $("#loadGameInfo").hide();
    }

//     return {
//         btnShowLoadInfoClick: btnShowLoadInfoClick,
//         btnLoadGameClick: btnLoadGameClick,
//         btnCancelLoadGameClick: btnCancelLoadGameClick
//     };
// })(jQuery);

/* TODO - work out how to convert these to WKLIB.index type files. */