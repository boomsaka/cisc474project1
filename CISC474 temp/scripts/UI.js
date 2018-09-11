var UI = function()
{
    var self=this;
    this.game = undefined;
    this.initialize = function()
    {
        self.game = new cat();
        $('#cat').css("top",self.game.yPos+'px');
        $('#cat').css("left",self.game.xPos+'px');
<<<<<<< HEAD

        $('body').keypress(function(event){
            if(event.which == 119){ //w
                self.game.updateYpos(-50);
            }else{
                self.game.updateYpos(50);
            }
=======
        

        $('body').keypress(function(event){
            //alert( event.type + ": " +  event.which );
            if(event.which == 119){
                self.game.updateYpos(-50);
            }
            else if (event.which == 115){
                self.game.updateYpos(50);
            }
            else if (event.which == 97){
                self.game.updateXpos(-50);
            }
            else if (event.which == 100){
                self.game.updateXpos(50);
            }

>>>>>>> 15be42f59afe34341faed56c39853c5e0a7c7805
            $('#cat').css("top",self.game.yPos+'px');
            $('#cat').css("left",self.game.xPos+'px');
        });
    }
    this.initialize();
}

