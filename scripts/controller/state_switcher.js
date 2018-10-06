/** Controls the game state (ex. game start state, game end state) */
function gameStart(){
    $('#startScreen').hide();
    $('#gameBoard').show();
    $("#endScreen").css("visibility","hidden");
    game.init();
}

function gameEnd(){
    $('#gameBoard').hide();
    $("#endScreen").css("visibility","visible");
}

function gameRestart(){
    var loc = $(location).attr('href')
    window.location.replace(loc);
}