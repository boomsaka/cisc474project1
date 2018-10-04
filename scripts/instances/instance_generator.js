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
    this.generateTripleStarsDownward = function(starting_x, starting_y, gap_x, gap_y, starting_id){
        var ids = ['star' + starting_id, 'star' + starting_id+1, 'star' + starting_id+2];
        var star_lst = [
            new Star(starting_x, starting_y, ids[0]),
            new Star(starting_x + STAR_WIDTH + gap_x, starting_y + STAR_HEIGHT + gap_y, ids[1]),
            new Star(starting_x + STAR_WIDTH*2  + gap_x*2, starting_y + STAR_HEIGHT*2 + gap_y*2, ids[2]),
        ]
        return star_lst;
    }

    this.generateTripleStarsUpward = function(starting_x, starting_y, gap_x, gap_y, starting_id){
        var ids = ['star' + starting_id, 'star' + starting_id+1, 'star' + starting_id+2];
        var star_lst = [
            new Star(starting_x, starting_y, ids[0]),
            new Star(starting_x + STAR_WIDTH + gap_x, starting_y - STAR_HEIGHT - gap_y, ids[1]),
            new Star(starting_x + STAR_WIDTH*2  + gap_x*2, starting_y - STAR_HEIGHT*2 - gap_y*2, ids[2]),
        ]
        return star_lst;
    }

    this.generateStarWall = function(starting_x, starting_y, dim_x, dim_y, gap_x, gap_y, starting_id){
        var star_lst = []
        for (var i = 0 ; i < dim_y; i++){
            for (var j = 0; j < dim_x; j++){
                id = 'star' + starting_id;
                star_lst.push(new Star(starting_x + gap_x*j, starting_y + gap_y*i, id));
                starting_id++;
            }
        }
        return star_lst;        
    }

    var star_list = this.generateTripleStarsUpward(350, 300, 50, 20, 1).concat
                    (this.generateTripleStarsDownward(700, 120, 90, 10, 4)).concat
                    (this.generateTripleStarsUpward(1500, 335, 40, 1, 10)).concat
                    (new Star(1100, 200, 'star1000')).concat
                    (this.generateTripleStarsUpward(1200, 130, 90, 5, 15)).concat
                    (new Star(1550, 150, 'star1001')).concat
                    (this.generateTripleStarsUpward(5000, 130, 80, 5, 20)).concat
                    (new Star(2370, 240, 'star1002')).concat
                    (new Star(1870, 150, 'star1003')).concat
                    (new Star(2020, 100, 'star1004')).concat
                    (new Star(2190, 40, 'star1005')).concat
                    (new Star(2370, 80, 'star1006')).concat
                    (new Star(2540, 40, 'star1007')).concat
                    (new Star(2720, 90, 'star1008')).concat
                    (new Star(2870, 150, 'star1009')).concat
                    (this.generateTripleStarsDownward(3700, 30, 150, 1, 30)).concat
                    (this.generateTripleStarsDownward(5000, 250, 70, 0, 35)).concat
                    (this.generateTripleStarsUpward(4650, 340, 70, 2, 40)).concat
                    (this.generateTripleStarsDownward(5400, 40, 80, 2, 45)).concat
                    (this.generateTripleStarsDownward(5300, 140, 80, 6, 50)).concat
                    (this.generateStarWall(3115, 35, 3, 3, 200, 120, 2000)).concat
                    (this.generateStarWall(3215, 35, 3, 3, 200, 120, 3000));

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
                 (this.generateTripleBricksBackwards(2500, 20)).concat
                 (this.generateTripleBricks(4200, 30)).concat
                 (this.generateTripleBricksBackwards(5800, 40))
                 ;
    
    return brick_list;
}

function generateLedges() {
    this.generateTripleLedgesDownward = function(starting_x, starting_y, gap_x, gap_y, starting_id){
        var gap = 10;
        var ids = ['ledge' + starting_id, 'ledge' + starting_id+1, 'ledge' + starting_id+2]
        var ledge_lst = [
            new Ledge(starting_x, starting_y, LEDGE_WIDTH, LEDGE_HEIGHT, ids[0]),
            new Ledge(starting_x + LEDGE_WIDTH + gap_x, starting_y + LEDGE_HEIGHT + gap_y, LEDGE_WIDTH, LEDGE_HEIGHT, ids[1]),
            new Ledge(starting_x + LEDGE_WIDTH*2  + gap_x*2, starting_y + LEDGE_HEIGHT*2 + gap_y*2, LEDGE_WIDTH, LEDGE_HEIGHT, ids[2]),
        ]
        return ledge_lst;
    }

    this.generateTripleLedgesUpward = function(starting_x, starting_y, gap_x, gap_y, starting_id){
        var gap = 10;
        var ids = ['ledge' + starting_id, 'ledge' + starting_id+1, 'ledge' + starting_id+2];
        var ledge_lst = [
            new Ledge(starting_x, starting_y, LEDGE_WIDTH, LEDGE_HEIGHT,ids[0]),
            new Ledge(starting_x + LEDGE_WIDTH + gap_x, starting_y - LEDGE_HEIGHT - gap_y, LEDGE_WIDTH, LEDGE_HEIGHT,ids[1]),
            new Ledge(starting_x + LEDGE_WIDTH*2  + gap_x*2, starting_y - LEDGE_HEIGHT*2 - gap_y*2, LEDGE_WIDTH, LEDGE_HEIGHT,ids[2]),
        ]
        return ledge_lst;
    }

    this.generateLedgeWall = function(starting_x, starting_y, dim_x, dim_y, gap_x, gap_y, starting_id){
        var ledge_lst = []
        for (var i = 0 ; i < dim_y; i++){
            for (var j = 0; j < dim_x; j++){
                id = 'ledge' + starting_id;
                ledge_lst.push(new Ledge(starting_x + gap_x*j, starting_y + gap_y*i, LEDGE_WIDTH, LEDGE_HEIGHT, id));
                starting_id++;
            }
        }
        return ledge_lst;
    }
    

    var ledge_list = this.generateTripleLedgesDownward(800, 250, 10, 10, 1).concat
                    (this.generateTripleLedgesUpward(1500, 400, 10, 10, 5)).concat
                    (new Ledge(1100, 280, LEDGE_WIDTH, LEDGE_HEIGHT, 'ledge1000')).concat
                    (this.generateTripleLedgesUpward(1200, 200, 30, 15, 10)).concat
                    (new Ledge(1550, 210, LEDGE_WIDTH, LEDGE_HEIGHT, 'ledge1001')).concat
                    (this.generateTripleLedgesUpward(5000, 200, 10, 10, 20)).concat
                    (new Ledge(2350, 300, LEDGE_WIDTH, LEDGE_HEIGHT, 'ledge1002')).concat
                    (new Ledge(1850, 200, LEDGE_WIDTH, LEDGE_HEIGHT, 'ledge1003')).concat
                    (new Ledge(2000, 150, LEDGE_WIDTH, LEDGE_HEIGHT, 'ledge1004')).concat
                    (new Ledge(2175, 90, LEDGE_WIDTH, LEDGE_HEIGHT, 'ledge1005')).concat
                    (new Ledge(2350, 140, LEDGE_WIDTH, LEDGE_HEIGHT, 'ledge1006')).concat
                    (new Ledge(2525, 90, LEDGE_WIDTH, LEDGE_HEIGHT, 'ledge1007')).concat
                    (new Ledge(2700, 140, LEDGE_WIDTH, LEDGE_HEIGHT, 'ledge1008')).concat
                    (new Ledge(2850, 200, LEDGE_WIDTH, LEDGE_HEIGHT, 'ledge1009')).concat
                    (this.generateLedgeWall(3100, 90, 3, 3, 200, 120, 2000)).concat
                    (this.generateTripleLedgesDownward(3700, 90, 100, 10, 30)).concat
                    (this.generateTripleLedgesDownward(5000, 300, 10, 10, 35)).concat
                    (this.generateTripleLedgesUpward(4650, 400, 10, 10, 40)).concat
                    (this.generateTripleLedgesDownward(5400, 100, 10, 10, 45)).concat
                    (this.generateTripleLedgesDownward(5300, 200, 20, 30, 50));

    return ledge_list;
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