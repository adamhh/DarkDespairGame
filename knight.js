class Knight {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.game.knight = this;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/knightTEST.png");


        // knights's state variables
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0;  // 0 idle, 1, walking , 3 attacking
        this.dead = false;

        //boolean flag for double jump
        this.jump = false;
        //maybe delete below, was tring to make bounding box dynamically scale but running into issues
        this.yOffset = 50 * PARAMS.SCALE;
        this.xOffset = 15 * PARAMS.SCALE;
        this.cWidth = 70 * PARAMS.SCALE;
        this.cHeight = 65 * PARAMS.SCALE;



        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 2000;

        this.updateBB();
        // knights's animations
        this.animations = [];
        this.loadAnimations();
        //this.animation = new Animator(this.spritesheet, 2167, 400, 148, 117, 9,
        //   0.1, 2, false, true);
    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) {  //3 States: 0 = idle, 1 = walk, 2 = attack, 3 = jumping, 4 = falling?
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { //2 directions: 0 = right, 1 = left
                this.animations[i].push([]);
            }
        }

        //idle animation for state 0
        // facing right
        this.animations[0][0] = new Animator(this.spritesheet, 2165, 273, 148, 117, 14,
            0.1, 2, false, true);

        // facing left
        this.animations[0][1] = new Animator(this.spritesheet, 14, 270, 148, 117, 14,
            0.1, 2, true, true);

        //walking animation for state 1
        // facing right
        this.animations[1][0] = new Animator(this.spritesheet, 2165, 150, 148, 117, 12,
            0.1, 2, false, true);
        // facing left
        this.animations[1][1] = new Animator(this.spritesheet, 312, 150, 148, 117, 12,
            0.1, 2, true, true);


        //attacking animation
        // facing right
        this.animations[2][0] = new Animator(this.spritesheet, 2164, 26, 148, 117, 13,
            0.03, 2, false, true);
        // facing left
        this.animations[2][1] = new Animator(this.spritesheet, 164, 26, 148, 117, 13,
            0.03, 2, true, true);

        //jumping
        // facing right
        this.animations[3][0] = new Animator(this.spritesheet, 2165, 150, 148, 117, 1,
            1, 2, false, true);
        //facing left
        this.animations[3][1] =  new Animator(this.spritesheet, 312, 150, 148, 117, 1,
            1, 2, false, true);
    };

    updateBB() {
        this.lastBB = this.BB;
        let scale = 0;
        if (PARAMS.SCALE == 0.75) {
            scale = -15;
        }
        if (this.facing === 0) {
            this.BB = new BoundingBox(this.x + this.xOffset, this.y + this.yOffset, this.cWidth, this.cHeight);
        } else {
            this.BB = new BoundingBox(this.x + this.xOffset + scale, this.y + this.yOffset, this.cWidth, this.cHeight);
        }
    };

    die() {
        this.velocity.y = -640;
        this.dead = true;
    };

    update() {
        //TODO refactor for knight
        const TICK = this.game.clockTick;
        console.log("(this.game, " + Math.ceil(this.x) +  ", " + Math.ceil(this.y) + ")");
        // I used this page to approximate my constants
        // https://web.archive.org/web/20130807122227/http://i276.photobucket.com/albums/kk21/jdaster64/smb_playerphysics.png
        // I converted these values from hex and into units of pixels and seconds.

        const MIN_WALK = 4.453125;
        const MAX_WALK = 93.75;
        const MAX_RUN = 350;
        const ACC_WALK = 133.59375;
        const ACC_RUN = 400;
        const DEC_REL = 182.8125;
        const DEC_SKID = 1500;
        const MIN_SKID = 33.75;
        const TURN_SKID = 20;
        const STOP_FALL = 1575;
        const WALK_FALL = 1800;
        const RUN_FALL = 2025;
        const JUMP_ACC = 700;
        const STOP_FALL_A = 450;
        const WALK_FALL_A = 421.875;
        const RUN_FALL_A = 562.5;

        const MAX_FALL = 600;




        let yOff = 50 * PARAMS.SCALE;
        let xOff = 15 * PARAMS.SCALE;
        // collision
        var that = this;
        let canFall = true;
        let othThanCloud = false;
        this.game.entities.forEach( function (entity) {
            if ((entity.BB && that.BB.collide(entity.BB))
                && (entity instanceof Ground || entity instanceof Bridge || entity instanceof Land || entity instanceof LandEnd || entity instanceof Cloud)) {
                othThanCloud = entity instanceof Ground || entity instanceof Bridge || entity instanceof Land || entity instanceof LandEnd;
                if (that.velocity.y > 0 && othThanCloud) { //falling
                    if (that.BB.bottom >= entity.BB.top && (that.BB.bottom - entity.BB.top) < 10) {
                        that.y = entity.BB.top - that.BB.height - yOff +1;
                        that.velocity.y = 0;
                        canFall = false;

                    }

                } else if (entity instanceof Cloud) {
                    if (that.BB.bottom >= entity.BB.top && (that.BB.bottom - entity.BB.top) < 10) {
                        that.y = entity.BB.top - that.BB.height - yOff + 5;
                        that.velocity.y = 0;
                        canFall = false;

                    }

                } else if (that.BB.bottom >= entity.BB.top && (that.BB.bottom - entity.BB.top)){
                    canFall = false;
                } else {
                    canFall = true;
                }

                if ((entity instanceof Bridge || entity instanceof Ground || entity instanceof Land) || entity instanceof LandEnd || entity instanceof Cloud) {
                    if (that.BB.right > entity.BB.left && (that.BB.left - entity.BB.left) < 100) {  //for collisions ->

                        if (that.BB.bottom > (entity.BB.top + 20)) {
                            that.x = entity.BB.left - that.BB.width - xOff;
                            that.velocity.x = 0;
                        }

                    } else if (that.BB.left < entity.BB.right) {  //for collisions ->
                        if (that.BB.bottom > (entity.BB.top + 20)) {
                            that.x = entity.BB.right + xOff - 8;
                            that.velocity.x = 0;
                        }

                    }

                }


            }

        });
        let yVel = Math.abs(this.velocity.y);
        //this physics will need a fine tuning;
        if (this.dead) { //TODO
            this.velocity.y += RUN_FALL * TICK;
            this.y += this.velocity.y * TICK * PARAMS.SCALE;
        } else { //set facing state field
            if (this.game.right) {
                this.facing = 0;
                this.state = 1;
            } else if (this.game.left) {
                this.facing = 1;
                this.state = 1;
            } else if (this.game.A) {
                this.state = 2;
            } else if (this.game.B) {
                this.state = 3;
            } else if (!this.game.A && !this.game.B && !this.game.right && !this.game.left) {
                this.state = 0;
            }

            //turn slide face left
            if(this.game.left && this.velocity.x > 0) {
                this.velocity.x -= TURN_SKID;
            }
            //turn slide face right
            if(this.game.right && this.velocity.x < 0) {
                this.velocity.x += TURN_SKID;
            }
            //if you unpress left/right while moving
            if (!this.game.right && !this.game.left) {
                if (this.facing === 0) { //moving right
                    if (yVel > 50 && Math.abs(this.velocity.x) > 50) {
                        this.velocity.x --;
                    } else if (this.velocity.x > 0) {
                        this.velocity.x -= DEC_SKID * TICK;
                    } else {
                        this.velocity.x = 0;
                    }
                } else { //moving left
                    if (yVel > 50 && Math.abs(this.velocity.x) > 50) {
                        this.velocity.x++;
                    } else if (this.velocity.x < 0) {
                        this.velocity.x += DEC_SKID * TICK;
                    } else {
                        this.velocity.x = 0;
                    }
                }
            }
            //if you are facing right and press right
            if (this.facing === 0) {
                if (this.game.right && !this.game.left) {
                    this.state = 1;
                    if (yVel < 10 && !this.game.B) {
                        this.velocity.x += ACC_RUN * TICK;
                    }

                } else if (!this.game.right && this.game.left) { //if you're facing right and press left
                    this.velocity.x -= DEC_SKID * TICK;
                    //this.state = 1;
                }
            } else if(this.facing === 1) { //if you are facing left and press left
                if (!this.game.right && this.game.left) {
                    //this.state = 1;
                    if (yVel < 10 && !this.game.B) {  //so you cant move in the air
                        this.velocity.x -= ACC_RUN * TICK;
                    }
                } else if (this.game.right && !this.game.left) { //if you are facing left and press right
                    this.velocity.x += DEC_SKID*3 * TICK;
                    //this.state = 1;
                }
            }
            if (this.game.A && this.facing === 0) {
                this.state = 2;
                if (this.velocity.x > 0) this.velocity.x --;
            } else if (this.game.A && this.facing === 1) {
                this.state = 2;
                if (this.velocity.x < 0) this.velocity.x++;
            }

            if (this.game.B) {
                canFall = true;
                if (this.velocity.y == 0) { // add double jump later
                    this.jump = true;
                    this.velocity.y -= JUMP_ACC;
                    this.fallAcc = STOP_FALL;
                }
                // else if (this.velocity.y < -400) {
                //     console.log("HEARD v= " + this.velocity.y);
                //     this.velocity.y = -800;
                //     //this.fallAcc = STOP_FALL;
                // } else if (this.velocity.y > 500) {
                //
                // }
                //if (this.fallAcc === WALK_FALL) this.velocity.y -= (WALK_FALL - WALK_FALL_A) * TICK;
                //if (this.fallAcc === RUN_FALL) this.velocity.y -= (RUN_FALL - RUN_FALL_A) * TICK;
            }
            //jummping works below
            // if (this.game.B && this.facing === 0) {
            //     canFall = true;
            //     if (this.velocity.y === 0) {
            //         this.velocity.y -= JUMP_ACC;
            //         this.fallAcc = STOP_FALL/3;
            //     } else if (this.velocity.y < -500) {
            //         this.velocity.y += 50;
            //         this.fallAcc = STOP_FALL/2;
            //
            //     }
            //
            // } else if (this.game.B && this.facing === 1) { //jumping
            //     canFall = true;
            //     if (this.velocity.y === 0) {
            //
            //         this.velocity.y -= JUMP_ACC;
            //         this.fallAcc = STOP_FALL/3;
            //     } else if (this.velocity.y < -500) {
            //
            //         this.velocity.y += 50;
            //         this.fallAcc = STOP_FALL/2;
            //
            //     }
            //
            // }




        }


        // max speed calculation
        if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN;
        if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN;
        // if (this.velocity.x >= MAX_WALK && !this.game.B) this.velocity.x = MAX_WALK;
        // if (this.velocity.x <= -MAX_WALK && !this.game.B) this.velocity.x = -MAX_WALK;

        // update position
        if (canFall) {
            this.velocity.y += this.fallAcc * TICK;

            this.y += this.velocity.y * TICK * PARAMS.SCALE;
        }
        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

        this.x += this.velocity.x * TICK * PARAMS.SCALE;

        this.updateBB();





    };


    draw(ctx) {
        //this.animation.drawFrame(this.game.clockTick, ctx, 300, 300, 3);
        if (this.dead) {
            this.deadAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        } else if (this.facing === 0) {  //facing right, need to offset
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x,
                this.y - this.game.camera.y , PARAMS.SCALE);
        } else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 50,
                this.y - this.game.camera.y, PARAMS.SCALE);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
};