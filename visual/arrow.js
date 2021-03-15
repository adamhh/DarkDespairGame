class Arrow {
    constructor(game, x, y, isLeft, isAssassin, isPowered) {
        Object.assign(this, { game, x, y, isLeft, isAssassin, isPowered});
        if (this.isLeft) {
            if (this.isPowered) {
                this.image = ASSET_MANAGER.getAsset('./sprites/gameassets/arrow_left_ice.png');
            } else {
                this.image = ASSET_MANAGER.getAsset('./sprites/gameassets/arrow_left.png');
            }

            this.isAssassin ? this.maxDistance = this.x - 430 : this.maxDistance = this.x - 830;

        } else {
            if (this.isPowered) {
                this.image = ASSET_MANAGER.getAsset('./sprites/gameassets/arrow_right_ice.png');
            } else {
                this.image = ASSET_MANAGER.getAsset('./sprites/gameassets/arrow_right.png');
            }

            this.isAssassin ? this.maxDistance = this.x + 410 : this.maxDistance = this.x + 810;

        }
        this.animation = new Animator(this.image, 0, 0, 355, 42, 1, 1, 0, false, true);
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
            if (this.x < this.maxDistance) {
                this.removeFromWorld = true;
            }
        } else {
            this.x += this.velocity.x * this.game.clockTick;
            if (this.x > this.maxDistance) {
                this.removeFromWorld = true;
            }
        }
        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && entity.BB.collide(that.BB)) {
                if (!that.isAssassin && (entity instanceof Assassin || entity instanceof CaveWall)) {
                    that.removeFromWorld = true;
                    //todo verify damage still applies
                } else if (that.isAssassin && (entity instanceof ShadowWarrior || entity instanceof Knight ||
                            entity instanceof RedEye || entity instanceof CaveWall || entity instanceof Dragon
                            || entity instanceof Land)) {
                    that.removeFromWorld = true;
                    //todo verify damage still applies
                }
            }

        });

    }
    draw(ctx) {
        if (this.isLeft) {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 25, this.y - this.game.camera.y + 40, .1);
        } else {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x + 70 - this.game.camera.x, this.y - this.game.camera.y + 40, .1);
        }
        this.updateBB();
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }


    }
}