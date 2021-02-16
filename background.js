class BackgroundLayer {
    constructor(game, x, y, type, offset) {
        Object.assign(this, {game, x, y, type, offset});
        switch (type) {
            case 0:
                this.h = 1200;
                this.w = 1000;
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/vines.png");
                break;
            default:
                this.w = 950;
                this.h = 750;
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background_layer2.png");
                break;
        }
        this.offset *= this.w;
    };

    update() {

    };

    draw(ctx) {
        if (this.type === 0) {
            ctx.drawImage(this.spritesheet, this.x - this.game.camera.parralax + this.offset, this.y, this.w, this.h);
        } else {
            ctx.drawImage(this.spritesheet, this.x - this.game.camera.parralax/2 + this.offset, this.y, this.w, this.h);
        }

    };
};