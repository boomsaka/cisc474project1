
function gameStart(){
    $('#startScreen').hide();
    $('#gameBoard').show();
    $("#endScreen").css("visibility","hidden");
}
function gameEnd(){
    $('#gameBoard').hide();
    $("#endScreen").css("visibility","visible");
}
function gameRestart(){
    alert("restart");
    $("#endScreen").css("visibility","hidden");
    $('#startScreen').show();
    // $('#gameBoard').hide();
    // $("#endScreen").css("visibility","hidden");
    //$('#finalScore').text("restart");
}