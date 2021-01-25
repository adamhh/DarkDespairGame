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
        this.testTimer = new Timer();
        this.time1 = this.testTimer.getTime();
        this.time2 = this.time1;

        //boolean flag for double jump
        this.jumpFlag = false;
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
        this.animations[2][1] = new Animator(this.spritesheet, 168, 26, 148, 117, 13,
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
        this.time2 = this.testTimer.getTime();
        //TODO refactor for knight
        const TICK = this.game.clockTick;
        //console.log("(this.game, " + Math.ceil(this.x) +  ", " + Math.ceil(this.y) + ")");
        // I used this page to approximate my constants
        // https://web.archive.org/web/20130807122227/http://i276.photobucket.com/albums/kk21/jdaster64/smb_playerphysics.png
        // I converted these values from hex and into units of pixels and seconds.

        //-------------adjust constants to alter physics-----------
        //run
        let max_run = 500;         //adjust for maximum run speed
        let acc_run = 400;         //adjust for maximum acceleration
        const ACC_SPRINT = 1000;   //adjust for maximum sprint acc
        const MAX_SPRINT = 800     //adjust for maximum sprint

        //skids
        const DEC_SKID = 4000;
        const TURN_SKID = 50;
        //jump
        const JUMP_ACC = 700;     //adjust for maximum jump acc
        const MAX_JUMP = 1000;    //adjust for maximum jump height
        const DBL_JUMP_MOD = 200; //adjust for double jump boost
        //falling
        const MAX_FALL = 1000;  //adjust for fall speed
        const STOP_FALL = 1575;
        //in air deceleration
        const AIR_DEC = 2;




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
                    console.log("HEARD");
                    if (that.BB.bottom >= entity.BB.top && (that.BB.bottom - entity.BB.top) < 20) {
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
        console.log(this.y);
        if (this.y > 2000) {
            this.velocity.x = 0;
            this.x = 0;
            this.y = -500;
        }
        let yVel = Math.abs(this.velocity.y);
        //this physics will need a fine tuning;
        if (this.dead) {
            //TODO
        } else { //set facing state field
            if (!this.game.B) {
                this.jumpFlag = false;
            }
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
            if (this.game.C) {
                acc_run = ACC_SPRINT;
                max_run = MAX_SPRINT;
            }

            //if moving right and then face left, skid
            if(this.game.left && this.velocity.x > 0 && yVel < 20) {
                this.velocity.x -= TURN_SKID;
            }
            //if moving left ann then face right, skid
            if(this.game.right && this.velocity.x < 0 && yVel < 20) {
                this.velocity.x += TURN_SKID;
            }
            //if you unpress left and right while moving right
            if (!this.game.right && !this.game.left) {
                if (this.facing === 0) { //moving right
                    if (this.velocity.x > 0 && yVel < 20) {
                        this.velocity.x -= DEC_SKID * TICK;
                    } else if (yVel < 20) {
                        this.velocity.x = 0;
                    } else if (this.velocity.x > 0) { //this is where you control horizontal deceleration when in air
                        this.velocity.x-=AIR_DEC;
                    }
                } else { //if you unpress left and right while moving left
                    if (this.velocity.x < 0 && yVel < 20) {
                        this.velocity.x += DEC_SKID * TICK;
                    } else if (yVel < 20) {
                        this.velocity.x = 0;
                    } else if (this.velocity.x < 0) { //this is where you control horizontal deceleration when in air
                        this.velocity.x+=AIR_DEC;
                    }
                }
            }
            //Run physics
            if (this.facing === 0) {                        //facing right
                if (this.game.right && !this.game.left) {   //and pressing right.
                    if (yVel < 10 && !this.game.B) {        //makes sure you are on ground
                        this.velocity.x += acc_run * TICK;
                    }
                }
            } else if(this.facing === 1) {                  //facing left
                if (!this.game.right && this.game.left) {   //and pressing left.
                    if (yVel < 10 && !this.game.B) {        //makes sure you are on ground
                        this.velocity.x -= acc_run * TICK;
                    }
                }
            }

            if (this.game.B) {
                canFall = true;
                let timeDiff = this.time2 - this.time1;
                if (this.velocity.y === 0) { // add double jump later
                    this.time1 = this.testTimer.getTime();
                    this.velocity.y -= JUMP_ACC;
                    this.fallAcc = STOP_FALL;
                    this.jumpFlag = true;
                } else if (!this.jumpFlag && timeDiff > 100 && timeDiff < 200) {
                    this.velocity.y -= DBL_JUMP_MOD;
                    this.fallAcc = STOP_FALL;
                }
            }
        }

        // max speed calculation
        if (this.velocity.x >= max_run) this.velocity.x = max_run;
        if (this.velocity.x <= -max_run) this.velocity.x = -max_run;

        // update position
        if (canFall) { //this makes sure we aren't applying velocity if we are on ground/platform
            this.velocity.y += this.fallAcc * TICK;
            this.y += this.velocity.y * TICK * PARAMS.SCALE;
        }

        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= -MAX_JUMP) this.velocity.y = -MAX_FALL;
        this.x += this.velocity.x * TICK * PARAMS.SCALE;

        this.updateBB(); //Update your bounding box every tick
    };


    draw(ctx) {
        //this.animation.drawFrame(this.game.clockTick, ctx, 300, 300, 3);
        if (this.dead) {
            //this.deadAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
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