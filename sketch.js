function setup() {
    mode = MAIN_MENU;
    var cnv = createCanvas(600, 400);
    var y = (windowHeight - height) / 2;
    var x = (windowWidth - width) / 2;
    cnv.position(x, y);
    startGame();    
}

function draw() {
    background(0);
    if(mode === MAIN_MENU) {
        fill(255);
        textSize(34);
        text("Balloon Invaderz", width/2 -130 ,height/2 - 150);
        textSize(18);
        text("Press space bar to shoot and the left and right arrow keys to move.",
            width/2 - 260, height/2);
        text("Each balloon needs 10 hits to pop. Pop them all before they get you!",
            width/2 - 270, height/2 + 40);
        text("Press Enter to Begin...", width/2 - 100, height/2 + 80);
        textSize(28);
    }
    if(mode === WIN_GAME) {
        fill(255);
        text("You Win!", width/2-100, height/2);
        text("Press 'r' to restart", width/2-100, height/2 + 40);
        text("Total Shots: " + shotsFired + "    Score: " + totalScore, 0,40);
    }
    if(mode === GAME_OVER) {
        fill(255);
        text("You Lost!", width/2-40, height/2);
        text("Press 'r' to restart", width/2-100, height/2 + 40);
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

function startGame() {
    ship = new Ship();
    for (let i = 0; i < BALLOON_COUNT; i++) {
        balloons[i] = new Balloon(i*80+80, 60);
    }
    drops =[];
    totalScore = 0;
    shotsFired = 0;
}

function keyPressed(){
    //Space bar pressed
    if(keyCode === 32) {
        if(drops.length < BULLET_MAX)
        {
            var drop = new Drop(ship.x, height);
            shotsFired++;
            drops.push(drop);
        }
    }
    if(keyCode === ENTER) {
        if(mode == MAIN_MENU) {
            mode = GAME;
        }
    }
    //'r' key pressed
    if(keyCode === 82) {
        console.log("r pressed")
        if(mode == GAME_OVER || mode == WIN_GAME) {
            startGame();
            mode = GAME;
        }
    }
}