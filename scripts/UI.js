
function UI(){
    this.keyHandler = new keyPressEvent();
    
    /**
     * Handles the key event.
     * Returns 'key_handler', it has 3 attributes, 'right', 'left', 'up'.
     * When the user pressed down the 'right' key, 'right' attribute is set to 'true'. 
     * When the user released the 'right' key, 'right' attribute is set to 'false'.
     * Same with other attributes.
     */
    function keyPressEvent(){
        document.addEventListener("keydown", KeyHandler);
        document.addEventListener("keyup", KeyHandler);

        const key_handler = {
            right: false,
            left: false,
            up: false,

            /** Do we need to move obstacles? */
            /** For moving obstacles */
            w: false, a: false, s: false, d: false
            /**************************** */
        };

        function KeyHandler(event) {
            const state = event.type === "keydown"

            if (event.keyCode == 39) {          // Right
                key_handler.right = state;
            } else if (event.keyCode == 37) {   // Left
                key_handler.left = state;
            } else if (event.keyCode == 38) {   // Up
                key_handler.up = state;
            }

            event.preventDefault(); // tells the program to ignore the default behavior of the keys
        }

        return key_handler;
    }
}
