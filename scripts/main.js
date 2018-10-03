function backgroundScroller(game) {
  var elem = document.getElementById("backgroundBoard");   
  var pos = 0;
  var id = setInterval(frame, 20);
  function frame() {
    if (pos == 300) {
        backgroundScroller();
        clearInterval(id);
    } else {
        pos++; 
        elem.style.right = pos + 'px'; 
    }
  }
}


// Create a new game
const game = new Game();   
// backgroundScroller(game); 
game.init();
const ui = new UI();