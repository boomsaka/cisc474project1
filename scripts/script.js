/** Game includes 'world', 'cat', 'stone' */
function Game(){
  this.world = new World(); // Creates the world which includes gravity and etc.
  this.cat = new Cat();     // Creates a cat 
  this.stone = new Stone(); 

  this.init = function(){
    this.cat.cat_init();
    // Paint the first frame of our game animation
    requestAnimationFrame(mainLoop); 
  }

  // Checks collision between cat and obstacles
  this.checkCollision = function(cat,obj){
    if(Math.abs(cat.xPos- obj.xPos) < 100 && Math.abs(cat.yPos- obj.yPos) < 67){
        $('#test').text("collision");
    }
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

  // Initialize the cat object
  this.cat_init = function(){
    this.xPos = max_width / 2 - cat_width/2; // calculates the cat's x position to be at the center
    this.yPos = 320;
    this.on_ground = true;
    this.dx = 0;
    this.dy = 0;
  }
}

/** Obstacles (stone for now) */
function Stone(){
  this.xPos = 320;
  this.yPos = 320;
  this.dx = 0;
  this.dy = 0;
  this.move_speed = 2;

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

/** main animation loop */
function mainLoop() { // time passed by requestAnimationFrame
  // Updates the collision text
  $('#test').text("");

  // Keep updating the game.cat's object position
  game.cat.updatePosition();
  game.stone.updatePosition();

  // Keep checking if there are collisions occur
  game.checkCollision(game.cat, game.stone);

  // Updates the cat image position according to the game.cat's object position
  $('#cat').css('top', game.cat.yPos + 'px');
  $('#cat').css('left', game.cat.xPos + 'px');

  // Updates the stone position accordingly
  $('#stone').css("top", game.stone.yPos+'px');
  $('#stone').css("left", game.stone.xPos+'px');

  // Keep updating our animation on screen by calling this mainLoop function
  requestAnimationFrame(mainLoop);
}