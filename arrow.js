class Arrow {

    constructor(game, x, y, left) {
        Object.assign(this, { game, x, y, left });
        //console.log(this.left)
        if (this.left) {
            this.spritesheet = ASSET_MANAGER.getAsset('./sprites/arrow_left.png');
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset('./sprites/arrow_right.png');
        }

        this.animations = new Animator(this.spritesheet, 0, 0, 355, 42, 1, 1, 0, false, true);

        this.maxSpeed = 2500; // pixels per second
        this.velocity = { x: this.maxSpeed, y: this.maxSpeed };
        this.updateBB();
    }


    updateBB() {
        if (this.left) {
            this.BB = new BoundingBox(this.x - 40, this.y + this.game.camera.y + 14, 50, 10);
        } else {
            this.BB = new BoundingBox(this.x, this.y + this.game.camera.y + 14, 50, 10);
        }
    };


    update() {
        this.updateBB();
        var that = this;
        this.game.entities.forEach(function (entity) {
            // Ninja dies if the Zombie collides with it.
            if ((entity.BB && that.BB.collide(entity.BB))
                && (entity instanceof ShadowWarrior)) {
                entity.hit();
            }
        });
        if (this.left) {
            this.x -= this.velocity.x * this.game.clockTick;
        } else {
            this.x += this.velocity.x * this.game.clockTick;
        }
        //this.y += .75

    }
    draw(ctx) {
        if (this.left) {
            this.animations.drawFrame(this.game.clockTick, ctx, this.x - 25, this.y + 40, .1)
        } else {
            this.animations.drawFrame(this.game.clockTick, ctx, this.x + 70, this.y + 40, .1)
        }
        // ctx.strokeStyle = 'blue';
        // ctx.strokeRect(this.BB.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);

    }
}