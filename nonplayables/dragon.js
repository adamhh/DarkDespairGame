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
        this.health = 100;
        this.attackWindow = false;
        this.attackTick = 0;
        this.deadCount = 0;
        this.deathAudio = true;
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
        this.animations[3][0] = new Animator(this.spritesheet, 25, 1282, sWidth + 20, sHeight + 5, 15, 0.09, 92.5, true, false);
        this.animations[3][1] = new Animator(this.spritesheet, 8, 1090, sWidth + 20, sHeight + 5, 15, 0.09, 92.5, false, false);

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
                if (this.state === 2 && this.attackWindow) {
                    this.ABB = new BoundingBox(this.x + 30, this.y + 120, 100, 70);

                }

            } else {
                this.BB = new BoundingBox(this.x + xOffset, this.y + yOffset, this.width, this.height - 75);
                if (this.state === 2 && this.attackWindow) {
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
        this.BB = new BoundingBox(this.BB.x, this.BB.y, 0, this.BB.height)
        this.dead = true;
    }

    update() {
        const TICK = this.game.clockTick;
        this.attackTick += TICK;

        const MAX_WALK = 200;
        const MAX_FALL = 100;
        const FALL_ACC = .5;
        const ATTACK_WINDOW = .88;
        let moveTo = 0;
        let that = this;
        let inSight = false;
        let attackZone = false;


        if (PARAMS.START && !PARAMS.PAUSE) {
            //collision system
            if (this.health > 0) {
                this.game.entities.forEach(function (entity) {
                    if (entity.BB && that.BB.collide(entity.BB)) { //BB collision
                        if (entity instanceof Arrow) {
                            switch (PARAMS.DIFFICULTY) {
                                case PARAMS.EASY:
                                    that.health-=10;
                                    break;
                                case PARAMS.HARD:
                                    that.health -=3;
                                    break
                                default:
                                    that.health-=5;
                                    break;
                            }
                            if (entity.isPowered) {
                                that.health-=20;
                            }
                            that.health-=PARAMS.SOULS/2000;
                        }
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
                            if (entity.BB.y > that.y) {
                                attackZone = true;
                            }
                            if ((entity.BB.x - that.sight.x) < (that.sight.x + that.sight.width) - entity.BB.x) {
                                that.facing = 1;
                            } else {
                                that.facing = 0;
                            }
                            moveTo = entity.BB.x;
                        }  else {
                            that.velocity.x = 0;
                            that.state = 0;
                        }
                        if (entity.ABB && that.BB.collide(entity.ABB)) {
                            that.health-=(.2 + PARAMS.SOULS/5000);
                        }
                    }
                });
                let playerDiff = 0;
                if (this.facing === 1 && inSight) {                                        //facing and in sight <-
                    playerDiff = this.x - moveTo;
                    //console.log(playerDiff);
                    if (playerDiff < 700 && playerDiff > -20 && this.x > 4500) {          //if close walk to attack position but don't walk off edge
                        this.velocity.x -= MAX_WALK;
                        this.state = 1;
                    } else if (playerDiff < 20 && playerDiff > -180 && attackZone) {     //attack if in zone
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
                if (this.attackTick > ATTACK_WINDOW) {

                    this.attackTick = 0;
                    this.attackWindow = true;
                }
                else {
                    this.attackWindow = false;
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
                this.die();
            }
        }
        if (this.dead) {
            this.deadCount+= TICK;
            if (this.deathAudio) {
                ASSET_MANAGER.pauseBackgroundMusic();
                ASSET_MANAGER.playAsset("./audio/dragon_death.mp3");
                this.deathAudio = false;
            }
            if (this.deadCount > 3) {
                PARAMS.WIN = true;
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

        let healthOffset = 200;
        if (this.facing === 1) healthOffset = 150;
        ctx.strokeStyle = "Black";
        ctx.fillStyle = "Green";
        let health = this.health/1.25;
        if (this.dead) health = 0;
        ctx.strokeRect(this.x - this.game.camera.x + healthOffset, this.y - this.game.camera.y - 30, 80, 3);
        ctx.fillRect(this.x - this.game.camera.x + healthOffset, this.y - this.game.camera.y - 30, health, 3);

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
