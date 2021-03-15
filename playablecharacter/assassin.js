class Assassin {
    constructor(game, x, y, healthBar, weaponIcon) {
        Object.assign(this, {game, x, y, healthBar, weaponIcon});
        this.game.assassin = this;
        // spritesheets
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/characters/assassin.png");
        this.spritesheetSword = ASSET_MANAGER.getAsset("./sprites/characters/assassin_sword.png");
        this.spritesheetBow = ASSET_MANAGER.getAsset("./sprites/characters/assassin_bow.png");

        this.setFields();
        this.updateBB();
        this.loadAnimations();


    };

    setFields() {
        // assassin's state variables
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0;  // 0 idle, 1, walking , 3 attacking
        this.weapon = 0; //0 hand, 1 sword, 2 bow
        this.dead = false;

        //timer for various things
        this.timer = new Timer();
        this.time1 = this.timer.getTime();
        this.time2 = this.time1;
        this.attacking = false;
        this.attackStart = this.timer.getTime();
        this.attackEnd = this.attackStart;
        this.arrowFlag = true;
        this.attackWindow = false;
        this.game.One = true;
        this.bowTime = this.time2;
        this.isKeyed = false;
        this.teleport = false;
        this.hasIceArrow = false;
        this.deadCount = 0;
        this.hit = false;


        //boolean flag for double jump
        this.jumpFlag = false;
        this.velocity = {x: 0, y: 0};
        this.fallAcc = 2000;
        this.deadAudio = true;

        this.phase = 0;
        if (PARAMS.YSPAWN === 3800)  {
            this.phase++;
            PARAMS.SOULS = PARAMS.SAVEDSOULS;
        }
        if (PARAMS.YSPAWN === -20) {
            this.phase+=2;
            PARAMS.SOULS = PARAMS.SAVEDSOULS;
        }

        this.yFallBounds = [1800, 6500, 1000];
        this.portalLocations = [{x: 0, y: 0}, {x: 2770, y: 3800}, {x: 4800, y: -20}];

        //load animation
        this.animations = [];
        this.deadAnimL = [];
        this.deadAnimR = [];

    }

    loadAnimations() {
        for (var i = 0; i < 5; i++) {  //Action State: 0-idle,1-walking,2-attacking,3-jumping,4-running
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { //Direction State: 0-right, 1-left
                this.animations[i].push([]);
                for (var k = 0; k < 3; k++) { //Weapon State: 0-unequipped, 1-sword, 2-bow
                    this.animations[i][j].push([]);
                }
            }
        }
        for (var h = 0; h < 3; h++) {
            this.deadAnimL.push([]);
            this.deadAnimR.push([]);
        }
        //idle animation for state 0
        // facing right
        this.animations[0][0][0] = new Animator(this.spritesheet, 35, 16, 65, 91, 12,
            0.05, 125.05, false, true);

        // facing left
        this.animations[0][1][0] = new Animator(this.spritesheet, 30, 115, 75, 91, 12,
            0.05, 115.05, true, true);

        //walking animation for state 1
        // facing right
        this.animations[1][0][0] = new Animator(this.spritesheet, 25, 218, 65, 91, 12,
            0.05, 125.05, false, true);

        // facing left
        this.animations[1][1][0] = new Animator(this.spritesheet, 45, 322, 70, 91, 12,
            0.05, 120.05, true, true);

        //attacking animation
        // facing right
        this.animations[2][0][0] = new Animator(this.spritesheet, 35, 630, 95, 91, 10,
            0.038, 95.05, false, true);

        // facing left
        this.animations[2][1][0] = new Animator(this.spritesheet, 50, 735, 95, 91, 10,
            0.038, 95.05, true, true);

        //jumping
        // facing right
        this.animations[3][0][0] = new Animator(this.spritesheet, 12, 1170, 90, 100, 1,
            .2, 100.05, false, true);
        //facing left
        this.animations[3][1][0] = new Animator(this.spritesheet, 20, 1270, 100, 100, 1,
            .2, 90.05, false, true);

        //running
        // facing right
        this.animations[4][0][0] = new Animator(this.spritesheet, 43, 415, 65, 91, 8,
            0.07, 125.05, false, true);

        // facing left
        this.animations[4][1][0] = new Animator(this.spritesheet, 33, 520, 75, 91, 8,
            0.05, 115.05, true, true);

        //death
        // facing right
        this.deadAnimR[0] = new Animator(this.spritesheet, 0, 860, 105, 120, 11,
            .07, 85.05, false, false);
        //facing left
        this.deadAnimL[0] = new Animator(this.spritesheet, 18, 1000, 105, 120, 11,
            .07, 85.05, true, false);

        //------------------------------for sword animations ---------------------------------

        //idle animation for state 0
        // facing right
        this.animations[0][0][1] = new Animator(this.spritesheetSword, 6, 16, 105, 91, 6,
            0.09, 85.05, false, true);

        // facing left
        this.animations[0][1][1] = new Animator(this.spritesheetSword, 5, 115, 105, 91, 6,
            0.09, 85.05, true, true);

        //walking animation for state 1
        // facing right
        this.animations[1][0][1] = new Animator(this.spritesheetSword, 25, 214, 105, 91, 10,
            0.05, 85.05, false, true);

        // facing left
        this.animations[1][1][1] = new Animator(this.spritesheetSword, 10, 318, 105, 91, 12,
            0.05, 85.05, true, true);

        //attacking animation
        // facing right
        this.animations[2][0][1] = new Animator(this.spritesheetSword, 18, 615, 155, 105, 10,
            0.045, 35.05, false, true);

        // facing left
        this.animations[2][1][1] = new Animator(this.spritesheetSword, 0, 722, 155, 105, 10,
            0.045, 35.05, true, true);

        //jumping
        // facing right
        this.animations[3][0][1] = new Animator(this.spritesheetSword, 12, 1155, 140, 100, 1,
            .2, 50.05, false, true);
        //facing left
        this.animations[3][1][1] = new Animator(this.spritesheetSword, 5, 1270, 140, 100, 1,
            .2, 50.05, false, true);

        //running
        // facing right
        this.animations[4][0][1] = new Animator(this.spritesheetSword, 43, 415, 105, 91, 8,
            0.06, 85.05, false, true);

        // facing left
        this.animations[4][1][1] = new Animator(this.spritesheetSword, 0, 520, 105, 91, 8,
            0.06, 85.05, true, true);

        //death
        // facing right
        this.deadAnimR[1] = new Animator(this.spritesheetSword, 0, 837, 115, 150, 12,
            .06, 75.05, false, false);
        //facing left
        this.deadAnimL[1] = new Animator(this.spritesheetSword, 50, 986, 125, 150, 9,
            .06, 65.05, true, false);

        this.swordEquipR = new Animator(this.spritesheetSword, 402, 1148, 105, 91, 7,
            .04, 85, false, false);
        this.swordEquipL = new Animator(this.spritesheetSword, 402, 1270, 105, 91, 7,
            .04, 85, true, false);


        //for bow animations ---------------------------------
        //idle animation for state 0
        // facing right
        this.animations[0][0][2] = new Animator(this.spritesheetBow, 2, 5, 85, 91, 6,
            0.07, 105.05, false, true);

        // facing left
        this.animations[0][1][2] = new Animator(this.spritesheetBow, 8, 106, 75, 91, 6,
            0.08, 115.05, true, true);

        //walking animation for state 1
        // facing right
        this.animations[1][0][2] = new Animator(this.spritesheetBow, 7, 216, 85, 91, 12,
            0.05, 105.05, false, true);

        // facing left
        this.animations[1][1][2] = new Animator(this.spritesheetBow, 7, 320, 85, 91, 12,
            0.05, 105.05, true, true);

        //attacking animation
        // facing right
        this.animations[2][0][2] = new Animator(this.spritesheetBow, 25, 630, 95, 91, 15,
            0.05, 94.95, false, true);

        // facing left
        this.animations[2][1][2] = new Animator(this.spritesheetBow, 20, 743, 95, 91, 15,
            0.05, 94.95, true, true);

        //jumping
        // facing right
        this.animations[3][0][2] = new Animator(this.spritesheetBow, 12, 1170, 100, 100, 1,
            .2, 90.05, false, true);
        //facing left
        this.animations[3][1][2] = new Animator(this.spritesheetBow, 20, 1270, 100, 100, 1,
            .2, 90.05, false, true);

        //running
        // facing right
        this.animations[4][0][2] = new Animator(this.spritesheetBow, 43, 420, 85, 91, 8,
            0.07, 105.05, false, true);

        // facing left
        this.animations[4][1][2] = new Animator(this.spritesheetBow, 27, 525, 85, 91, 8,
            0.05, 105.05, true, true);

        //death
        // facing right
        this.deadAnimR[2] = new Animator(this.spritesheetBow, 15, 845, 155, 135, 9,
            .07, 35.05, false, false);
        //facing left
        this.deadAnimL[2] = new Animator(this.spritesheetBow, 40, 1000, 155, 135, 9,
            .07, 35.05, true, false);


    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 15, this.y, 45, 85);
        if (this.attackWindow) {
            let xOff = 0;
            let yOff = 0;
            switch (this.weapon) {
                case 0:
                    ASSET_MANAGER.playAsset("./audio/kick.mp3")
                    if (this.facing === 0) xOff = 55;
                    this.ABB = new BoundingBox(this.x + xOff, this.y + 50, 40, 20);
                    break;
                case 1:
                    ASSET_MANAGER.playAsset("./audio/sword_swing.mp3");
                    this.facing === 0 ? xOff = 40 : xOff = -60;
                    this.ABB = new BoundingBox(this.x + xOff, this.y + 30, 85, 60);
                    break;
                case 2:
                    if (this.bowTime < 0.6 && this.bowTime > .4) {
                        if (this.arrowFlag) {
                            this.game.addEntity(new Arrow(this.game, this.x, this.y,
                                this.facing === 1, true, this.hasIceArrow));
                            this.hasIceArrow = false
                            ASSET_MANAGER.playAsset("./audio/arrow_whoosh.mp3")
                            this.arrowFlag = false;
                        }
                    } else {
                        this.bowTime = 0;
                    }
                    break;
            }
        } else {
            this.ABB = new BoundingBox(0, 0, 0, 0);
        }

    };

    update() {
        if (this.y > this.yFallBounds[this.phase]) {
            this.healthBar.updateHealth(-18);
        }
        const TICK = this.game.clockTick;
        this.time2 = this.timer.getTime();
        this.attackEnd = this.timer.getTime();
        this.bowTime += TICK;
        if (this.healthBar.isDead()) {
            this.dead = true;
            this.deadCount+= this.game.clockTick;
            if (this.deadCount > 1.5) {
                PARAMS.GAMEOVER = true;

            }

        }


        //-------------adjust constants to alter physics-----------
        //run
        let max_run = 200;         //adjust for maximum run speed
        let acc_run = 300;         //adjust for maximum acceleration
        const ACC_SPRINT = 600;   //adjust for maximum sprint acc
        const MAX_SPRINT = 800     //adjust for maximum sprint

        //skids
        const DEC_SKID = 4000;
        const TURN_SKID = 50;
        //jump
        const JUMP_ACC = 700;     //adjust for maximum jump acc
        const MAX_JUMP = 1000;    //adjust for maximum jump height
        const DBL_JUMP_MOD = 100; //adjust for double jump boost
        //falling
        const MAX_FALL = 1000;  //adjust for fall speed
        const STOP_FALL = 1575;
        //in air deceleration
        const AIR_DEC = 1;
        // console.log("(" + Math.floor(this.x) + "," + this.y + ")");
        if (PARAMS.START && !PARAMS.PAUSE) {
            if (this.dead) {
                this.velocity.y = 0;
                this.velocity.x = 0;
                this.BB = new BoundingBox(0, 0, 0, 0);
            } else {
                // collision
                var that = this;
                this.game.entities.forEach(function (entity) {
                    if (entity.BB && that.BB.collide(entity.BB)) {
                        if (entity instanceof Arrow && !entity.isAssassin) {
                            that.healthBar.updateHealth(-PARAMS.DIFFICULTY);
                            ASSET_MANAGER.playAsset("./audio/arrow_impact_soft.mp3")
                            that.velocity.x *= .95;
                        } else if (that.velocity.y > 0) { // falling
                            if ((entity instanceof Land || entity instanceof FloatingLand || entity instanceof Bridge) // landing
                                && (that.lastBB.bottom) <= entity.BB.top) { // was above last tick
                                that.velocity.y = 0;
                                that.y = entity.BB.top - that.BB.height;
                                that.updateBB();
                            }
                        } else if (that.velocity.y < 0) { // jumping
                            if (entity instanceof FloatingLand) {
                                if (that.lastBB.top > entity.BB.bottom) {
                                    that.velocity.y *= -.2;
                                    that.y = that.lastBB.y;
                                    that.updateBB();
                                }
                            }
                        }
                        if ((entity instanceof CaveWall || entity instanceof Land || entity instanceof FloatingLand)
                            && entity.BB.top - that.BB.bottom < -5) {
                            if (that.BB.left < entity.BB.left) {
                                that.x = entity.BB.left - (that.BB.width * 2) + 20;
                                if (that.velocity.x > 0) {
                                    that.velocity.x *= -.2;
                                }
                            } else { //<-
                                if (that.velocity.x < 0) {
                                    that.velocity.x *= -.2;
                                }
                                that.x = that.lastBB.left - 5;
                            }
                        } else if (entity instanceof HealthPotion) {
                            if (!that.healthBar.isFull()) {
                                that.healthBar.updateHealth(10);
                                entity.drank = true;
                            }
                        } else if (entity instanceof Soul) {
                            if (entity.isKey) {
                                PARAMS.SOULS += entity.value;
                                entity.consumed = true;
                                that.isKeyed = true;
                            } else {
                                PARAMS.SOULS += entity.value;
                                entity.consumed = true;
                            }
                        } else if (entity instanceof Portal) {
                            if (that.isKeyed) {
                                that.teleport = true;
                            }
                        } else if (entity instanceof IceArrow) {
                            if (!that.hasIceArrow) {
                                that.hasIceArrow = true;
                                entity.consumed = true;
                            }
                        }

                    }
                    if (entity instanceof Dragon) {
                        if (entity.BB && that.BB.collide(entity.BB)) {
                            that.velocity.x *= -.9;
                            if (that.facing === 0) {
                                that.x -= 5;
                            } else {
                                that.x += 5;
                            }
                        }
                        if (entity.ABB && that.BB.collide(entity.ABB)) {
                            if (!that.hit) {
                                switch (PARAMS.DIFFICULTY) {
                                    case PARAMS.EASY:
                                        that.healthBar.updateHealth(-1);
                                        break;
                                    case PARAMS.NORMAL:
                                        that.healthBar.updateHealth(-3);
                                        break;
                                    case PARAMS.HARD:
                                        that.healthBar.updateHealth(-7);
                                        break;
                                }
                                that.hit = true;
                                ASSET_MANAGER.playAsset("./audio/dragon_hit.mp3");
                            }
                        } else {
                            that.hit = false;
                        }
                    }
                    if ((entity instanceof ShadowWarrior || entity instanceof Knight || entity instanceof RedEye)
                        && entity.BB && that.BB.collide(entity.BB)) {
                        that.velocity.x *= .9;
                    }
                    if (entity.ABB && entity instanceof ShadowWarrior && that.BB.collide(entity.ABB)) {
                        if (that.state !== 3) {
                            that.healthBar.updateHealth(-(.5 + PARAMS.DIFFICULTY));
                            ASSET_MANAGER.playAsset("./audio/sword_hit_player2.mp3");
                        }
                    }
                    if (entity.ABB && entity instanceof Knight && that.BB.collide(entity.ABB)) {
                        if (that.state !== 3) {
                            that.healthBar.updateHealth(-PARAMS.DIFFICULTY);
                            ASSET_MANAGER.playAsset("./audio/sword_hit_player_knight.mp3");
                        }

                    }

                });

                let yVel = Math.abs(this.velocity.y);
                //this physics will need a fine tuning;
                let attackLength = 0;
                if (this.game.One) {
                    this.weapon = 0;
                    attackLength = 380;
                    this.weaponIcon.updateWeapon(0);
                }
                if (this.game.Two) {
                    this.weapon = 1;
                    attackLength = 450;
                    this.weaponIcon.updateWeapon(1);
                }
                if (this.game.Three) {
                    this.weapon = 2;
                    attackLength = 750;
                    this.weaponIcon.updateWeapon(2);
                }
                if (this.attackEnd - this.attackStart > attackLength) {
                    this.attacking = false;
                } else {
                    this.attacking = true;
                }
                if ((this.attackEnd - this.attackStart > attackLength - 200) && (this.attackEnd - this.attackStart < attackLength) &&
                    this.state === 2) {
                    this.attackWindow = true;
                } else {

                    this.attackWindow = false;
                    this.arrowFlag = true;
                }
                this.updateBB();
                if (!this.attacking) {
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
                        if (yVel < 20) {
                            this.velocity.x = 0;
                        }
                        this.bowTime = 0;
                        this.attackStart = this.timer.getTime();
                    }

                    if (this.game.B) {
                        this.state = 3;
                        if (this.velocity.y > 500) this.state = 0;
                    } else if (!this.game.A && !this.game.B && !this.game.right && !this.game.left) {
                        this.state = 0;
                    }
                    if (this.game.C) {
                        if (this.game.left || this.game.right) {
                            this.state = 4;
                        }
                        acc_run = ACC_SPRINT;
                        max_run = MAX_SPRINT;
                    }
                    if (this.game.A && this.game.B) {
                        if (this.velocity.y > 200) this.state = 0;
                        else this.state = 3;
                    }
                    if (this.game.B && this.game.C && (this.game.right || this.game.left)) {
                        this.state = 0;
                    }

                    //if moving right and then face left, skid
                    if (this.game.left && this.velocity.x > 0 && yVel < 20) {
                        this.velocity.x -= TURN_SKID;
                    }
                    //if moving left ann then face right, skid
                    if (this.game.right && this.velocity.x < 0 && yVel < 20) {
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
                                this.velocity.x -= AIR_DEC;
                            }
                        } else { //if you unpress left and right while moving left
                            if (this.velocity.x < 0 && yVel < 20) {
                                this.velocity.x += DEC_SKID * TICK;
                            } else if (yVel < 20) {
                                this.velocity.x = 0;
                            } else if (this.velocity.x < 0) { //this is where you control horizontal deceleration when in air
                                this.velocity.x += AIR_DEC;
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
                    } else if (this.facing === 1) {                  //facing left
                        if (!this.game.right && this.game.left) {   //and pressing left.
                            if (yVel < 10 && !this.game.B) {        //makes sure you are on ground
                                this.velocity.x -= acc_run * TICK;
                            }
                        }
                    }

                    if (this.game.B) {
                        let timeDiff = this.time2 - this.time1;
                        if (this.velocity.y === 0) { // add double jump later
                            this.time1 = this.timer.getTime();
                            this.velocity.y -= JUMP_ACC;
                            this.fallAcc = STOP_FALL;
                            this.jumpFlag = true;
                        } else if (!this.jumpFlag && timeDiff > 100 && timeDiff < 250) {
                            this.velocity.y -= DBL_JUMP_MOD;
                            this.fallAcc = STOP_FALL;
                        }
                    }
                }
                // max speed calculation
                if (this.velocity.x >= max_run) this.velocity.x = max_run;
                if (this.velocity.x <= -max_run) this.velocity.x = -max_run;
                // update position
                this.velocity.y += this.fallAcc * TICK;
                this.y += this.velocity.y * TICK * PARAMS.SCALE;
                if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
                if (this.velocity.y <= -MAX_JUMP) this.velocity.y = -MAX_FALL;

                this.x += this.velocity.x * TICK * PARAMS.SCALE;
                if (this.teleport) {
                    ASSET_MANAGER.playAsset("./audio/teleport.mp3")
                    PARAMS.SAVEDSOULS = PARAMS.SOULS;
                    this.phase++;
                    this.x = this.portalLocations[this.phase].x;
                    this.y = this.portalLocations[this.phase].y;
                    PARAMS.XSPAWN = this.x;
                    PARAMS.YSPAWN = this.y;
                    if (this.phase === 1) {
                        this.game.phaseOneDone();
                    }
                    if (this.phase === 2) {
                        ASSET_MANAGER.playAsset("./audio/growl.mp3");
                        this.game.phaseTwoDone();
                    }
                    this.velocity.x = 0;
                    this.isKeyed = false;
                    this.teleport = false;
                }
                this.updateBB(); //Update your bounding box every tick
            }
        }
    };


    draw(ctx) {
        let xOffset = 0;
        let yOffset = 0;
        if (this.dead) {
            if (this.deadAudio) {
                ASSET_MANAGER.playAsset("./audio/player_death.mp3")
                this.deadAudio = false;
            }

            if (this.weapon === 0 && this.facing === 0) {
                xOffset = -45;
                yOffset = -23;
            } else if (this.weapon === 0 && this.facing === 1) {
                xOffset = -35;
                yOffset = -20;
            } else if (this.weapon === 1 && this.facing === 0) {
                xOffset = -75;
                yOffset = -45;
            } else if (this.weapon === 1 && this.facing === 1) {
                xOffset = -0;
                yOffset = -42;
            } else if (this.weapon === 2 && this.facing === 0) {
                xOffset = -65;
                yOffset = -40;
            } else if (this.weapon === 2 && this.facing === 1) {
                xOffset = -30;
                yOffset = -30;

            }
            if (this.facing === 0) {
                this.deadAnimR[this.weapon].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + xOffset,
                    this.y - this.game.camera.y + yOffset, 1);
            } else {
                this.deadAnimL[this.weapon].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + xOffset,
                    this.y - this.game.camera.y + yOffset, 1);
            }
        } else {
            if (this.weapon === 0) {
                xOffset = 0;
                yOffset = 0;
            } else if (this.weapon === 1) {
                if (this.state === 0) {
                    if (this.facing === 1) yOffset = 1;
                    this.facing === 0 ? xOffset = 0 : xOffset = -27;
                } else if (this.state === 1 && this.facing === 1) {
                    xOffset = -15;
                    yOffset = 0;
                } else if (this.state === 2 && this.facing === 0) {
                    xOffset = -18;
                    yOffset = -15;
                } else if (this.state === 2 && this.facing === 1) {
                    xOffset = -68;
                    yOffset = -15;
                } else if (this.state === 3 && this.facing === 1) {
                    xOffset = -45;
                    yOffset = 0;
                } else if (this.state === 4 && this.facing === 1) {
                    xOffset = -20;
                    yOffset = -5;
                }
            } else { //if bow
                //console.log(this.facing + " " + this.state);
                if (this.state === 0) {
                    yOffset = 1;
                    this.facing === 0 ? xOffset = 0 : xOffset = 0;
                } else if (this.state === 2) {
                    this.facing === 0 ? xOffset = 0 : xOffset = -7;
                } else if (this.state === 4) {
                    yOffset = 5;
                }

            }
            yOffset -= 5;
            this.animations[this.state][this.facing][this.weapon].drawFrame(this.game.clockTick, ctx,
                this.x - this.game.camera.x + xOffset, this.y - this.game.camera.y + yOffset, 1);

        }

        if (PARAMS.DEBUG) {
            // ctx.strokeStyle = 'Red';
            // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.ABB.x - this.game.camera.x, this.ABB.y - this.game.camera.y, this.ABB.width, this.ABB.height);

        } else if (this.weapon === 2) {
            ctx.strokeStyle = 'White';
            //ctx.arc()
            ctx.strokeRect(this.ABB.x - this.game.camera.x, this.ABB.y - this.game.camera.y, this.ABB.width, .25);
        }


    }
};