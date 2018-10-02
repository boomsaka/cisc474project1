// image is broken up into 5 rows of 216 pixels
BLOCK = $('#backgroundBoard').height() * .2; // 108

/** Add stars to star_list, which the stars in star_list will be append to the html file as elements, 
 * and the css draws the stars according to the html 
 * */
function generateStars() {
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


function generateStones() {
    var stone_list = [
      new Stone(320, 260, 'stone1'),
      // new Stone(250, 320, 'stone2'),
      // new Stone(750, 320, 'stone3')
    ]
    return stone_list;
}

function generateBlocks() {
    var block_list = [
      //new Block(BLOCK*5, BLOCK, 'block1') // x, y, block id
    ]
    return block_list;
}

function generateLedges() {
    var ledge_list = [
      new Ledge(BLOCK,      BLOCK * 3,  BLOCK * 2, 'ledge1'),
      new Ledge(BLOCK * 4,  BLOCK * 3,  BLOCK * 5, 'ledge2'),
      new Ledge(BLOCK * 6,  BLOCK * 2,  BLOCK * 2, 'ledge3'),
      new Ledge(BLOCK * 9,  BLOCK,      BLOCK * 2, 'ledge4'),
      new Ledge(BLOCK * 11, BLOCK * 3,  BLOCK * 4, 'ledge5'),
      new Ledge(BLOCK * 12, BLOCK * 2,  BLOCK * 2, 'ledge6'),
      new Ledge(BLOCK * 16, BLOCK * 3,  BLOCK * 3, 'ledge7'),
      new Ledge(BLOCK * 18, BLOCK * 2,  BLOCK * 3, 'ledge8')
    ]
    return ledge_list;
}