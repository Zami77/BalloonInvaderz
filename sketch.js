function setup() {
    mode = MAIN_MENU;
    var cnv = createCanvas(600, 400);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
    ship = new Ship();
    for (let i = 0; i < BALLOON_COUNT; i++) {
        balloons[i] = new Balloon(i*80+80, 60);    
    }
}

function draw() {
    background(0);
    if(mode === MAIN_MENU) {
        textSize(28);
        fill(255);
        text("Balloon Invaderz", width/2 ,height/2);
        text("Press Enter to Begin...", width/2 - 40, height/2 + 40);
    }
    if(mode === WIN_GAME) {
        fill(255);
        text("You Win!", width/4, height/4);
        text("Total Shots: " + shotsFired + "    Score: " + totalScore, 0,40);
    }
    if(mode === GAME_OVER) {
        fill(255);
        text("You Lost!", width/4, height/4);
        text("Total Shots: " + shotsFired + "    Score: " + totalScore, 0,40);
    }
    if(mode === GAME) {
        ship.show();

        //ship movement
        if(keyIsDown(RIGHT_ARROW)) {
            if(ship.x < width){
                ship.move(RIGHT);
            }
        }
        if(keyIsDown(LEFT_ARROW)) {
            if(ship.x > 0) {
                ship.move(LEFT);
            }
        }

        //drops loop
        for (let i = 0; i < drops.length; i++) {
            drops[i].show();
            drops[i].move();
            if(drops[i].y < 0) {
                drops[i].evaporate(drops, i);
                continue;
            }
            for (let j = 0; j < balloons.length; j++) {
                
                if(drops[i].hits(balloons[j])) {
                    balloons[j].inflate();
                    drops[i].evaporate(drops, i);
                    totalScore++;
                    if(balloons[j].health < 1){
                        balloons[j].pop(balloons, j);
                    }
                    break;
                }
            }

        }
        //Ballons loop
        for (let i = 0; i < balloons.length; i++) {
            if(balloons[i].x > width || balloons[i].x < 0){
                balloons[i].shiftDown();
            }
            balloons[i].show();
            balloons[i].move();
            if(balloons[i].hits(ship)) {
                console.log("Balloon hit ship");
                mode = GAME_OVER;
            }
        }
        if(balloons.length === 0) {
            mode = WIN_GAME;
        }
        fill(255);
        text("Total Shots: " + shotsFired + "    Score: " + totalScore, 0,40);
    }
}

function keyPressed(){
    if(keyCode === 32) {
        if(drops.length < BULLET_MAX)
        {
            var drop = new Drop(ship.x, height);
            shotsFired++;
            drops.push(drop);
        }
    }
    if(keyCode === ENTER) {
        mode = GAME;
    }
}