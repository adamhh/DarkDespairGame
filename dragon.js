class Dragon {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        //spritesheets

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/dragon_sheet.png");
        this.width = 500;
        this.height = 300;
        //state variables
        this.facing = 0; //0 for right, 1 for left
        this.state = 0;  //0 for idle, 1 for walking, 2 for attacking, 3 for dead
        this.dead = false;
        this.velocity = { x: 0, y: 0 };
        this.canFall = true;
        this.leftBound = 0;
        this.rightBound = 0;
        this.updateBB();
        this.animations = [];
        this.loadAnimations();


    }

    loadAnimations() {
        //initialize
        for (var i = 0; i < 4; i++) { //0 = idle, 1 = walking, 2 = attacking, 3 = dead
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { //2 directions, 0 for right, 1 for left
                this.animations[i].push([]);
            }
        }

        //store various states for animations
            //idle
            this.animations[0][0] = new Animator(this.spritesheet, 45, 385, this.width, this.height, 7, 0.09, 225, false, true);
            this.animations[0][1] = new Animator(this.spritesheet, 25, 35, this.width, this.height, 7, 0.09, 225, false, true);
            //walking
            this.animations[1][0] = new Animator(this.spritesheet, 85, 1050, this.width, this.height, 11, 0.09, 225, true, true);
            this.animations[1][1] = new Animator(this.spritesheet, 45, 735, this.width, this.height, 11, 0.09, 225, false, true);

            //attack
            this.animations[2][0] = new Animator(this.spritesheet, 70, 1790, this.width + 75, this.height, 6, 0.1, 150, true, true);
            this.animations[2][1] = new Animator(this.spritesheet, 85, 1450, this.width + 75, this.height, 6, 0.1, 150, false, true);

            //dead
            this.animations[3][0] = new Animator(this.spritesheet, 75, 2590, this.width + 75, this.height + 30, 15, 0.3, 150, true, false);
            this.animations[3][1] =  new Animator(this.spritesheet, 30, 2200, this.width + 75, this.height + 30, 15, 0.3, 150, false, false);


    }

    updateBB() {
        this.lastBB = this.BB;
        this.ABB = new BoundingBox(this.x, this.y, 0, 0);
        if (this.facing === 1) {
            this.BB = new BoundingBox(this.x, this.y, 335, 220);
            this.SBB = new BoundingBox(this.x + 25, this.y + 60, 200, 150);
            if (this.state === 2) {
                this.ABB = new BoundingBox(this.x + 5, this.y + 155, 50, 50);
            }

        } else  {
            this.BB = new BoundingBox(this.x - 50, this.y, 420, 220);
            this.SBB = new BoundingBox(this.x + 170, this.y + 60, 200, 150);
            if (this.state === 2) {
                this.ABB = new BoundingBox(this.x + 380, this.y + 150, 50, 50);
            }

        }

    }

    die() {
        this.state = 3;
        this.velocity.x = 0
        this.dead = true;
        // if (this.state === 3) {
        //     this.removeFromWorld = true;
        // }
    }

    update() {
        const TICK = this.game.clockTick;
        const MAX_WALK = 100;
        const MAX_FALL = 100;
        const FALL_ACC = .5;
        let that = this;
        //collision system
        if (!this.dead) {
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (entity instanceof Land || entity instanceof Background) {
                        console.log(that.BB.bottom);
                        that.canFall = false;
                        if (that.BB.bottom - entity.BB.top > 0 && that.BB.bottom - entity.BB.bottom < 50) { //if on top/falling
                            that.velocity.y = 0;
                            that.y = entity.BB.top - that.BB.height;
                            that.leftBound = entity.BB.left;
                            that.rightBound = entity.BB.right;
                        }

                    }
                    if (entity instanceof Knight) {
                        if (entity.BB.right - that.BB.left > 0 && entity.BB.left - that.BB.left < 0) {
                            that.facing = 1;
                        } else if (entity.BB.right > that.BB.right) {
                            that.facing = 0;
                        }
                        that.state = 2;
                        that.velocity.x = 0;
                    } else {
                        that.state = 1;
                    }
                }
            });

            //platform walking physics
            // if (!this.canFall) {
            //     if (this.leftBound > this.x) {
            //         this.state = 1;
            //         this.facing = 0;
            //         this.velocity.x += MAX_WALK;
            //     } else if (this.rightBound - this.x < 70) {
            //         this.state = 1;
            //         this.facing = 1;
            //         this.velocity.x -= MAX_WALK;
            //     } else if (this.velocity.x === 0 && this.state !== 2 && this.facing === 1) {
            //         this.state = 1;
            //         this.facing = 1;
            //         this.velocity.x -= MAX_WALK;
            //     } else if (this.velocity.x === 0 && this.state !== 2 && this.facing === 0) {
            //         this.state = 1;
            //         this.facing = 0;
            //         this.velocity.x += MAX_WALK;
            //     }
            // }

            // update position
            if (this.canFall) { //this makes sure we aren't applying velocity if we are on ground/platform
                this.velocity.y += FALL_ACC;
                if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
                //if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;
                this.y += this.velocity.y;

            }
            if (this.velocity.x >= MAX_WALK) this.velocity.x = MAX_WALK;
            if (this.velocity.x <= -MAX_WALK) this.velocity.x = -MAX_WALK;
            this.x += this.velocity.x * TICK * PARAMS.SCALE;
            this.updateBB();

            //if dead
        } else {
            // this.BB = new BoundingBox(0, 0, 0, 0);
        }


    }

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x,
            this.y - this.game.camera.y , PARAMS.SCALE);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.SBB.x - this.game.camera.x, this.SBB.y - this.game.camera.y, this.SBB.width, this.SBB.height);
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.ABB.x - this.game.camera.x, this.ABB.y - this.game.camera.y, this.ABB.width, this.ABB.height);




        }

    }


}
