// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

const ACTION_SELECT_TILE = 0;
const ACTION_SELECT_CUSTOM_OPTION = 1;

$(".panel-head").click(function () {
    alert("sjdfhk");
    $(this).next().slideToggle();
});

function calculateTextColorForBackgroundColor(backColorStr) {
    var backColor = backColorStr.replaceAll("#", "");
    if (backColor.length !== 6) return "#000000";
        
    var backColorRed = Number("0x" + backColor.substring(0, 2));
    var backColorGreen = Number("0x" + backColor.substring(2, 4));
    var backColorBlue = Number("0x" + backColor.substring(4, 6));

    var backColorIntensity = backColorRed * 0.299 + backColorGreen * 0.587 + backColorBlue * 0.114;
    
    return backColorIntensity > 186 ? "#000000" : "#FFFFFF";
}