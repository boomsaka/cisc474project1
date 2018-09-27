/**
 * Use 'generateStars()' to add stars.
 */

STAR_WIDTH = 45;
STAR_HEIGHT = 49;

CAT_WIDTH = $('#cat').width();
CAT_HEIGHT = $('#cat').height();

/** Game includes 'world', 'cat', 'stone' */
function Game(){
  this.world = new World(); // Creates the world which includes gravity and etc.
  this.cat = new Cat();     // Creates a cat 
  this.ledge = new Ledge(550, 320);
  this.star_list;
  this.stone_list;

  this.init = function(){
    // Initialize the cat
    this.cat.cat_init();
    
    // Generate the stars and stone
    this.star_list = this.generateStars();
    this.stone_list = this.generateStones();

    appendStarsToHTML(this.star_list); // css draw the stars according to how many 'star's there are in the html, 
                                       // and the 'star' elements in the html are generated from 'star_list'.
    appendStonesToHTML(this.stone_list);

    // Paint the first frame of our game animation
    requestAnimationFrame(mainLoop); 
  }

  /** Add stars to star_list, which the stars in star_list will be append to the html file as elements, and the css draws the stars according to the html */
  this.generateStars = function(){
    var star_list = [
      // Star(xPos, yPos, star_id) 
      // (the star_id needs to be unique, becuase it is used for tracking which star the cat collides into when collision happens)
      new Star(150, 100, 'star1'),  
      new Star(300, 200, 'star2'), 
      new Star(550, 200, 'star3')
    ]
    return star_list;
  }

  this.generateStones = function(){
    var stone_list = [
      new Stone(100, 320, 'stone1'),
      new Stone(250, 320, 'stone2'),
      new Stone(750, 320, 'stone3')
    ]
    return stone_list;
  }

  // Checks collision between cat and a LIST OF obstacles
  this.checkCollisionList = function(cat, obstacleList){
    // Go through each obstacle
    for(var i = 0; i < obstacleList.length; i++){
      this.checkCollision(cat, obstacleList[i], i);
    }
  }

  // Checks collision between cat and a SINGLE obstacle
  this.checkCollision = function(cat, obstacle, obstacle_index){
    // Get the type of the obstacle (ex. Stone, Star, etc)
    var obstacle_type = Object.getPrototypeOf(obstacle).constructor.name;

    var offset = 10;

    // check collision
    if((obstacle.xPos + obstacle.width > cat.xPos + offset) && (cat.xPos + cat.width > obstacle.xPos + offset) &&
       (obstacle.yPos + obstacle.height > cat.yPos) && (cat.yPos + cat.height > obstacle.yPos)){

      // if the obstacle is a Star
      if (obstacle_type == 'Star'){
        $('#test').text("star collision");
        if (document.getElementById(obstacle.starId)){ // if the star element exist (if the star element is not been deleted yet)
          // remove the star by using the 'starId' attribute from the actual html (each star has an id)
          var star_remove = document.getElementById(obstacle.starId);
          star_remove.parentNode.removeChild(star_remove);

          // Remove the star from the 'star_list'
          this.star_list.splice(obstacle_index, 1); 
          this.cat.score += 1;
        } else{} // if 'star' element doensn't exist, just pass
      }
      
      // if the obstacle is a Stone or a Ledge
      else if (obstacle_type == 'Stone'|| obstacle_type == "Ledge"){
        // If the cat is jumping onto the ledge or stone ** Ledge & Stone collision checking
        if (Math.abs(this.cat.xPos - obstacle.xPos) < obstacle.width && Math.abs(this.cat.yPos- obstacle.yPos) < obstacle.height) {
          if(this.cat.on_ground == false) {
            this.cat.yPos = obstacle.yPos - CAT_HEIGHT;
            this.cat.dy = 0;
            this.cat.on_ground = true;
          } 
          else if(this.cat.on_ground && ui.keyHandler.right){
            this.cat.dx = -this.cat.move_speed;
          } 
          else if(this.cat.on_ground && ui.keyHandler.left){
            this.cat.dx = this.cat.move_speed;
          } 
          this.cat.dx *= this.world.ground_drag_force;
          this.cat.xPos += this.cat.dx;
        }
      }
    }
    return Object.getPrototypeOf(obstacle).constructor.name;
  } // checkCollision() ends
}

/** World function */
function World(){
  this.gravity  = 0.7; // the ground gravity (the smaller the #, the taller the cat is able to jump BUT the slower the cat falls down after jumped)
  this.ground_drag_force  = 0.7; // the smaller the #, the more friction the cat will experience on the ground
  this.ground_level  = 370; // (cat_width = 67) + (cat's initial position = 320) = 387
}

/** Cat function */
function Cat(){
  var max_width = $('#gameBoard').width();
  var max_height = $('#gameBoard').height();

  // Cat attributes
  this.xPos = 0 ;
  this.yPos = 0 ;
  this.dx = 0 ; // delta x and y
  this.dy = 0 ;
  this.on_ground = false; // checks if the Cat currently on the ground
  this.jump_power = -16;  // power of the cat's jump, the smaller the #, the higher the cat is able to jump
  this.move_speed = 5;    // the speed of the cat moving right and left
  this.width = CAT_WIDTH; // The cat's width & height are used for collision checking
  this.height = CAT_HEIGHT;
  this.score = 0;

  // Update the cat's x position accordingly
  this.updateXpos = function(){
    if (ui.keyHandler.left){        // if the user pressed 'left' key
      if (this.xPos <= 0){          // if the cat is at the LEFT boundary
        this.dx = 0;                // do not move the cat
      } else {                       // if not
        this.dx = -this.move_speed; // move the cat by move_speed
      }
    }
    if(ui.keyHandler.right){                    // if the user pressed 'right' key
      if (this.xPos + CAT_WIDTH >= max_width){  // if the cat is at the RIGHT boundary
        this.dx = 0;                            // do not move the cat
      } else{                                   // if not
        this.dx = this.move_speed;              // move the cat by move_speed
      }
    }
  }

  // Get called when the cat jumps
  this.jump = function(){
      this.dy = this.jump_power;
  }

  // Updates the Cat's position!
  this.updatePosition = function(){
    // Make the cat go left or right or jump according to the user's press on keys
    this.updateXpos();
    // If the user pressed up key, and the cat is also on ground, make it jump
    if(ui.keyHandler.up && this.on_ground){ this.jump(); }
  
    // Apply gravity and drag force to dx, dy
    this.dx *= game.world.ground_drag_force;
    this.dy += game.world.gravity;
    
    // Update cat's position
    this.xPos += this.dx;
    this.yPos += this.dy;

    /** Boundary Checking */
    // If the cat is reaching the BOTTOM ground
    if (this.yPos + CAT_HEIGHT >= (game.world.ground_level-5)) {
      this.yPos = 300;
      this.dy = 0;
      this.on_ground = true;
    } 
    // If the cat is reaching the TOP ground level
    else if (this.yPos <= 0){
      this.dy *= -1;
      this.on_ground = false;
    } 
    // If the cat is reaching the RIGHT boundary or the LEFT boundary
    else if ((this.xPos + CAT_WIDTH >= max_width) || this.xPos <= 0){ 
      this.dx = 0;
    } 
    else {
      this.on_ground = false;
    }
  }
  
  // Initialize the cat
  this.cat_init = function(){
    this.xPos = max_width / 2 - CAT_WIDTH/2; // calculates the cat's x position to be at the center
    this.yPos = 400;
    this.on_ground = true;
    this.dx = 0;
    this.dy = 0;
    this.score = 0;
  }
}

/** Ledge (such as houses) */
function Ledge(xPos, yPos) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.width = 100;
  this.height = 80;
}

/** Obstacles (stone for now) */
function Stone(xPos, yPos, stoneId){
  this.xPos = xPos;
  this.yPos = yPos;
  this.stoneId = stoneId;
  this.width = 100; // the stone's width & height are used for check collision
  this.height = 67;
}

/** Star */
function Star(xPos, yPos, starId){ // starId is the id name for the star object that will be created in the html file
  this.xPos = xPos;
  this.yPos = yPos;
  this.starId = starId;
  this.width = STAR_WIDTH;  // the star's width & height are used for collision checking
  this.height = STAR_HEIGHT;
}

/** Append the star objects in star_list to html */
function appendStarsToHTML(starList){
  // Create the list element
  var star_list = document.createElement('div');

  for (var i = 0; i < starList.length; i++){
    var star_item = document.createElement('div');  // create each individual star
    star_item.setAttribute('class', 'star');        // set the class name of each individual star item to 'star'
    star_item.setAttribute('id', starList[i].starId); // set the id of each individual star item to the 'starId'
    star_list.appendChild(star_item);               // append the star item to star_list
  }
  document.getElementById('stars').appendChild(star_list); // append the stars to html element with id = 'stars'
}

function appendStonesToHTML(stoneList){
  var stone_list = document.createElement('div');

  for(var i = 0; i < stoneList.length; i++){
      var stone_item = document.createElement('div');
      stone_item.setAttribute('class', 'stone');
      stone_item.setAttribute('id', stoneList[i].stoneId);
      stone_list.appendChild(stone_item);
  }
  document.getElementById('stones').appendChild(stone_list);
}

function updateCatCSSPosition(){
  // Updates cat's position according to the game cat object position
  $('#cat').css('top', game.cat.yPos + 'px');
  $('#cat').css('left', game.cat.xPos + 'px');
}
function updateStonesCSSPosition(){
  for (var i = 0; i < game.stone_list.length; i++) {
    var stone_id = '#' + game.stone_list[i].stoneId;
    $(stone_id).css("top", game.stone_list[i].yPos + 'px');
    $(stone_id).css("left", game.stone_list[i].xPos + 'px');
  }
}
function updateStarsCSSPosition(){
  for (var i = 0; i < game.star_list.length; i++) {
    var star_id = '#' + game.star_list[i].starId;
    $(star_id).css("top", game.star_list[i].yPos + 'px');
    $(star_id).css("left", game.star_list[i].xPos + 'px');
  }
}

function updateLedgeCSSPosition(){
  $('#ledge').css("left", game.ledge.xPos+'px');
  $('#ledge').css("top", game.ledge.yPos+'px');
}

/** main animation loop */
function mainLoop() { // time passed by requestAnimationFrame
  // Updates the collision text
  $('#test').text("");

  // Update the score
  $('#scoreboard').text("Score: " + game.cat.score);

  // Keep updating the game.cat's object position
  game.cat.updatePosition();

  // Keep checking if there are collisions occur
  game.checkCollisionList(game.cat, game.star_list);
  game.checkCollisionList(game.cat, game.stone_list);
  game.checkCollision(game.cat, game.ledge);

  // Update CSS positions for cat, stone, and stars
  updateCatCSSPosition();
  updateStonesCSSPosition();
  updateStarsCSSPosition();
  updateLedgeCSSPosition();

  // Keep updating our animation on screen by calling this mainLoop function
  requestAnimationFrame(mainLoop);
}