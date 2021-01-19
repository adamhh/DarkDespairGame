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


        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;

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
        this.animations[1][1] = new Animator(this.spritesheet, 312, 145, 148, 117, 12,
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
        this.animations[3][0] = new Animator(this.spritesheet, 2167, 400, 148, 117, 9,
                                            0.8, 2, false, true);
        //facing left
        this.animations[3][1] =  new Animator(this.spritesheet, 2167, 400, 148, 117, 9,
                                            0.07, 2, false, true);
    };

    updateBB() {
        this.lastBB = this.BB;
        // switch (this.state) {
        //     case 0:
        //         this.BB = new BoundingBox(this.x, this.y, 125, 68)
        //         break;
        //     case 1:
        //         this.BB = new BoundingBox(this.x, this.y, 125, 70)
        //         break;
        //     default:
        //         this.BB = new BoundingBox(this.x , this.y - 57, 148, 117)
        //         break;
        // }
        if (this.facing === 0) {
            this.BB = new BoundingBox(this.x + 20, this.y + 60, 60, 60);
        } else {
            this.BB = new BoundingBox(this.x + 10, this.y + 60, 60, 60);
        }
    };

    die() {
        this.velocity.y = -640;
        this.dead = true;
    };

    update() {
        //TODO refactor for knight
        const TICK = this.game.clockTick;

        // I used this page to approximate my constants
        // https://web.archive.org/web/20130807122227/http://i276.photobucket.com/albums/kk21/jdaster64/smb_playerphysics.png
        // I converted these values from hex and into units of pixels and seconds.
        
        const MIN_WALK = 4.453125;
        const MAX_WALK = 93.75;
        const MAX_RUN = 153.75;
        const ACC_WALK = 133.59375;
        const ACC_RUN = 200.390625;
        const DEC_REL = 182.8125;
        const DEC_SKID = 365.625;
        const MIN_SKID = 33.75;

        const STOP_FALL = 1575;
        const WALK_FALL = 1800;
        const RUN_FALL = 2025;
        const STOP_FALL_A = 450;
        const WALK_FALL_A = 421.875;
        const RUN_FALL_A = 562.5;

        const MAX_FALL = 270;



        if (this.dead) {
            this.velocity.y += RUN_FALL * TICK;
            this.y += this.velocity.y * TICK * PARAMS.SCALE;
        } else {
            if (this.game.right) {
                this.facing = 0;
            } else if (this.game.left) {
                this.facing = 1;
            }
            if (!this.game.right && !this.game.left) {
                if (this.facing === 0) {
                    this.state = 0;
                    if (this.velocity.x > 0) {
                        // this.velocity.x -= DEC_SKID * TICK; skid stop
                        this.velocity.x = 0;
                    } else {
                        this.velocity.x = 0;
                    }
                } if (this.facing === 1) {
                    this.state = 0;
                    if (this.velocity.x > 0) {
                        this.velocity.x -= DEC_SKID * TICK;
                    } else {
                        this.velocity.x = 0;
                    }
                }
            }
            if (this.facing === 0) {
                if (this.game.right && !this.game.left) {
                    this.state = 1;
                    this.velocity.x += ACC_WALK * TICK;
                } else if (!this.game.right && this.game.left) {
                    this.velocity.x -= DEC_SKID * TICK;
                    this.state = 1;
                }
            } else if(this.facing === 1) {
                if (!this.game.right && this.game.left) {
                    this.state = 1;
                    this.velocity.x -= ACC_WALK * TICK;
                } else if (this.game.right && !this.game.left) {
                    this.velocity.x += DEC_SKID * TICK;
                    this.state = 1;
                }
            } if (this.game.A && this.facing === 0) {
                this.state = 2;
                this.velocity.x = 0;
            } else if (this.game.A && this.facing === 1) {
                this.state = 2;
                this.velocity.x = 0;
            }
            if (this.game.B) {

                if (this.velocity.y === 0) {
                    this.velocity.y += -250;
                    this.fallAcc = STOP_FALL / 2;
                } else if (this.velocity.y < -500) {
                    // this.velocity.y += 50;
                    // this.fallAcc = STOP_FALL/2;

                }

            }
            // } else if (this.game.B && this.facing === 1 && this.velocity.y === 0) {
            //     this.state = 3;
            // }

            // // update velocity
            //     // ground physics
            //     if (Math.abs(this.velocity.x) < MIN_WALK) {  // slower than a walk // starting, stopping or turning around
            //         this.velocity.x = 0;
            //         this.state = 0;
            //         if (this.game.left) {
            //             this.velocity.x -= MIN_WALK;
            //         }
            //         if (this.game.right) {
            //             this.velocity.x += MIN_WALK;
            //         }
            //     } else if (Math.abs(this.velocity.x) >= MIN_WALK) {  // faster than a walk // accelerating or decelerating
            //         if (this.facing === 0) {
            //             if (this.game.right && !this.game.left) {
            //                 if (this.game.B) {
            //                     this.velocity.x += ACC_RUN * TICK;
            //                 } else this.velocity.x += ACC_WALK * TICK;
            //             } else if (this.game.left && !this.game.right) {
            //                 this.velocity.x -= DEC_SKID * TICK;
            //                 this.state = 3;
            //             } else {
            //                 this.velocity.x -= DEC_REL * TICK;
            //             }
            //         }
            //         if (this.facing === 1) {
            //             if (this.game.left && !this.game.right) {
            //                 if (this.game.B) {
            //                     this.velocity.x -= ACC_RUN * TICK;
            //                 } else this.velocity.x -= ACC_WALK * TICK;
            //             } else if (this.game.right && !this.game.left) {
            //                 this.velocity.x += DEC_SKID * TICK;
            //                 //this.state = 1;
            //             } else {
            //                 this.velocity.x += DEC_REL * TICK;
            //             }
            //         }
            //     }
            //
                this.velocity.y += this.fallAcc * TICK;



         }
        // collision
        var that = this;
        this.game.entities.forEach( function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) { //falling
                    if ((entity instanceof Ground || entity instanceof Bridge)) {
                        that.y = entity.BB.top - that.BB.height - 53 ;
                        that.velocity.y = 0;

                    }
                }
            }
        });

        // this.game.entities.forEach(function (entity) {
        //     if (entity.BB && that.BB.collide(entity.BB)) {
        //         if (that.velocity.y > 0) { // falling
        //             if ((entity instanceof Ground) // landing
        //                 && (that.lastBB.bottom) <= entity.BB.top) { // was above last tick
        //                 that.velocity.y === 0;
        //                 that.y = entity.BB.top - that.BB.height;
        //
        //             }
        //         }
        //
        //         // if ((entity instanceof Ground) && that.BB.bottom > entity.BB.top) {
        //         //     if (that.BB.collide(entity.leftBB)) {
        //         //         that.x = entity.BB.left - PARAMS.BLOCKWIDTH;
        //         //         if (that.velocity.x > 0) that.velocity.x = 0;
        //         //     } else {
        //         //         that.x = entity.BB.right;
        //         //         if (that.velocity.x < 0) that.velocity.x = 0;
        //         //     }
        //         //     that.updateBB();
        //         // }
        //     }
        // });

            // max speed calculation
            if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
            if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

            if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN;
            if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN;
            if (this.velocity.x >= MAX_WALK && !this.game.B) this.velocity.x = MAX_WALK;
            if (this.velocity.x <= -MAX_WALK && !this.game.B) this.velocity.x = -MAX_WALK;


            // update position
            this.x += this.velocity.x * TICK * PARAMS.SCALE;
            this.y += this.velocity.y * TICK * PARAMS.SCALE;
            this.updateBB();




    };


    draw(ctx) {
        //this.animation.drawFrame(this.game.clockTick, ctx, 300, 300, 3);
        if (this.dead) {
            this.deadAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        } else if (this.facing === 0) {  //facing right, need to offset
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x,
                this.y - this.game.camera.y , PARAMS.SCALE / 3);
        } else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 50,
                                                               this.y - this.game.camera.y, PARAMS.SCALE / 3);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
};