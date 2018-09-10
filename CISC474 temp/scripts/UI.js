var UI = function()
{
    var self=this;
    this.game = undefined;
    this.initialize = function()
    {
        self.game = new cat();
        $('#cat').css("top",self.game.xPos+'px');
        $('#cat').css("left",self.game.yPos+'px');

        $('body').keypress(function(event){
            if(event.which == 32){
                self.game.updateXpos(-50);
            }else{
                self.game.updateXpos(50);
            }
            $('#cat').css("top",self.game.xPos+'px');
        });
    }
    this.initialize();
}

