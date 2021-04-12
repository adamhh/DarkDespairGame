/**
 * This class handles the health potions that the character can pick up.
 * @author Adam Hall
 */
class HealthPotion {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.imagesheet = ASSET_MANAGER.getAsset("./sprites/gameassets/ingame_items.png");
        this.w = 25;
        this.h = 32;
        this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
        this.drank = false;
        this.floatY = 0;
        this.step = .1;
    }

    //Apply a float effect to the object.
    update() {
        this.floatY += this.step;
        if (this.drank) {
            this.BB = new BoundingBox(0, 0,0, 0);
        }
    };

    //Draw the asset with the float effect
    draw(ctx) {
        if (Math.round(parseFloat(this.floatY) * 10) > 50) {
            this.step = -.1
        }
        else if (Math.round(parseFloat(this.floatY) * 10) < -50) {
            this.step = +.1
        }
        if (!this.drank) {
            ctx.drawImage(this.imagesheet, 0, 0, 50, 65, this.x - this.game.camera.x, this.y - this.game.camera.y + this.floatY, this.w, this.h);
        }
        if (PARAMS.DEBUG) {
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y + this.floatY, this.BB.width, this.BB.height);
            }
        }
    }
 }

/**
 * This class handles the soul that the character acquires, as well as the 'keyed' souls
 * that allow access to portals.
 *
 * @author Adam Hall
 */
class Soul {
    constructor(game, x, y, value, isKey) {
        Object.assign(this, {game, x, y, value, isKey});

        this.imagesheet = ASSET_MANAGER.getAsset("./sprites/gameassets/ingame_items.png");
        this.w = 35;
        this.h = 45;
        this.sourceY = 0;
        this.sourceH = 96

        this.isKey ? this.sourceX = 134 : this.sourceX = 59;
        this.isKey ? this.sourceW = 90 : this.sourceW = 71;


        this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
        this.consumed = false;
        this.floatY = 0;
        this.step = .1;
    }

    //Apply float
    update() {
        this.floatY += this.step;
        if (this.consumed) {
            this.BB = new BoundingBox(0, 0,0, 0);
        }
    };

    //Draws the asset to the canvas with flaot effect
    draw(ctx) {
        if (Math.round(parseFloat(this.floatY) * 10) > 50) {
            this.step = -.1
        }
        else if (Math.round(parseFloat(this.floatY) * 10) < -50) {
            this.step = +.1
        }
        if (!this.consumed) {
            ctx.drawImage(this.imagesheet, this.sourceX, this.sourceY, this.sourceW, this.sourceH, this.x - this.game.camera.x,
                            this.y - this.game.camera.y + this.floatY, this.w, this.h);
        }
        if (PARAMS.DEBUG) {
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y + this.floatY, this.BB.width, this.BB.height);
            }
        }
    }
}

/**
 * A specialty item that the character can pick up.
 *
 * @author Adam Hall
 */
class IceArrow {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.imagesheet = ASSET_MANAGER.getAsset("./sprites/gameassets/ingame_items.png");
        this.w = 25;
        this.h = 45;
        this.sourceY = 0;
        this.sourceH = 96
        this.sourceX = 230;
        this.sourceW = 25;
        this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
        this.consumed = false;
        this.floatY = 0;
        this.step = .1;
    }

    //Apply float
    update() {
        this.floatY += this.step;
        if (this.consumed) {
            this.BB = new BoundingBox(0, 0,0, 0);
            this.removeFromWorld = true;
        }
    };

    //Draw asset with float effect
    draw(ctx) {
        if (Math.round(parseFloat(this.floatY) * 10) > 50) {
            this.step = -.1
        }
        else if (Math.round(parseFloat(this.floatY) * 10) < -50) {
            this.step = +.1
        }
        if (!this.consumed) {
            ctx.drawImage(this.imagesheet, this.sourceX, this.sourceY, this.sourceW, this.sourceH, this.x - this.game.camera.x,
                this.y - this.game.camera.y + this.floatY, this.w, this.h);
        }
        if (PARAMS.DEBUG) {
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y + this.floatY, this.BB.width, this.BB.height);
            }
        }
    }
}