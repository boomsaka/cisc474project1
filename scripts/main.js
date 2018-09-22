function myMove() {
    var elem = document.getElementById("playBoard");   
    var pos = 0;
    var id = setInterval(frame, 20);
    function frame() {
      if (pos == 300) {
          myMove();
        clearInterval(id);
      } else {
        pos++; 
        elem.style.right = pos + 'px'; 
      }
    }
  }
// Create a new game
const game = new Game();   
myMove(); 
game.init();
const ui = new UI();