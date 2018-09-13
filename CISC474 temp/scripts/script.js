
var cat = function(){
    var self = this;
    this.xPos = 0;
    this.yPos = 0;
    this.initialize = function(){
        self.xPos = 430;
        self.yPos = 439;
    }
    this.updateXpos = function(newXpos){
        var max = $('#playBoard').width();
        var cat = $('#cat').width();
        if ((self.xPos + newXpos + cat) < max && (self.xPos + newXpos) >= 0) {
            self.xPos = self.xPos + newXpos;
        } else if (newXpos > 0) {
            self.xPos = max - cat;
        } else {
            self.xPos = 0;
        }
        
    }
    this.updateYpos = function(newYpos){
        var max = $('#playBoard').height();
        var cat = $('#cat').height();
        if ((self.yPos + newYpos + cat) < max && (self.yPos + newYpos) >= 0){
            self.yPos = self.yPos + newYpos;
        } else if (newYpos > 0) {
            self.yPos = max - cat;
        } else {
            self.yPos = 0;
        }
    }
    this.initialize();
}