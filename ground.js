class Land {
    constructor(game, x, y, w, type) {
        Object.assign(this, {game, x, y, w});
        switch (type) {
            case 0: //landblock
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/landblock.png");
                this.h = 345;
                this.BB = new BoundingBox(this.x, this.y + 212, this.w - 20, 60);
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
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y - this.game.camera.y - 3, this.w, this.h);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};
