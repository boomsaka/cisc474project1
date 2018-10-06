function Game() {
  this.world = new World(); // Creates the world which includes gravity and etc.
  this.cat = new Cat();     // Creates a cat 
  this.star_list;
  this.brick_list;
  this.ledge_list;
  this.total_time = 3000;
  this.time = this.total_time;

  this.init = function () {
    // Initialize the cat
    this.cat.cat_init();

    // Generate the stars and brick
    this.star_list = generateStars();
    this.brick_list = generateBricks();
    this.ledge_list = generateLedges();

    // Append each item (star/brick/ledge) to the html according to the lists
    appendInstanceToHTML(this.star_list, 'stars', 'star');
    appendInstanceToHTML(this.brick_list, 'bricks', 'brick');
    appendInstanceToHTML(this.ledge_list, 'ledges', 'ledge');

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
    // Get the type of the obstacle (ex. Brick, Star, etc)
    var obstacle_type = Object.getPrototypeOf(obstacle).constructor.name;

    var offset = 0;

    // check collision based on different types of obstacles
    if ((obstacle.xPos + obstacle.width > cat.xPos + offset) && (cat.xPos + cat.width > obstacle.xPos + offset) &&
      (obstacle.yPos + obstacle.height > cat.yPos) && (cat.yPos + cat.height > obstacle.yPos)) {

      if (obstacle_type == 'Star') {
        starCollision(obstacle, obstacle_index, this);
      }

      else if (obstacle_type == 'Brick'){
        collide_side = check_collision_side(game.cat, obstacle)
        brickCollision(obstacle, collide_side, this);
      }

      else if (obstacle_type == 'Ledge') {
        collide_side = check_collision_side(game.cat, obstacle);
        ledgeCollision(obstacle, collide_side, this);
      }
    }

    return Object.getPrototypeOf(obstacle).constructor.name;
  }
}


function check_collision_side(cat,obstacle){
  /// Calcualte the distance in x and y, between the center point of cat and obstacle
  var dx  =  (cat.xPos + cat.width/2) - (obstacle.xPos + obstacle.width/2);
  var dy = (cat.yPos + cat.height/2) - (obstacle.yPos + obstacle.height/2);

  var width = (cat.width + obstacle.width)/2;
  var height = (cat.height + obstacle.height)/2;
  var crossWidth = width * dy;
  var crossHeight = height * dx;
  var collide_side = 'none';

  if(Math.abs(dx) <= width && Math.abs(dy) <= height){
      if (crossWidth > crossHeight){
        collide_side = (crossWidth > ( -crossHeight))?'bottom':'left';
      } else {
        collide_side = (crossWidth >  - (crossHeight))?'right':'top';
      }
  }
  return(collide_side);
}


/** main animation loop */
function mainLoop() {
  // Update timer
  $('#time').text(Math.ceil((game.time--)/100));
  if(game.time<0){
    gameEnd();
    $('#finalScore').text(game.cat.score*10);

  }
  // Updates the collision text
  $('#test').text("cat \nxPos: " + game.cat.xPos + "\nyPos: " + game.cat.yPos);

  // Update the score
  $('#score').text(game.cat.score);

  // Keep updating the game.cat's object position
  game.cat.updatePosition();

  // Keep checking if there are collisions occur
  game.checkCollisionList(game.cat, game.star_list);
  game.checkCollisionList(game.cat, game.brick_list);
  game.checkCollisionList(game.cat, game.ledge_list);

  // Update CSS positions for cat, brick, and stars
  updateCatCSSPosition();
  
  // Keep updating our animation on screen by calling this mainLoop function
  requestAnimationFrame(mainLoop);
}