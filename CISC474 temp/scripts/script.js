
var cat = function(){
    var self = this;
    this.xPos = 100;
    this.yPos = 0;
    this.initialize = function(){
        self.xPos = 500;
        self.yPos = 500;
    }
    this.updateXpos = function(newXpos){
        //if (self.xPos + newXpos <= document.getElementById("playBoard").style.width)
        self.xPos = self.xPos + newXpos;
    }
    this.updateYpos = function(newYpos){
        var max = $('#playBoard').height();
        if ((self.yPos + newYpos+ $('#cat').height()) < max && (self.yPos + newYpos) >= 0){
            self.yPos = self.yPos + newYpos;
        }
    }
    this.initialize();
}