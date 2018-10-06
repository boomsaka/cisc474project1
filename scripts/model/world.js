function World(){
    // The ground gravity (the smaller the #, the taller the cat is able to jump BUT the slower the cat falls down after jumped)
    this.gravity  = 0.7; 
    // The smaller the #, the more friction the cat will experience on the ground
    this.ground_drag_force  = 0.6; 
    // The ground level the cat collide on
    this.ground_level  = $('#backgroundBoard').height() * .84; 
}