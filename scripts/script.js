/**
 * Use 'generateStars()' to add stars.
 */

STAR_WIDTH = 45;
STAR_HEIGHT = 49;

CAT_WIDTH = $('#cat').width();
CAT_HEIGHT = $('#cat').height();

// image is broken up into 5 rows of 216 pixels
BLOCK = $('#backgroundBoard').height() * .2;

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
    this.star_list = this.generateStars();
    this.stone_list = this.generateStones();
    this.block_list = this.generateBlocks();
    this.ledge_list = this.generateLedges();

    // Append each item (star/stone/block) to the html according to the lists
    appendStarsToHTML(this.star_list);
    appendStonesToHTML(this.stone_list);
    appendBlocksToHTML(this.block_list);
    appendLedgesToHTML(this.ledge_list);

    // Paint the first frame of our game animation
    requestAnimationFrame(mainLoop);
  }

  /** Add stars to star_list, which the stars in star_list will be append to the html file as elements, and the css draws the stars according to the html */
  this.generateStars = function () {
    var star_list = [
      // Star(xPos, yPos, star_id) 
      // (the star_id needs to be unique, becuase it is used for tracking which star the cat collides into when collision happens)
      new Star(150, 100, 'star1'),
      new Star(300, 200, 'star2'),
      new Star(550, 200, 'star3'),
      new Star(1750, 200, 'star4')
    ]
    return star_list;
  }

  this.generateStones = function () {
    var stone_list = [
      // new Stone(100, 320, 'stone1'),
      // new Stone(250, 320, 'stone2'),
      // new Stone(750, 320, 'stone3')
    ]
    return stone_list;
  }

  this.generateBlocks = function () {
    var block_list = [
      //new Block(BLOCK*5, BLOCK, 'block1') // x, y, block id
    ]
    return block_list;
  }

  this.generateLedges = function () {
    var ledge_list = [
      new Ledge(BLOCK, BLOCK * 3, BLOCK * 2, 'ledge1'),
      new Ledge(BLOCK * 4, BLOCK * 3, BLOCK * 5, 'ledge2'),
      new Ledge(BLOCK * 6, BLOCK * 2, BLOCK * 2, 'ledge3'),
      new Ledge(BLOCK * 9, BLOCK, BLOCK * 2, 'ledge4'),
      new Ledge(BLOCK * 11, BLOCK * 3, BLOCK * 4, 'ledge5'),
      new Ledge(BLOCK * 12, BLOCK * 2, BLOCK * 2, 'ledge6'),
      new Ledge(BLOCK * 16, BLOCK * 3, BLOCK * 3, 'ledge7'),
      new Ledge(BLOCK * 18, BLOCK * 2, BLOCK * 3, 'ledge8')
    ]
    return ledge_list;
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

    var offset = 10;

    // check collision
    if ((obstacle.xPos + obstacle.width > cat.xPos + offset) && (cat.xPos + cat.width > obstacle.xPos + offset) &&
      (obstacle.yPos + obstacle.height > cat.yPos) && (cat.yPos + cat.height > obstacle.yPos)) {

      // if the obstacle is a Star
      if (obstacle_type == 'Star') {
        $('#test').text("star collision");
        if (document.getElementById(obstacle.starId)) { // if the star element exist (if the star element is not been deleted yet)
          // remove the star by using the 'starId' attribute from the actual html (each star has an id)
          var star_remove = document.getElementById(obstacle.starId);
          star_remove.parentNode.removeChild(star_remove);

          // Remove the star from the 'star_list'
          this.star_list.splice(obstacle_index, 1);
          this.cat.score += 1;
        } else { } // if 'star' element doensn't exist, just pass
      }

      // if the obstacle is a Stone or a Block
      else if (obstacle_type == 'Stone' || obstacle_type == "Block") {
        // If the cat is jumping onto the block or stone ** Block & Stone collision checking
        if (Math.abs(this.cat.yPos - obstacle.yPos) < CAT_HEIGHT) {
          if (this.cat.on_ground == false) {
            this.cat.yPos = obstacle.yPos - CAT_HEIGHT;
            this.cat.dy = 0;
            this.cat.on_ground = true;
          }
          else if (this.cat.on_ground && ui.keyHandler.right) {
            this.cat.dx = -this.cat.move_speed;
          }
          else if (this.cat.on_ground && ui.keyHandler.left) {
            this.cat.dx = this.cat.move_speed;
          }
          this.cat.dx *= this.world.ground_drag_force;
          this.cat.xPos += this.cat.dx;
        }
      }

      else if (obstacle_type == 'Ledge') {
        // If the cat is jumping onto the ledge
        if (Math.abs(this.cat.yPos - obstacle.yPos) < CAT_HEIGHT) {
          if (this.cat.on_ground == false) {
            this.cat.yPos = obstacle.yPos - CAT_HEIGHT;
            this.cat.dy = 0;
            this.cat.on_ground = true;
          }
        }
      }
    }
    return Object.getPrototypeOf(obstacle).constructor.name;
  } // checkCollision() ends
}
/******************************************************************************************************************** */


/******************************************************* Cat function *********************************************** */
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
  this.jump_power = -16;  // power of the cat's jump, the smaller the #, the higher the cat is able to jump
  this.move_speed = 5;    // the speed of the cat moving right and left
  this.width = CAT_WIDTH; // The cat's width & height are used for collision checking
  this.height = CAT_HEIGHT;
  this.score = 0;
  this.screenXPos = 0;

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
    if (ui.keyHandler.up && this.on_ground) { this.jump(); }

    // Apply gravity and drag force to dx, dy
    this.dx *= game.world.ground_drag_force;
    this.dy += game.world.gravity;

    // Update cat's position
    this.xPos += this.dx;
    this.yPos += this.dy;


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
/********************************************************************************************************************* */


/********************************************** eatible Star ***********************************************************/
function Star(xPos, yPos, starId) { // starId is the id name for the star object that will be created in the html file
  this.xPos = xPos;
  this.yPos = yPos;
  this.starId = starId;
  this.width = STAR_WIDTH;  // the star's width & height are used for collision checking
  this.height = STAR_HEIGHT;
  this.screenXPos = xPos;
}
/********************************************************************************************************************* */


/**************************************** Functions for Creating Obstacles ********************************************* */
/** Stone */
function Stone(xPos, yPos, stoneId) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.stoneId = stoneId;
  this.width = 100; // the stone's width & height are used for check collision
  this.height = 67;
}

/** Block (such as houses) */
function Block(xPos, yPos, blockId) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.blockId = blockId;
  this.width = 100;
  this.height = 80;
}

function Ledge(xPos, yPos, width, ledgeId) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.ledgeId = ledgeId;
  this.width = width;
  this.height = BLOCK;
  this.screenXPos = xPos;
}
/********************************************************************************************************************* */


/**************************************** Append Stars & Obstacles to HTML **************************************** */
/** Append the star objects in star_list to html */
function appendStarsToHTML(starList) {
  // Create the list element
  var star_list = document.createElement('div');

  for (var i = 0; i < starList.length; i++) {
    var star_item = document.createElement('div');  // create each individual star
    star_item.setAttribute('class', 'star');        // set the class name of each individual star item to 'star'
    star_item.setAttribute('id', starList[i].starId); // set the id of each individual star item to the 'starId'
    star_list.appendChild(star_item);               // append the star item to star_list
  }
  document.getElementById('stars').appendChild(star_list); // append the stars to html element with id = 'stars'
}

function appendStonesToHTML(stoneList) {
  var stone_list = document.createElement('div');

  for (var i = 0; i < stoneList.length; i++) {
    var stone_item = document.createElement('div');
    stone_item.setAttribute('class', 'stone');
    stone_item.setAttribute('id', stoneList[i].stoneId);
    stone_list.appendChild(stone_item);
  }
  document.getElementById('stones').appendChild(stone_list);
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

function appendLedgesToHTML(ledgeList) {
  var ledge_list = document.createElement('div');

  for (var i = 0; i < ledgeList.length; i++) {
    var ledge_item = document.createElement('div');
    ledge_item.setAttribute('class', 'ledge');
    ledge_item.setAttribute('id', ledgeList[i].ledgeId);
    ledge_list.appendChild(ledge_item);
  }
  document.getElementById('ledges').appendChild(ledge_list);
}
/********************************************************************************************************************* */


/************************************* Update Cat, Star & Obstacles CSS Positions ************************************ */
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
  //

}
function updateStonesCSSPosition() {
  for (var i = 0; i < game.stone_list.length; i++) {
    var stone_id = '#' + game.stone_list[i].stoneId;
    $(stone_id).css("top", game.stone_list[i].yPos + 'px');
    $(stone_id).css("left", game.stone_list[i].xPos + 'px');
  }
}
function updateStarsCSSPosition(scroll_dist) {
  for (var i = 0; i < game.star_list.length; i++) {
    var star_id = '#' + game.star_list[i].starId;
    $(star_id).css("top", game.star_list[i].yPos + 'px');
    $(star_id).css("left", game.star_list[i].xPos+scroll_dist + 'px');
  }
}

function updateBlocksCSSPosition() {
  for (var i = 0; i < game.block_list.length; i++) {
    var block_id = '#' + game.block_list[i].blockId;
    $(block_id).css("top", game.block_list[i].yPos + 'px');
    $(block_id).css("left", game.block_list[i].xPos + 'px');
  }
}

function updateLedgesCSSPosition(scroll_dist) {
  for (var i = 0; i < game.ledge_list.length; i++) {
    var ledge_id = '#' + game.ledge_list[i].ledgeId;
    $(ledge_id).css("top", game.ledge_list[i].yPos + 'px');
    $(ledge_id).css("left", game.ledge_list[i].screenXPos+scroll_dist + 'px');
  }
}
/********************************************************************************************************************* */

/** main animation loop */
function mainLoop() { // time passed by requestAnimationFrame
  // Updates the collision text
  $('#test').text("cat: " + game.cat.xPos);

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
  updateStonesCSSPosition();
  updateBlocksCSSPosition();

  // Keep updating our animation on screen by calling this mainLoop function
  requestAnimationFrame(mainLoop);
}