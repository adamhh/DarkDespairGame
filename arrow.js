class Arrow {

    constructor(game, x, y, isLeft, isAssassin) {
        Object.assign(this, { game, x, y, isLeft, isAssassin});
        //console.log(this.left)
        if (this.isLeft) {
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
        if (this.isLeft) {
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
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof ShadowWarrior || entity instanceof RedEye) {
                    entity.hit();
                    //that.stop = true;
                }
                if (entity instanceof Assassin && !that.isAssassin) {
                    entity.hit();
                }
                if (entity instanceof CaveWall) {
                    //that.stop = true;
                }
            }

        });

        if (this.isLeft) {
            this.x -= this.velocity.x * this.game.clockTick;
        } else {
            this.x += this.velocity.x * this.game.clockTick;
        }
        //this.y += .75

    }
    draw(ctx) {
        if (this.isLeft) {
            this.animations.drawFrame(this.game.clockTick, ctx, this.x - 25, this.y + 40, .1)
        } else {
            this.animations.drawFrame(this.game.clockTick, ctx, this.x + 70, this.y + 40, .1)
        }


        // ctx.strokeStyle = 'blue';
        // ctx.strokeRect(this.BB.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);

    }
}