function Brick(xPos, yPos, width, height, id) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.id = id;
    this.width = width; // the stone's width & height are used for check collision
    this.height = height;
    this.screenXPos = xPos;
}

function brickCollision(obstacle, collide_side, game){
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
    // when collides at the bottom & (the cat is going up || the user is pressing the up key)
    else if (collide_side == 'bottom' && (game.cat.dy < 0 || ui.keyHandler.up)){ 
        game.cat.dy = game.cat.move_speed;
    }
    game.cat.dx *= game.world.ground_drag_force;
    game.cat.xPos += game.cat.dx;
    
}