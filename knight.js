class Knight {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        //spritesheets
        this.setFields();
        this.updateBB();
        this.loadAnimations();

    }

    setFields() {
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/knight.png");
        this.facing = 0; //0 for right, 1 for left
        this.state = 0;  //0 for idle, 1 for running, 2 for attacking

        this.velocity = { x: 0, y: 0 };
        this.width = 55;
        this.height = 90;

        this.animations = [];
        this.disappearAnim = [];
        this.deadAnim = [];

        this.timer = new Timer();
        this.time1 = this.timer.getTime();
        this.time2 = this.time1;

        this.dead = false;
        this.disappear = false;
        this.health = 60;
        this.deathCount = 3;
    }

    loadAnimations() {
        //initialize
        for (var i = 0; i < 3; i++) { //0 idle 1 running 2 attacking
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { //2 directions, 0 for right, 1 for left
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

        //death
        // facing right
        this.deadAnim[0] = new Animator(this.spritesheet, 2165, 400, 148, 117, 5,
            .15, 2, false, true);
        //facing left
        this.deadAnim[1] = new Animator(this.spritesheet, 1375, 400, 148, 117, 5,
            .15, 2, true, true);
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.sight = new BoundingBox(this.x - 650, this.y - 100, 1225, this.height + 100);
        if (this.disappear) {
            this.ABB = new BoundingBox(0, 0, 0, 0);
        } else if (this.state === 2) {
            if (this.facing === 0) {
                this.ABB = new BoundingBox(this.x + 60, this.y + 55, 75, 15); //facing 0
            } else {
                this.ABB = new BoundingBox(this.x - 45, this.y + 55, 75, 15);
            }
        } else {
            this.ABB = new BoundingBox(0, 0, 0, 0);
        }
    }

    die() {
        this.BB = new BoundingBox(0,0,0,0);
        this.velocity.x = 0
        this.dead = true;
    }

    vanish() {
        this.BB = new BoundingBox(0,0,0,0);
        this.time1 = this.timer.getTime();
        this.velocity.x = 0;
        this.deathCount > 0 ? this.disappear = true : this.die();
        this.updateBB();
    }

    update() {
        //console.log(this.health);
        if (PARAMS.START) {
            if (this.health < 1 && this.disappear === false) {
                this.time1 = this.timer.getTime();
                this.time2 = this.time1;
                this.vanish();
            }
            const TICK = this.game.clockTick;
            const MAX_RUN = 150;
            const RUN_ACC = 20;
            const MAX_FALL = 100;
            const FALL_ACC = .5;
            let moveTo = 0;
            let that = this;
            let inSight = false;
            //collision system
            if (!this.dead && !this.disappear) {
                this.game.entities.forEach(function (entity) {
                    if (entity.BB && that.BB.collide(entity.BB)) { //BB collision
                        if (that.velocity.y > 0) { //falling
                            if ((entity instanceof Land || entity instanceof FloatingLand) &&
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
                            let flipX = 0;
                            that.facing === 1 ? flipX = 22 : flipX = 20;
                            if (entity.BB.x - that.BB.x < flipX) {
                                that.facing = 1;
                            } else {
                                that.facing = 0;

                            }
                            moveTo = entity.BB.x;
                        }
                        if (entity.ABB && that.BB.collide(entity.ABB)) {
                            that.health-= 2.5;
                            //that.facing === 0 ? that.x -= 5 : that.x += 5;
                            that.updateBB();
                        }
                    }
                    if (entity instanceof Arrow) {
                        if (entity.BB && that.BB.collide(entity.BB)) {
                            if (entity.isAssassin === true) {
                                that.health--;
                            }
                        }
                    }
                });
                let playerDiff = 0;
                if (this.facing === 1 && inSight) {                                 //facing and in sight <-
                    playerDiff = this.x - moveTo;
                    //console.log(playerDiff + " <-");
                    if (playerDiff < 525 && playerDiff > 45) {                       //if close walk to attack position
                        this.velocity.x -= RUN_ACC;
                        this.state = 1;
                    } else if (playerDiff < 45 && playerDiff > -25) {              //attack if in zone
                        this.velocity.x = 0;
                        this.state = 2;
                    } else {                                                        //else stop
                        this.velocity.x = 0;
                        this.state = 0;
                    }

                } else if (inSight) {                                               //facing and in sight ->
                    playerDiff = moveTo - this.x;
                    //console.log(playerDiff + " ->");
                    if (playerDiff < 550 && playerDiff > 70) {                     //in zone will walk towards
                        this.velocity.x += RUN_ACC;
                        this.state = 1;
                    } else if (playerDiff < 70 && playerDiff > -25) {
                        this.velocity.x = 0;
                        this.state = 2;
                    } else {                                                        //else stop
                        this.velocity.x = 0;
                        this.state = 0;
                    }
                } else {
                    this.state = 0;
                    this.velocity.x = 0;
                }

                // update position

                this.velocity.y += FALL_ACC;
                if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
                //if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;
                this.y += this.velocity.y;

                if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN;
                if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN;
                this.x += this.velocity.x * TICK * PARAMS.SCALE;
                this.updateBB();

                //if dead
            } else {
                this.time2 = this.timer.getTime();
                if (this.time2 - this.time1 > 500) {
                    this.x = -5000;
                    this.y = -5000;
                    this.disappear = false;
                    this.health = 100;
                }
            }
        }

    }

    draw(ctx) {
        let yOffset = 0;
        let xOffset = 0;
        if (this.dead || this.disappear) {
            this.facing === 0 ? xOffset = -5 : xOffset = -30;
            this.deadAnim[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + xOffset,
                this.y - this.game.camera.y, .75);
        } else {
            this.facing === 0 ? xOffset = -10 : xOffset = -40
            this.facing === 0 ? yOffset = 2 : yOffset = 5;
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + xOffset,
                this.y - this.game.camera.y + yOffset, .75);
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeStyle = 'Blue';
            if (this.ABB) ctx.strokeRect(this.ABB.x - this.game.camera.x, this.ABB.y - this.game.camera.y, this.ABB.width, this.ABB.height);
            ctx.strokeStyle = "White";
            ctx.strokeRect(this.sight.x - this.game.camera.x, this.sight.y - this.game.camera.y, this.sight.width, this.sight.height);
        }
    }
}
