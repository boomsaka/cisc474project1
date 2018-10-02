
function Ledge(xPos, yPos, width, ledgeId) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.ledgeId = ledgeId;
    this.width = width;
    this.height = BLOCK;
    this.screenXPos = xPos;
}

function appendLedgesToHTML(ledgeList) {
    var ledge_list = document.createElement('div');

    for (var i = 0; i < ledgeList.length; i++) {
        var ledge_item = document.createElement('div');
        ledge_item.setAttribute('class', 'ledge');
        ledge_item.setAttribute('id', ledgeList[i].ledgeId);
        ledge_list.appendChild(ledge_item);
    }
    document.getElementById('ledges').appendChild(ledge_list);
}

function updateLedgesCSSPosition(scroll_dist) {
    for (var i = 0; i < game.ledge_list.length; i++) {
        var ledge_id = '#' + game.ledge_list[i].ledgeId;
        var tempX = game.ledge_list[i].screenXPos+scroll_dist;
        $(ledge_id).css("top", game.ledge_list[i].yPos + 'px');
        $(ledge_id).css("left", tempX + 'px');
    }
}

function ledgeCollision(obstacle, collide_side, game){
    // If the cat is jumping onto the ledge & and the cat is falling downwards
    if (collide_side == 'top' && game.cat.dy > 0) {
        game.cat.yPos = obstacle.yPos - CAT_HEIGHT;
        game.cat.dy = 0;
        game.cat.on_ground = true;
    }
}