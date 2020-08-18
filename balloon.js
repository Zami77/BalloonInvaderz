function Balloon (x, y) {
    this.x = x;
    this.y = y;
    this.r = 30;
    this.xDir = BALLOON_SPEED;
    this.health = BALLOON_HEALTH;

    this.show = function() {
        fill(250,0,200);
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }

    this.inflate = function() {
        this.r += 2;
        this.health--;
    }

    this.move = function () {
        this.x += this.xDir;
    }

    this.shiftDown = function() {
        this.y += this.r;
        this.xDir *= -1;
    }

    this.pop = function(balloons, index) {
        balloons.splice(index, 1);
    }

    this.hits = function(obj) {
        var d = dist(this.x, this.y, obj.x, obj.y);
        return d < this.r + obj.r;
    }
}