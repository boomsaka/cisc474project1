CAT_WIDTH = $('#cat').width();
CAT_HEIGHT = $('#cat').height();

function Cat() {
    var max_width = 2000;
    //var max_width = $('#gameBoard').width();
    var max_height = $('#gameBoard').height();
  
    // Cat attributes
    this.xPos = 0;
    this.yPos = 0;
    this.dx = 0; // delta x and y
    this.dy = 0;
    this.on_ground = false; // checks if the Cat currently on the ground
    this.jump_power = -14;  // power of the cat's jump, the smaller the #, the higher the cat is able to jump
    this.move_speed = 5;    // the speed of the cat moving right and left
    this.width = CAT_WIDTH; // The cat's width & height are used for collision checking
    this.height = CAT_HEIGHT;
    this.score = 0;
    this.screenXPos = 0;
    this.is_jumping = false;
    this.is_landing = false;
  
    // Update the cat's x position accordingly
    this.updateXpos = function () {
      if (ui.keyHandler.left) {        // if the user pressed 'left' key
        if (this.xPos <= 0) {          // if the cat is at the LEFT boundary
          this.dx = 0;                // do not move the cat
        } else {                       // if not
          this.dx = -this.move_speed; // move the cat by move_speed
        }
      }
      if (ui.keyHandler.right) {                    // if the user pressed 'right' key
        if (this.xPos + CAT_WIDTH >= max_width) {  // if the cat is at the RIGHT boundary
          this.dx = 0;                            // do not move the cat
        } else {                                   // if not
          this.dx = this.move_speed;              // move the cat by move_speed
        }
      }
    }
  
    // Get called when the cat jumps
    this.jump = function () {
      this.dy = this.jump_power;
    }
  
    // Updates the Cat's position!
    this.updatePosition = function () {
      // Make the cat go left or right or jump according to the user's press on keys
      this.updateXpos();
      // If the user pressed up key, and the cat is also on ground, make it jump
      if (ui.keyHandler.up && this.on_ground) { 
        this.jump(); 
      }
  
      // Apply gravity and drag force to dx, dy
      this.dx *= game.world.ground_drag_force;
      this.dy += game.world.gravity;
  
      // Update cat's position
      this.xPos += this.dx;
      this.yPos += this.dy;

      // Update is_jumping
      if (!this.on_ground){
        this.is_jumping = true;
      } else{
        this.is_jumping = false;
      }

      // Update is_landed
      if (!this.on_ground && this.dy < 0){ // when the cat is not on ground & is falling
        this.is_landing = true;
      } else{
        this.is_landing = false;
      }
  
  
      /** Boundary Checking */
      // If the cat is reaching the BOTTOM ground
      if (this.yPos + CAT_HEIGHT >= (game.world.ground_level - 5)) {
        this.yPos = game.world.ground_level - CAT_HEIGHT;
        this.dy = 0;
        this.on_ground = true;
      }
      // If the cat is reaching the TOP ground level
      else if (this.yPos <= 0) {
        this.yPos = 0;
        //this.dy *= -1;
        this.on_ground = false;
      }
      // If the cat is reaching the RIGHT boundary or the LEFT boundary
      else if ((this.xPos + CAT_WIDTH >= max_width) || this.xPos <= 0) {
        this.dx = 0;
      }
      else {
        this.on_ground = false;
      }
    }
  
    // Initialize the cat
    this.cat_init = function () {
      this.xPos = 0;
      this.screenXPos = 0;
      //this.xPos = max_width / 2 - CAT_WIDTH/2; // calculates the cat's x position to be at the center
      this.yPos = game.world.ground_level;
      this.on_ground = true;
      this.dx = 0;
      this.dy = 0;
      this.score = 0;
    }
  }

function updateCatCSSPosition() {
  // Updates cat's position according to the game cat object position
  $('#cat').css('top', game.cat.yPos + 'px');

  var middle = $('#gameBoard').width() / 2 - CAT_WIDTH / 2;
  var dist_traveled = (2000 - middle) - CAT_WIDTH;
  
  //cat is to the left of where screen starts scrolling
  if (game.cat.xPos < middle) {
    $('#cat').css('left', game.cat.xPos + 'px');
    updateStarsCSSPosition(0);
    updateLedgesCSSPosition(0);
  }
  //cat is to the right of where screen stops scrolling
  else if (game.cat.xPos + CAT_WIDTH > (2000 - middle)) {
    $('#cat').css('left', game.cat.xPos - dist_traveled + middle + 'px');
  }
  else {
    $('#backgroundBoard').css('background-position-x', (game.cat.xPos * -1 + middle) + 'px');
    updateStarsCSSPosition(game.cat.xPos * -1 + middle);
    updateLedgesCSSPosition(game.cat.xPos * -1 + middle);
  }
}