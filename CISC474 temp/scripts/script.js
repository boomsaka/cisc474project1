var cat = function(){
    var self = this;
    this.xPos = 100;
    this.yPos = 0;
    this.initialize = function(){
        self.xPos = 500;
        self.yPos = 500;
    }
    this.updateXpos = function(newXpos){
        self.xPos = self.xPos + newXpos;
    }
    this.updateYpos = function(newYpos){
        self.yPos = self.yPos + newYpos;
    }
    this.initialize();
}