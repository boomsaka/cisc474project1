// image is broken up into 5 rows of 216 pixels
BLOCK = $('#backgroundBoard').height() * .2; // 108
BRICK_WIDTH = 79;
BRICK_HEIGHT = 76;

LEDGE_WIDTH = 90;
LEDGE_HEIGHT = 40;

STAR_WIDTH = 45;
STAR_HEIGHT = 52;

ground_level = 453.6;

/** Functions for generating instances */
function generateStars() {
    this.generateTripleStarsDownward = function(starting_x, starting_y, starting_id, gap_x, gap_y){
        var ids = ['star' + starting_id, 'star' + starting_id+1, 'star' + starting_id+2];
        var star_lst = [
            new Star(starting_x, starting_y, ids[0]),
            new Star(starting_x + STAR_WIDTH + gap_x, starting_y + STAR_HEIGHT + gap_y, ids[1]),
            new Star(starting_x + STAR_WIDTH*2  + gap_x*2, starting_y + STAR_HEIGHT*2 + gap_y*2, ids[2]),
        ]
        return star_lst;
    }

    this.generateTripleStarsUpward = function(starting_x, starting_y, starting_id, gap_x, gap_y){
        var ids = ['star' + starting_id, 'star' + starting_id+1, 'star' + starting_id+2];
        var star_lst = [
            new Star(starting_x, starting_y, ids[0]),
            new Star(starting_x + STAR_WIDTH + gap_x, starting_y - STAR_HEIGHT - gap_y, ids[1]),
            new Star(starting_x + STAR_WIDTH*2  + gap_x*2, starting_y - STAR_HEIGHT*2 - gap_y*2, ids[2]),
        ]
        return star_lst;
    }

    this.generateStarsAtSpecifiedPosition = function(){
        var star_lst = [
            // new Star(680, 310, 'star20'),
            // new Star(740, 330, 'star21'),
            // new Star(800, 350, 'star22'),
            // new Star(850, 370, 'star23'),
            // new Star(680, 360, 'star24'),
            // new Star(680, 410, 'star25'),
            // new Star(740, 390, 'star26'),
            // new Star(800, 410, 'star27'),
        ]
        return star_lst;
    }

    var star_list = this.generateTripleStarsUpward(350, 300, 1, 50, 20).concat
                    (this.generateTripleStarsDownward(700, 120, 4, 90, 10)).concat
                    (this.generateStarsAtSpecifiedPosition());

    return star_list;
}

function generateBricks() {
    this.generateTripleBricks = function(starting_x, starting_id){
        var gap = 100;   // the gap space between bricks
        var offset = 4;
        var ids = ['brick' + starting_id, 'brick' + starting_id+1, 'brick' + starting_id+2, 'brick' + starting_id+3, 'brick' + starting_id+4, 'brick' + starting_id+5];
        var brick_lst = [
            new Brick(starting_x,  ground_level - BRICK_HEIGHT, BRICK_WIDTH, BRICK_HEIGHT, ids[0]),

            new Brick(starting_x + BRICK_WIDTH + gap, ground_level - BRICK_HEIGHT*2 + offset, BRICK_WIDTH, BRICK_HEIGHT, ids[1]),
            new Brick(starting_x + BRICK_WIDTH + gap, ground_level - BRICK_HEIGHT, BRICK_WIDTH, BRICK_HEIGHT, ids[2]),

            new Brick(starting_x + BRICK_WIDTH * 2 + gap*2, ground_level - BRICK_HEIGHT*3 + offset*2, BRICK_WIDTH, BRICK_HEIGHT, ids[3]),
            new Brick(starting_x + BRICK_WIDTH * 2 + gap*2, ground_level - BRICK_HEIGHT*2 + offset, BRICK_WIDTH, BRICK_HEIGHT, ids[4]),
            new Brick(starting_x + BRICK_WIDTH * 2 + gap*2, ground_level - BRICK_HEIGHT, BRICK_WIDTH, BRICK_HEIGHT, ids[5]),
        ]

        return brick_lst;
    }

    this.generateTripleBricksBackwards = function(starting_x, starting_id){
        var gap = 100;   // the gap space between bricks
        var offset = 4;
        var ids = ['brick' + starting_id, 'brick' + starting_id+1, 'brick' + starting_id+2, 'brick' + starting_id+3, 'brick' + starting_id+4, 'brick' + starting_id+5];
        var brick_lst = [
            new Brick(starting_x + BRICK_WIDTH * 2 + gap*2,  ground_level - BRICK_HEIGHT, BRICK_WIDTH, BRICK_HEIGHT, ids[0]),

            new Brick(starting_x + BRICK_WIDTH + gap, ground_level - BRICK_HEIGHT*2 + offset, BRICK_WIDTH, BRICK_HEIGHT, ids[1]),
            new Brick(starting_x + BRICK_WIDTH + gap, ground_level - BRICK_HEIGHT, BRICK_WIDTH, BRICK_HEIGHT, ids[2]),

            new Brick(starting_x, ground_level - BRICK_HEIGHT*3 + offset*2, BRICK_WIDTH, BRICK_HEIGHT, ids[3]),
            new Brick(starting_x, ground_level - BRICK_HEIGHT*2 + offset, BRICK_WIDTH, BRICK_HEIGHT, ids[4]),
            new Brick(starting_x, ground_level - BRICK_HEIGHT, BRICK_WIDTH, BRICK_HEIGHT, ids[5]),
        ]

        return brick_lst;
    }

    brick_list = this.generateTripleBricks(320, 1).concat
                 (this.generateTripleBricks(1850, 7)).concat
                 (this.generateTripleBricksBackwards(2500, 20));
    
    return brick_list;
}

function generateLedges() {
    this.generateTripleLedgesDownward = function(starting_x, starting_y, starting_id){
        var gap = 10;
        var ids = ['ledge' + starting_id, 'ledge' + starting_id+1, 'ledge' + starting_id+2]
        var ledge_lst = [
            new Ledge(starting_x, starting_y, LEDGE_WIDTH, LEDGE_HEIGHT,ids[0]),
            new Ledge(starting_x + LEDGE_WIDTH + gap, starting_y + LEDGE_HEIGHT + gap, LEDGE_WIDTH, LEDGE_HEIGHT,ids[1]),
            new Ledge(starting_x + LEDGE_WIDTH*2  + gap*2, starting_y + LEDGE_HEIGHT*2 + gap*2, LEDGE_WIDTH, LEDGE_HEIGHT,ids[2]),
        ]
        return ledge_lst;
    }

    this.generateTripleLedgesUpward = function(starting_x, starting_y, starting_id){
        var gap = 10;
        var ids = ['ledge' + starting_id, 'ledge' + starting_id+1, 'ledge' + starting_id+2]
        var ledge_lst = [
            new Ledge(starting_x, starting_y, LEDGE_WIDTH, LEDGE_HEIGHT,ids[0]),
            new Ledge(starting_x + LEDGE_WIDTH + gap, starting_y - LEDGE_HEIGHT - gap, LEDGE_WIDTH, LEDGE_HEIGHT,ids[1]),
            new Ledge(starting_x + LEDGE_WIDTH*2  + gap*2, starting_y - LEDGE_HEIGHT*2 - gap*2, LEDGE_WIDTH, LEDGE_HEIGHT,ids[2]),
        ]
        return ledge_lst;
    }    

    var ledge_list = this.generateTripleLedgesDownward(800, 250, 1).concat
                    (this.generateTripleLedgesUpward(1500, 400, 5)).concat
                    (new Ledge(1100, 280, LEDGE_WIDTH, LEDGE_HEIGHT, 'ledge1000')).concat
                    (this.generateTripleLedgesUpward(1200, 200, 10)).concat
                    (new Ledge(1550, 210, LEDGE_WIDTH, LEDGE_HEIGHT, 'ledge1001')).concat
                    (this.generateTripleLedgesUpward(5000, 200, 20)).concat
                    (new Ledge(2350, 300, LEDGE_WIDTH, LEDGE_HEIGHT, 'ledge1002')).concat
                    (this.generateTripleLedgesUpward(2100, 150, 25)).concat
                    (new Ledge(1900, 200, LEDGE_WIDTH, LEDGE_HEIGHT, 'ledge1003'));
                    

    // var ledge_list = [
    // //   new Ledge(BLOCK,      BLOCK * 3,  BLOCK * 2, 'ledge1'),
    // //   new Ledge(BLOCK * 4,  BLOCK * 3,  BLOCK * 5, 'ledge2'),
    // //   new Ledge(BLOCK * 6,  BLOCK * 2,  BLOCK * 2, 'ledge3'),
    // //   new Ledge(BLOCK * 9,  BLOCK,      BLOCK * 2, 'ledge4'),
    // //   new Ledge(BLOCK * 11, BLOCK * 3,  BLOCK * 4, 'ledge5'),
    // //   new Ledge(BLOCK * 12, BLOCK * 2,  BLOCK * 2, 'ledge6'),
    // //   new Ledge(BLOCK * 16, BLOCK * 3,  BLOCK * 3, 'ledge7'),
    // //   new Ledge(BLOCK * 18, BLOCK * 2,  BLOCK * 3, 'ledge8')
    // ]
    return ledge_list;
}



function generateFloatings() {
    this.generateTripleFloating = function(){
        var floating_lst = [
            new Floating(500, 150, 90, 40, 'floating1'),
        ]
        return floating_lst;
    }

    var floating_list = this.generateTripleFloating();

    return floating_list;
}

/** Updating the instance position in css corresponding to its object position */
function updateInstanceCSSPosition(instance_list, scroll_dist){
    for (var i = 0; i < instance_list.length; i++){
        var instance_id = '#' + instance_list[i].id;
        $(instance_id).css("top", instance_list[i].yPos + 'px');
        $(instance_id).css("left", instance_list[i].screenXPos+scroll_dist + 'px');
        $(instance_id).css("width", instance_list[i].width + 'px');
        $(instance_id).css("height", instance_list[i].height + 'px');
    }
}

/** Append the generated instances to the html file */
function appendInstanceToHTML(instance_list, parent_id, instance_class_name){
    var final_instance_list = document.createElement('div');

    for (var i = 0; i < instance_list.length; i++){
        var instance_item = document.createElement('div');
        instance_item.setAttribute('class', instance_class_name);
        instance_item.setAttribute('id', instance_list[i].id);
        final_instance_list.appendChild(instance_item);
    }
    document.getElementById(parent_id).appendChild(final_instance_list);
}