class Land {
    constructor(game, x, y, type) {
        Object.assign(this, {game, x, y});
        switch (type) {
            case 0: //landblock
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/landblock.png");
                this.w = 930;
                this.h = 345;
                this.BB = new BoundingBox(this.x, this.y + 86, this.w, this.h);
                break;
            case 1: //floating rock
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/floating_rock.png");
                this.h = 100;
                this.BB = new BoundingBox(this.x, this.y, this.w-5, 100);
                break;
            default: //sky land
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/sky_land.png");
                this.h = 145;
                this.BB = new BoundingBox(this.x, this.y, this.w - 20, 60);
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

class Tree {
    constructor(game, x, y, type) {
        Object.assign(this, {game, x, y, type});
        this.w = 380;
        this.h = 380;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/landassets.png");
    }

    update() {

    }

    draw(ctx) {
        if (this.type === 0) {
            ctx.drawImage(this.spritesheet, 2, 0, this.w, this.h, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);
        } else {
            ctx.drawImage(this.spritesheet, 382, 0, this.w, this.h, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);
        }

    };
}

class Grass {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.w = 120;
        this.h = 75;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/landassets.png");
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 405, this.w, this.h, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);

    };
}
