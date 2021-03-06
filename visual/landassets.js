/**
 * This class handles the land blocks of the cave.
 *
 * @author Adam Hall
 */
class Land {
    constructor(game, x, y, type) {
        Object.assign(this, {game, x, y, type});
        switch (type) {
            case 'R': //landblock right end piece
                this.image = ASSET_MANAGER.getAsset("./sprites/backgroundassets/landendR.png");
                this.w = 930;
                this.h = 345;
                this.BB = new BoundingBox(this.x, this.y + 96, this.w, this.h - 120);
                break;
            case 'L': //landblock left end piece
                this.image = ASSET_MANAGER.getAsset("./sprites/backgroundassets/landendL.png");
                this.w = 930;
                this.h = 345;
                this.BB = new BoundingBox(this.x, this.y + 96, this.w, this.h - 120);
                break;
            default: //center land block
                this.image = ASSET_MANAGER.getAsset("./sprites/backgroundassets/landblock.png");
                this.w = 930;
                this.h = 345;
                this.BB = new BoundingBox(this.x, this.y + 96, this.w, this.h - 120);
                break;
        }
    };

    //Needed for each entity, even if empty.
    update() {
    };

    //Draw the assets
    draw(ctx) {
        ctx.drawImage(this.image, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

/**
 * This class handles the bridges in the game.
 *
 * @author Adam Hall
 */
class Bridge {
    constructor(game, x, y, type) {
        Object.assign(this, {game, x, y, type});
        switch (type) {
            case 0:
                this.image = ASSET_MANAGER.getAsset("./sprites/backgroundassets/bridge.png");
                this.sw = 1492;
                this.sh = 106;
                this.w = 500;
                this.h = 30;
                this.BB = new BoundingBox(this.x + 20, this.y, this.w - 50, this.h);
                break;
            default:
                this.image = ASSET_MANAGER.getAsset("./sprites/backgroundassets/bridge2.png");
                this.sw = 534;
                this.sh = 90;
                this.w = 250;
                this.h = 30;
                this.BB = new BoundingBox(this.x + 20, this.y + 5, this.w - 50, this.h);
                break;
        }


    };

    //Needed even if empty.
    update() {

    };

    //Draw the bridges
    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, this.sw, this.sh, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

/**
 * This class handles the cave walls in the game
 *
 * @author Adam Hall
 */
class CaveWall {
    constructor(game, x, y, scale, type) {
        Object.assign(this, {game, x, y, scale, type});
        this.w = 572;

        switch (this.type) {
            case 0:
                this.image = ASSET_MANAGER.getAsset("./sprites/backgroundassets/cavewall_left.png");
                this.h = 1053 * this.scale;
                break;
            case 1:
                this.image = ASSET_MANAGER.getAsset("./sprites/backgroundassets/cavewall_right.png");
                this.h = 1053 * this.scale;
                break;
            case 2:
                this.image = ASSET_MANAGER.getAsset("./sprites/backgroundassets/cavewall_left2.png")
                this.h = 1220 * this.scale;
                break;
            default:
                this.image = ASSET_MANAGER.getAsset("./sprites/backgroundassets/cavewall_right2.png")
                this.h = 1220 * this.scale;
                break;

        }

        this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
    }

    //Needed, even if empty.
    update() {

    }

    //Draw the cave walls
    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, 573, 1190, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}

/**
 * This class handles the grass in the game.
 *
 * @author Adam Hall
 */
class Grass {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.w = 120;
        this.h = 75;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgroundassets/landassets.png");
    }

    //needed, even if empty.
    update() {

    }

    //Draw the grass to the canvas
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 405, this.w, this.h, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);

    };
}

/**
 * This class handles the cave ceiling assets in the game
 *
 * @author Adam Hall
 */
class Ceiling {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.w = 1000;
        this.h = 850;
        this.image = ASSET_MANAGER.getAsset("./sprites/backgroundassets/ceiling.png");
    }

    //Needed, even if empty
    update() {

    }

    //Draw to canvas
    draw(ctx) {
        ctx.drawImage(this.image, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);

    };
}

/**
 * This class handles the different types of floating land in the game.
 *
 * @author Adam Hall
 */
class FloatingLand {
    constructor(game, x, y, type) {
        Object.assign(this, {game, x, y, type});
        this.imagesheet = ASSET_MANAGER.getAsset("./sprites/backgroundassets/floating_land.png");
        switch (type) {
            case 0:
                this.yLoc = 0;
                this.w = 189;
                this.h = 174;
                break;
            case 1:
                this.yLoc = 192;
                this.w = 265;
                this.h = 110;
                break;
            default:
                this.yLoc = 313;
                this.w = 225;
                this.h = 140;
                break;
        }
        this.xLoc = 0;
        this.BB = new BoundingBox(this.x, this.y + 10, this.w, this.h);
    };

    //Neeeded, even if empty.
    update() {
    };

    //Draw to the canvas
    draw(ctx) {
        ctx.drawImage(this.imagesheet, this.xLoc, this.yLoc, this.w, this.h, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};