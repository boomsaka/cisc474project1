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
            if(event.which == 119){ //w
                self.game.updateYpos(-50);
            }else{
                self.game.updateYpos(50);
            }
            $('#cat').css("top",self.game.yPos+'px');
            $('#cat').css("left",self.game.xPos+'px');
        });
    }
    this.initialize();
}

