function Ship () {
    this.x = width/2;
    this.y = height - 10;
    this.r = 10;


    this.show = function() {
        fill(255);
        rectMode(CENTER);
        rect(this.x, height-20, 20, 20);
    }
    this.move = function (dir) {
        this.x += dir;
    }
}