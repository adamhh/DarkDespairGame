class Arrow {
    constructor(game, x, y, isLeft, isAssassin) {
        Object.assign(this, { game, x, y, isLeft, isAssassin});
        //console.log(this.left)
        if (this.isLeft) {
            this.spritesheet = ASSET_MANAGER.getAsset('./sprites/gameassets/arrow_left.png');
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset('./sprites/gameassets/arrow_right.png');
        }

        this.animations = new Animator(this.spritesheet, 0, 0, 355, 42, 1, 1, 0, false, true);

        this.maxSpeed = 1500; // pixels per second
        this.velocity = { x: this.maxSpeed, y: this.maxSpeed };
        this.BB = new BoundingBox(this.x, this.y, 50, 10);
    }


    updateBB() {
        if (this.isLeft) {
            this.BB = new BoundingBox(this.x - 40, this.y + 40, 50, 10);
        } else {
            this.BB = new BoundingBox(this.x, this.y + 40, 50, 10);
        }
    };


    update() {
        if (this.isLeft) {
            this.x -= this.velocity.x * this.game.clockTick;
        } else {
            this.x += this.velocity.x * this.game.clockTick;
        }
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && entity.BB.collide(that.BB)) {
                if (!that.isAssassin && (entity instanceof Assassin || entity instanceof CaveWall)) {
                    that.y = 2000;
                } else if (that.isAssassin && (entity instanceof ShadowWarrior || entity instanceof Knight ||
                            entity instanceof RedEye || entity instanceof CaveWall)) {
                    that.y = 2000;
                }
            }

        });
        //this.y += .75

    }
    draw(ctx) {
        if (this.isLeft) {
            this.animations.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 25, this.y - this.game.camera.y + 40, .1)
        } else {
            this.animations.drawFrame(this.game.clockTick, ctx, this.x + 70 - this.game.camera.x, this.y - this.game.camera.y + 40, .1)
        }
        this.updateBB();

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }


    }
}