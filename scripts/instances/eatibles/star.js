
STAR_WIDTH = 45;
STAR_HEIGHT = 49;

function Star(xPos, yPos, starId) { // starId is the id name for the star object that will be created in the html file
    this.xPos = xPos;
    this.yPos = yPos;
    this.starId = starId;
    this.width = STAR_WIDTH;  // the star's width & height are used for collision checking
    this.height = STAR_HEIGHT;
    this.screenXPos = xPos;
}

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

function updateStarsCSSPosition(scroll_dist) {
  for (var i = 0; i < game.star_list.length; i++) {
    var star_id = '#' + game.star_list[i].starId;
    $(star_id).css("top", game.star_list[i].yPos + 'px');
    $(star_id).css("left", game.star_list[i].xPos+scroll_dist + 'px');
  }
}

function starCollision(obstacle, obstacle_index, game){
  $('#test').text("star collision");
  if (document.getElementById(obstacle.starId)) { // if the star element exist (if the star element is not been deleted yet)
    // remove the star by using the 'starId' attribute from the actual html (each star has an id)
    var star_remove = document.getElementById(obstacle.starId);
    star_remove.parentNode.removeChild(star_remove);

    // Remove the star from the 'star_list'
    game.star_list.splice(obstacle_index, 1);
    game.cat.score += 1;
  } else { } // if 'star' element doensn't exist, just pass
}
  