class Land {
    constructor(game, x, y, w) {
        Object.assign(this, {game, x, y, w});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/landblock.png");
        this.h = 100;
        this.BB = new BoundingBox(this.x, this.y + 3, this.w, this.h - 10);
        // this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
        // this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
    };

    update() {
        // console.log("HEARD");
        // this.BB = new BoundingBox(this.x, this.y, this.w, 152);

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y - this.game.camera.y - 3, this.w, this.h);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class LandEnd {
    constructor(game, x, y, w, direction) {
        Object.assign(this, {game, x, y, w, direction});
        if (this.direction === 0) { //end piece on right
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/landendR.png");
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/landendL.png");
        }

        this.h = 100;
        this.BB = new BoundingBox(this.x, this.y + 3, this.w, this.h - 10);
        // this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
        // this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
    };

    update() {
        // console.log("HEARD");
        // this.BB = new BoundingBox(this.x, this.y, this.w, 152);

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y - this.game.camera.y - 3, this.w, this.h);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class Ground {
    constructor(game, x, y, w) {
        Object.assign(this, {game, x, y, w});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/floating_brick1.png");
        this.h = 110;
        this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
        // this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
        // this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
    }; // 152 345

    update() {
        // console.log("HEARD");
        // this.BB = new BoundingBox(this.x, this.y, this.w, 152);

    };

    draw(ctx) {
         ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y - this.game.camera.y + 3, this.w, this.h);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};



class Bridge {
    constructor(game, x, y, w) {
        Object.assign(this, {game, x, y, w});
        this.h = 100;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/floating_bridge.png");
        this.BB = new BoundingBox(this.x + 35, this.y + 20, this.w - 65, this.h-30);
        // this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
        // this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
    }; // 245 100

    update() {
        // console.log("HEARD");
        // this.BB = new BoundingBox(this.x, this.y, this.w, 152);

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y - this.game.camera.y - 3, this.w, this.h);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}
