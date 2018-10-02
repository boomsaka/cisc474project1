function Stone(xPos, yPos, stoneId) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.stoneId = stoneId;
    this.width = 100; // the stone's width & height are used for check collision
    this.height = 67;
}

function appendStonesToHTML(stoneList) {
    var stone_list = document.createElement('div');

    for (var i = 0; i < stoneList.length; i++) {
        var stone_item = document.createElement('div');
        stone_item.setAttribute('class', 'stone');
        stone_item.setAttribute('id', stoneList[i].stoneId);
        stone_list.appendChild(stone_item);
    }
    document.getElementById('stones').appendChild(stone_list);
}

function updateStonesCSSPosition() {
    for (var i = 0; i < game.stone_list.length; i++) {
        var stone_id = '#' + game.stone_list[i].stoneId;
        $(stone_id).css("top", game.stone_list[i].yPos + 'px');
        $(stone_id).css("left", game.stone_list[i].xPos + 'px');
    }
}

function stoneCollision(obstacle, collide_side, game){
    // If the cat is jumping onto the block or stone ** Block & Stone collision checking
    if (collide_side == 'top' && game.cat.dy > 0){
        game.cat.yPos = obstacle.yPos - game.cat.height;
        game.cat.dy = 0;
        game.cat.on_ground = true;
    }
    else if(collide_side == 'left' && ui.keyHandler.right){
        game.cat.dx = -game.cat.move_speed;
    } 
    else if(collide_side == 'right' && ui.keyHandler.left){
        game.cat.dx = game.cat.move_speed;
    } 
    else if (collide_side == 'bottom' && ui.keyHandler.up){ // bottom collision check (might need to be fixed)
        game.cat.dy = 0;
    }
    game.cat.dx *= game.world.ground_drag_force;
    game.cat.xPos += game.cat.dx;
    
}