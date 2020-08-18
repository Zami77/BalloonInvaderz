function Drop (x, y) {
    this.x = x;
    this.y = y;
    this.r = 8;
    this.toDelete = false;

    this.show = function() {
        noStroke();
        fill(50,0,250);
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }

    this.move = function() {
        this.y -= BULLET_SPEED;
    }

    this.hits = function (obj) {
        var d = dist(this.x, this.y, obj.x, obj.y);
        return d < this.r + obj.r;
    }

    this.evaporate = function (drops, index) {
        drops.splice(index,1);
    }
}