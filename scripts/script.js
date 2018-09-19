/**
 * Use 'generateStars()' to add stars.
 */

STAR_WIDTH = 45;
STAR_HEIGHT = 49;

CAT_WIDTH = 100;
CAT_HEIGHT = 67;

/** Game includes 'world', 'cat', 'stone' */
function Game(){
  this.world = new World(); // Creates the world which includes gravity and etc.
  this.cat = new Cat();     // Creates a cat 
  this.stone = new Stone(600, 320); 
  this.star_list;
  
  this.init = function(){
    // Initialize the cat
    this.cat.cat_init();
    
    // Generate the stars
    this.star_list = this.generateStars();
    appendStarsToHTML(this.star_list); // css draw the stars according to how many 'star's there are in the html, 
                                       // and the 'star' elements in the html are generated from 'star_list'.
    
    // Paint the first frame of our game animation
    requestAnimationFrame(mainLoop); 
  }

  /** Add stars to star_list, which the stars in star_list will be append to the html file as elements, and the css draws the stars according to the html */
  this.generateStars = function(){
    var star_lst = [
      // Star(xPos, yPos, star_id) 
      // (the star_id needs to be unique, becuase it is used for tracking which star the cat collides into when collision happens)
      new Star(150, 320, 'star1'),  
      new Star(300, 320, 'star2'), 
      new Star(550, 320, 'star3')
    ]
    return star_lst;
  }

  // Checks collision between cat and a LIST OF obstacles
  this.checkCollisionList = function(cat, obstacleList){
    // Go through each obstacle
    for(var i = 0; i < obstacleList.length; i++){
      this.checkCollision(cat, obstacleList[i], i);
    }
  }

  // Checks collision between cat and a SINGLE obstacle
  this.checkCollision = function(cat,obstacle, obstacle_index){
    // Get the type of the obstacle (ex. Stone, Star, etc)
    var obstacle_type = Object.getPrototypeOf(obstacle).constructor.name;

    // check collision
    if((obstacle.xPos + obstacle.width > cat.xPos) && (cat.xPos + cat.width > obstacle.xPos) &&
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
      // if the obstacle is a Stone
      else if(obstacle_type == 'Stone'){
        $('#test').text("STONE collision");
      }
    }

    return Object.getPrototypeOf(obstacle).constructor.name;
  }
}

/** World function */
function World(){
  this.gravity  = 0.7; // the ground gravity (the smaller the #, the taller the cat is able to jump BUT the slower the cat falls down after jumped)
  this.ground_drag_force  = 0.7; // the smaller the #, the more friction the cat will experience on the ground
  this.ground_level  = 390; // (cat_width = 67) + (cat's initial position = 320) = 387
}

/** Cat function */
function Cat(){
  var max_width = $('#playBoard').width();
  var max_height = $('#playBoard').height();
  var cat_width = $('#cat').width();
  var cat_height = $('#cat').height();

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
      } else{                       // if not
        this.dx = -this.move_speed; // move the cat by move_speed
      }
    }
    if(ui.keyHandler.right){                    // if the user pressed 'right' key
      if (this.xPos + cat_width >= max_width){  // if the cat is at the RIGHT boundary
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
    if (this.yPos + cat_height >= (game.world.ground_level-5)) {
      this.yPos = 320;
      this.dy = 0;
      this.on_ground = true;
    } 
    // If the cat is reaching the TOP ground level
    else if (this.yPos <= 0){
      this.dy *= -1;
      this.on_ground = false;
    } 
    // If the cat is reaching the RIGHT boundary or the LEFT boundary
    else if ((this.xPos + cat_width >= max_width) || this.xPos <= 0){ 
      this.dx = 0;
    } 
    else {
      this.on_ground = false;
    }
  }

  // Initialize the cat
  this.cat_init = function(){
    this.xPos = max_width / 2 - cat_width/2; // calculates the cat's x position to be at the center
    this.yPos = 400;
    this.on_ground = true;
    this.dx = 0;
    this.dy = 0;
    this.score = 0;
  }
}

/** Obstacles (stone for now) */
function Stone(xPos, yPos){
  this.xPos = xPos;
  this.yPos = yPos;
  this.dx = 0;
  this.dy = 0;
  this.move_speed = 2;
  this.width = 100; // the stone's width & height are used for check collision
  this.height = 67;

  var max_width = $('#playBoard').width();
  var max_height = $('#playBoard').height();
  var stone_width = $('#stone').width();
  var stone_height = $('#stone').height(); 

  this.updateXpos = function(){
    if (ui.keyHandler.a){ //left
      if (this.xPos <= 0){          // if the stone is at the LEFT boundary
        this.dx = 0;                // do not move the stone
      } else {                       // if not
        this.dx = -this.move_speed; // move the stone by move_speed
      }
    } 
    if(ui.keyHandler.d){ // right
      if (this.xPos + stone_width >= max_width){  // if the stone is at the RIGHT boundary
        this.dx = 0;                            // do not move the stone
      } else {                                   // if not
        this.dx = this.move_speed;              // move the stone by move_speed
      }
    }
  }

  this.updateYpos = function(){
    if(ui.keyHandler.w){ // up
      this.dy = -this.move_speed;
    }
    if (ui.keyHandler.s){ // down
      this.dy = this.move_speed;
    }
  }

  // Updates position of the stone
  this.updatePosition = function(){
    this.updateXpos();
    this.updateYpos();

    // Apply drag force to dx, dy
    this.dx *= game.world.ground_drag_force;
    this.dy *= game.world.ground_drag_force;
    
    // Update stone's position
    this.xPos += this.dx;
    this.yPos += this.dy;
  }
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




function updateCatCSSPosition(){
  // Updates cat's position according to the game cat object position
  $('#cat').css('top', game.cat.yPos + 'px');
  $('#cat').css('left', game.cat.xPos + 'px');
}
function updateStoneCSSPosition(){
  $('#stone').css("top", game.stone.yPos+'px');
  $('#stone').css("left", game.stone.xPos+'px');
}
function updateStarsCSSPosition(){
  for (var i = 0; i < game.star_list.length; i++) {
    var star_id = '#' + game.star_list[i].starId;
    $(star_id).css("top", game.star_list[i].yPos + 'px');
    $(star_id).css("left", game.star_list[i].xPos + 'px');
  }
}

/** main animation loop */
function mainLoop() { // time passed by requestAnimationFrame
  // Updates the collision text
  $('#test').text("");

  // Update the score
  $('#scoreboard').text("Score: " + game.cat.score);

  // Keep updating the game.cat's obstacleect position
  game.cat.updatePosition();
  game.stone.updatePosition();

  // Keep checking if there are collisions occur
  game.checkCollision(game.cat, game.stone);
  game.checkCollisionList(game.cat, game.star_list);


  // Update CSS positions for cat, stone, and stars
  updateCatCSSPosition();
  updateStoneCSSPosition();
  updateStarsCSSPosition();

  

  // Keep updating our animation on screen by calling this mainLoop function
  requestAnimationFrame(mainLoop);
}