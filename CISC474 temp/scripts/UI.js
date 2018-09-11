var UI = function()
{
    var self=this;
    this.game = undefined;
    this.initialize = function()
    {
        self.game = new cat();
        $('#cat').css("top",self.game.yPos+'px');
        $('#cat').css("left",self.game.xPos+'px');
        

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

            $('#cat').css("top",self.game.yPos+'px');
            $('#cat').css("left",self.game.xPos+'px');
        });
    }
    this.initialize();
}

