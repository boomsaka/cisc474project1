/**
 * Use 'generateStars()' in 'instance_generator.js' to add stars.
 */

/** Game includes 'world', 'cat', 'stone' */
function Game() {
  this.world = new World(); // Creates the world which includes gravity and etc.
  this.cat = new Cat();     // Creates a cat 
  this.star_list;
  this.stone_list;
  this.ledge_list;

  this.init = function () {
    // Initialize the cat
    this.cat.cat_init();

    // Generate the stars and stone
    this.star_list = generateStars();
    this.stone_list = generateStones();
    this.block_list = generateBlocks();
    this.ledge_list = generateLedges();

    // Append each item (star/stone/block) to the html according to the lists
    appendStarsToHTML(this.star_list);
    appendStonesToHTML(this.stone_list);
    appendBlocksToHTML(this.block_list);
    appendLedgesToHTML(this.ledge_list);

    // Paint the first frame of our game animation
    requestAnimationFrame(mainLoop);
  }

  

  // Checks collision between cat and a LIST OF obstacles
  this.checkCollisionList = function (cat, obstacleList) {
    // Go through each obstacle
    for (var i = 0; i < obstacleList.length; i++) {
      this.checkCollision(cat, obstacleList[i], i);
    }
  }

  // Checks collision between cat and a SINGLE obstacle
  this.checkCollision = function (cat, obstacle, obstacle_index) {
    // Get the type of the obstacle (ex. Stone, Star, etc)
    var obstacle_type = Object.getPrototypeOf(obstacle).constructor.name;

    var offset = 0;

    // check collision based on different types of obstacles
    if ((obstacle.xPos + obstacle.width > cat.xPos + offset) && (cat.xPos + cat.width > obstacle.xPos + offset) &&
      (obstacle.yPos + obstacle.height > cat.yPos) && (cat.yPos + cat.height > obstacle.yPos)) {

      if (obstacle_type == 'Star') {
        starCollision(obstacle, obstacle_index, this);
      }

      else if (obstacle_type == 'Stone'|| obstacle_type == "Block"){
        collide_side = collide(game.cat, obstacle)
        stoneCollision(obstacle, collide_side, this);
        // checkBlockCollision(obstacle, this);
      }

      else if (obstacle_type == 'Ledge') {
        collide_side = collide(game.cat, obstacle);
        ledgeCollision(obstacle, collide_side, this);
      }
    }

    return Object.getPrototypeOf(obstacle).constructor.name;
  } // checkCollision() ends
}


function collide(cat,obstacle){
  /// calcualte the distance in x and y, between the center point of cat and obstacle
  var dx  =  (cat.xPos + cat.width/2) - (obstacle.xPos + obstacle.width/2);
  var dy = (cat.yPos + cat.height/2) - (obstacle.yPos + obstacle.height/2);

  var width = (cat.width + obstacle.width)/2;
  var height = (cat.height + obstacle.height)/2;
  var crossWidth = width * dy;
  var crossHeight = height * dx;
  var collision = 'none';
  // console.log('crossWidth', crossWidth.toFixed(2), '    crossHeight', crossHeight.toFixed(2));

  if(Math.abs(dx) <= width && Math.abs(dy) <= height){
      if (crossWidth > crossHeight){
          collision = (crossWidth > ( -crossHeight))?'bottom':'left';
      } else {
          collision = (crossWidth >  - (crossHeight))?'right':'top';
      }
  }
  return(collision);
}











/** main animation loop */
function mainLoop() { // time passed by requestAnimationFrame
  // Updates the collision text
  $('#test').text("cat \nxPos: " + game.cat.xPos + "\nyPos: " + game.cat.yPos);

  // Update the score
  $('#scoreboard').text("Score: " + game.cat.score);

  // Keep updating the game.cat's object position
  game.cat.updatePosition();

  // Keep checking if there are collisions occur
  game.checkCollisionList(game.cat, game.star_list);
  game.checkCollisionList(game.cat, game.stone_list);
  game.checkCollisionList(game.cat, game.block_list);
  game.checkCollisionList(game.cat, game.ledge_list);

  // Update CSS positions for cat, stone, and stars
  updateCatCSSPosition();
  updateBlocksCSSPosition();

  // Keep updating our animation on screen by calling this mainLoop function
  requestAnimationFrame(mainLoop);
}