function Block(xPos, yPos, blockId) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.blockId = blockId;
    this.width = 100;
    this.height = 80;
}

function appendBlocksToHTML(blockList) {
    var block_list = document.createElement('div');

    for (var i = 0; i < blockList.length; i++) {
        var block_item = document.createElement('div');
        block_item.setAttribute('class', 'block');
        block_item.setAttribute('id', blockList[i].blockId);
        block_list.appendChild(block_item);
    }
    document.getElementById('blocks').appendChild(block_list);
}

function updateBlocksCSSPosition() {
    for (var i = 0; i < game.block_list.length; i++) {
        var block_id = '#' + game.block_list[i].blockId;
        $(block_id).css("top", game.block_list[i].yPos + 'px');
        $(block_id).css("left", game.block_list[i].xPos + 'px');
    }
}

function checkBlockCollision(obstacle, game){
    // If the cat is jumping onto the block or stone ** Block & Stone collision checking
    if (Math.abs(game.cat.yPos- obstacle.yPos) < game.cat.height){
        if(game.cat.on_ground == false) {
            game.cat.yPos = obstacle.yPos - game.cat.height;
            game.cat.dy = 0;
            game.cat.on_ground = true;
        } 
        else if(game.cat.on_ground && ui.keyHandler.right){
            game.cat.dx = -game.cat.move_speed;
        } 
        else if(game.cat.on_ground && ui.keyHandler.left){
            game.cat.dx = game.cat.move_speed;
        } 
        game.cat.dx *= game.world.ground_drag_force;
        game.cat.xPos += game.cat.dx;
    }
}