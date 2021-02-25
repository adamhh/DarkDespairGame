class Land {
    constructor(game, x, y, type) {
        Object.assign(this, {game, x, y, type});
        switch (type) {
            case 'R': //landblock right end piece
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgroundassets/landendR.png");
                this.w = 930;
                this.h = 345;
                this.BB = new BoundingBox(this.x, this.y + 96, this.w, this.h - 120);
                break;
            case 'L': //landblock left end piece
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgroundassets/landendL.png");
                this.w = 930;
                this.h = 345;
                this.BB = new BoundingBox(this.x, this.y + 96, this.w, this.h - 120);
                break;
            default: //center land block
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgroundassets/landblock.png");
                this.w = 930;
                this.h = 345;
                this.BB = new BoundingBox(this.x, this.y + 96, this.w, this.h - 120);
                break;
        }
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class CaveWall {
    constructor(game, x, y, scale, type) {
        Object.assign(this, {game, x, y, scale, type});
        this.w = 572;

        switch (this.type) {
            case 0:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgroundassets/cavewall_left.png");
                this.h = 1053 * this.scale;
                break;
            case 1:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgroundassets/cavewall_right.png");
                this.h = 1053 * this.scale;
                break;
            case 2:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgroundassets/cavewall_left2.png")
                this.h = 1220 * this.scale;
                break;
            default:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgroundassets/cavewall_right2.png")
                this.h = 1220 * this.scale;
                break;

        }

        this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, 573, 1190, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}

class Grass {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.w = 120;
        this.h = 75;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgroundassets/landassets.png");
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 405, this.w, this.h, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);

    };
}


class Ceiling {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.w = 1000;
        this.h = 850;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgroundassets/ceiling.png");
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);

    };
}

class FloatingLand {
    constructor(game, x, y, type) {
        Object.assign(this, {game, x, y, type});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgroundassets/floating_land.png");
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
        }
        this.xLoc = 0;
        this.BB = new BoundingBox(this.x, this.y + 10, this.w, this.h);
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.xLoc, this.yLoc, this.w, this.h, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};
