function World(){
    this.gravity  = 0.7; // the ground gravity (the smaller the #, the taller the cat is able to jump BUT the slower the cat falls down after jumped)
    this.ground_drag_force  = 0.6; // the smaller the #, the more friction the cat will experience on the ground
    this.ground_level  = $('#backgroundBoard').height() * .8; // (cat_width = 67) + (cat's initial position = 320) = 387
}