//game class
var game = function(){
    this.cat = new cat();
    this.stone = new stone();
    this.initialize = function(){
    }
 
    this.collision = function(c,o){
        if(Math.abs(c.xPos- o.xPos)<100 && Math.abs(c.yPos- o.yPos)<67){
            $('#test').text("collision");
        }
    }  

    this.update = function(time){
        this.collision(this.cat,this.stone);
    }
    this.initialize();
}

// cat class and cat function
var cat = function(){
    var self = this;
    this.xPos = 0;
    this.yPos = 0;
    this.initialize = function(){
        self.xPos = 430;
        self.yPos = 440;
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

var stone = function(){
    var self = this;
    this.xPos = 0;
    this.yPos = 0;
    this.initialize = function(){
        self.xPos = 330;
        self.yPos = 440;
    }
    
    this.updateXpos = function(newXpos){
        var max = $('#playBoard').width();
        var cat = $('#stone').width();
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
        var stone = $('#stone').height();
        if ((self.yPos + newYpos + stone) < max && (self.yPos + newYpos) >= 0){
            self.yPos = self.yPos + newYpos;
        } else if (newYpos > 0) {
            self.yPos = max - stone;
        } else {
            self.yPos = 0;
        }
    }
    this.initialize();
}