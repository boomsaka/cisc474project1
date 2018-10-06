function Ledge(xPos, yPos, width, height, id) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.id = id;
    this.width = width;
    this.height = height;
    this.screenXPos = xPos;
}

function ledgeCollision(obstacle, collide_side, game){
    // If the cat is jumping onto the ledge & and the cat is falling downwards
    if (collide_side == 'top' && game.cat.dy > 0) {
        game.cat.yPos = obstacle.yPos - CAT_HEIGHT;
        game.cat.dy = 0;
        game.cat.on_ground = true;
    }

    if(collide_side == 'left' && ui.keyHandler.right){
        game.cat.dx = -game.cat.move_speed;
    } 
    else if(collide_side == 'right' && ui.keyHandler.left){
        game.cat.dx = game.cat.move_speed;
    } 
    // When collides at the bottom & (the cat is going up || the user is pressing the up key)
    else if (collide_side == 'bottom' && (game.cat.dy < 0 || ui.keyHandler.up)){ 
        game.cat.dy = game.cat.move_speed;
    }
    game.cat.dx *= game.world.ground_drag_force;
    game.cat.xPos += game.cat.dx;
    

}