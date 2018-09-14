var UI = function()
{
    var self=this;
    self.game = undefined;
    self.initialize = function()
    {
        self.game = new game();
        // update view every .1 second
        setInterval(function(){ self.updateView()}, 100);
        self.ketPressEvent();
    }

    //  update view 
    self.updateView = function(){
        $('#test').text("");
        self.game.update();
        $('#cat').css("top",self.game.cat.yPos+'px');
        $('#cat').css("left",self.game.cat.xPos+'px');
        $('#stone').css("top",self.game.stone.yPos+'px');
        $('#stone').css("left",self.game.stone.xPos+'px');
    }
    // keyPressEvent
    self.ketPressEvent = function(){
        var cat = self.game.cat;
        var stone = self.game.stone;
        $('body').keypress(function(event){
            if(event.which == 119){ // "w"
                cat.updateYpos(-50);
            }
            else if (event.which == 115){ //"s"
                cat.updateYpos(50);
            }
            else if (event.which == 97){ // "a"
                cat.updateXpos(-50);
            }
            else if (event.which == 100){ //"d"
                cat.updateXpos(50);
            }
            else if (event.which == 105){ //"i"
                stone.updateYpos(-50);
            }
            else if (event.which == 107){ //"k"
                stone.updateYpos(50);
            }
            else if (event.which == 106){ //"j"
                stone.updateXpos(-50);
            }
            else if (event.which == 108){ //"l"
                stone.updateXpos(50);
            }
            //asself.updateView();
        });
    }
    this.initialize();
}