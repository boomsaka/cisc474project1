/** Global Variables */
STAR_WIDTH = 45;
STAR_HEIGHT = 52;

function Star(xPos, yPos, id) { // id is the id name for the star object that will be created in the html file
    this.xPos = xPos;
    this.yPos = yPos;
    this.id = id;
    this.width = STAR_WIDTH;  // the star's width & height are used for collision checking
    this.height = STAR_HEIGHT;
    this.screenXPos = xPos;
}

function starCollision(obstacle, obstacle_index, game){
  $('#test').text("star collision");
  // If the star element exist (if the star element is not been deleted yet)
  if (document.getElementById(obstacle.id)) { 
    // Remove the star by using the 'id' attribute from the actual html (each star has an id)
    var star_remove = document.getElementById(obstacle.id);
    star_remove.parentNode.removeChild(star_remove);

    // Remove the star from the 'star_list'
    game.star_list.splice(obstacle_index, 1);
    game.cat.score += 1;
  } else { } // If 'star' element doensn't exist, just pass
}
  