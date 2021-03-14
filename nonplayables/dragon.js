class Dragon {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        //spritesheets

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/characters/dragon.png");
        this.width = 250;
        this.height = 250;
        //state variables
        this.facing = 0; //0 for right, 1 for left
        this.state = 2;  //0 for idle, 1 for walking, 2 for attacking, 3 for dead
        this.dead = false;
        this.velocity = { x: 0, y: 0 };
        this.canFall = true;
        this.attacking = false;
        this.timer = new Timer();
        this.attackStart = this.timer.getTime();
        this.attackEnd = this.attackStart;
        this.attackWindow = false;
        this.leftBound = 0;
        this.rightBound = 0;
        this.updateBB();
        this.animations = [];
        this.loadAnimations();


    }

    loadAnimations() {
        //initialize
        for (var i = 0; i < 6; i++) { //0 = idle, 1 = walking, 2 = attacking, 3 = dead, 4 = battle idle, 5 = breathing fire
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { //2 directions, 0 for right, 1 for left
                this.animations[i].push([]);
            }
        }
        let sWidth = 250;
        let sHeight = 150;
        //store various states for animations
        //idle
        this.animations[0][0] = new Animator(this.spritesheet, 5, 177, sWidth, sHeight, 7, 0.09, 112.5, false, true);
        this.animations[0][1] = new Animator(this.spritesheet, 5, 0, sWidth, sHeight, 7, 0.09, 112.5, false, true);

        //walking
        this.animations[1][0] = new Animator(this.spritesheet, 23, 508, sWidth + 5, sHeight, 11, 0.09, 107.5, true, true);
        this.animations[1][1] = new Animator(this.spritesheet, 3, 350, sWidth + 5, sHeight, 11, 0.09, 107.5, false, true);

        //attack
        this.animations[2][0] = new Animator(this.spritesheet, 15, 900, sWidth + 40, sHeight, 11, 0.08, 72.5, true, true);
        this.animations[2][1] = new Animator(this.spritesheet, 0, 715, sWidth + 40, sHeight, 11, 0.08, 72.5, false, true);

        //dead
        this.animations[3][0] = new Animator(this.spritesheet, 25, 1282, sWidth + 20, sHeight + 5, 15, 0.09, 92.5, true, true);
        this.animations[3][1] = new Animator(this.spritesheet, 8, 1090, sWidth + 20, sHeight + 5, 15, 0.09, 92.5, false, true);

        //battle idle
        // this.animations[4][0] = new Animator(this.spritesheet, 35, 4120, this.width + 75, this.height, 11, 0.09, 150, true, true);
        // this.animations[4][1] = new Animator(this.spritesheet, 50, 3810, this.width + 75 , this.height, 11, 0.09, 150, false, true);

        //ranged attack?
        this.animations[5][0] = new Animator(this.spritesheet, 15, 2370, sWidth + 30, sHeight, 2, 0.45, 385.5, false, true);
        this.animations[5][1] = new Animator(this.spritesheet, 20, 2195, sWidth + 30 , sHeight, 2, 0.45, 385.5, false, true);

    }

    updateBB() {
        this.lastBB = this.BB;
        let yOffset = 0;
        let xOffset = 0;
        if (this.state === 0) {
            this.facing === 0 ? xOffset = 100 : xOffset = 100;

        } else if (this.state === 1) {
            this.facing === 0 ? xOffset = 100 : xOffset = 120;
        } else if (this.state === 2) {
            this.facing === 0 ? xOffset = 120 : xOffset = 150;
        } else if (this.state === 5) {
            this.facing === 0 ? xOffset = 230 : xOffset = 50;
        }
        this.ABB = new BoundingBox(this.x, this.y, 0, 0);
        if (this.state !== 3) {
            if (this.facing === 1) {
                this.BB = new BoundingBox(this.x + xOffset, this.y + yOffset, this.width, this.height - 75);
                if (this.state === 2) {
                    this.ABB = new BoundingBox(this.x + 30, this.y + 120, 100, 70);
                }

            } else  {
                this.BB = new BoundingBox(this.x + xOffset, this.y + yOffset, this.width, this.height - 75);
                if (this.state === 2) {
                    this.ABB = new BoundingBox(this.x + 400, this.y + 120, 100, 70);
                }

            }
        } else {
            this.BB = new BoundingBox(this.x, this.y, 0, this.height - 75);
        }
        this.sight = new BoundingBox(this.x - 650, this.y - 150, 1900, 350);

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
        let moveTo = 0;
        let that = this;
        let inSight = false;
        let attackZone = false;

        if (PARAMS.START && !PARAMS.PAUSE) {
            //collision system
            if (!this.dead) {
                this.game.entities.forEach(function (entity) {
                    if (entity.BB && that.BB.collide(entity.BB)) { //BB collision
                        if (that.velocity.y > 0) { //falling
                            if ((entity instanceof Land || entity instanceof Land) &&
                                that.lastBB.bottom <= entity.BB.top) { //things you can land on & landed true
                                //that.state = 3;
                                that.y = entity.BB.top - that.lastBB.height;
                                that.velocity.y = 0;
                                that.updateBB();
                            } //can change to states if falling here
                        }
                    }
                    if (entity instanceof Assassin) {
                        if (entity.BB && that.sight.collide(entity.BB)) { //if dragon sees assassin
                            inSight = true;
                            attackZone = false;
                            //console.log(entity.BB.y);
                            if (entity.BB.y > that.y) {
                                attackZone = true;
                            }
                            if ((entity.BB.x - that.sight.x) < (that.sight.x + that.sight.width) - entity.BB.x) {
                                that.facing = 1;
                                //console.log(that.sight.x - entity.BB.x);
                            } else {
                                that.facing = 0;

                            }
                            moveTo = entity.BB.x;


                        }  else {
                            that.velocity.x = 0;
                            that.state = 0;
                        }
                    }
                });
                if (this.state === 2) {
                    this.attacking = true;
                }
                let playerDiff = 0;
                if (this.facing === 1 && inSight) {                                        //facing and in sight <-
                    playerDiff = this.x - moveTo;
                    //console.log(playerDiff);
                    if (playerDiff < 700 && playerDiff > -25 && this.x > 4500) {          //if close walk to attack position but don't walk off edge
                        this.velocity.x -= MAX_WALK;
                        this.state = 1;
                    } else if (playerDiff < -25 && playerDiff > -180 && attackZone) {     //attack if in zone
                        this.velocity.x = 0;
                        this.state = 2;
                    } else {                                                              //else stop
                        this.velocity.x = 0;
                        this.state = 0;
                    }

                } else if (inSight) {                                                    //facing and in sight ->
                    playerDiff = moveTo - this.x;
                    //console.log(playerDiff);
                    if (playerDiff < 1500 && playerDiff > 450 && this.x < 5600) {       //in zone will walk towards and attack
                        this.velocity.x += MAX_WALK;
                        this.state = 1;
                    } else if (playerDiff < 450 && playerDiff > 300 && attackZone) {    //attack if in zone
                        this.velocity.x = 0;
                        this.state = 2;

                    } else {                                                             //else stop
                        this.velocity.x = 0;
                        this.state = 0;
                    }
                }

                // update position

                this.velocity.y += FALL_ACC;
                if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
                //if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;
                this.y += this.velocity.y;

                if (this.velocity.x >= MAX_WALK) this.velocity.x = MAX_WALK;
                if (this.velocity.x <= -MAX_WALK) this.velocity.x = -MAX_WALK;
                this.x += this.velocity.x * TICK * PARAMS.SCALE;
                this.updateBB();

                //if dead
            } else {
                // this.BB = new BoundingBox(0, 0, 0, 0);
            }
        }


    }

    draw(ctx) {
        let yOffset = 0;
        let xOffset = 0;

        if (this.state === 2) {
            yOffset = 15;
        }
        if (this.state === 3) {
            yOffset = 12;
        }
        if (this.state === 5) {
            yOffset = 10;
        }
        if (this.facing === 1) {
            xOffset = 20;
        }
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + xOffset,
            this.y - this.game.camera.y +yOffset - 85, 1.75);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.ABB.x - this.game.camera.x, this.ABB.y - this.game.camera.y, this.ABB.width, this.ABB.height);
            ctx.strokeStyle = "White";
            ctx.strokeRect(this.sight.x - this.game.camera.x, this.sight.y - this.game.camera.y, this.sight.width, this.sight.height);





        }

    }


}
