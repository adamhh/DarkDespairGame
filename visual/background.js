/**
 * This class handles the non-interactive background assets and applies a
 * parallax effect to the assets.
 */
class BackgroundLayer {
    constructor(game, x, y, type, offset) {
        Object.assign(this, {game, x, y, type, offset});
        switch (type) {
            case 0:
                this.h = 1200;
                this.w = 1000;
                this.image = ASSET_MANAGER.getAsset("./sprites/backgroundassets/vines.png");
                break;
            default:
                this.w = 1222;
                this.h = 850;
                this.image = ASSET_MANAGER.getAsset("./sprites/backgroundassets/background_layer1.png");
                break;
        }
        this.offset *= this.w;
    };

    //Every entity needs this method, even if it is empty.
    update() {
    };

    //Draw the entities, apply parallax effect offset.
    draw(ctx) {
        if (this.type === 0) {
            ctx.drawImage(this.image, this.x - this.game.camera.parallax/1.4 + this.offset, this.y, this.w, this.h);
        } else {
            ctx.drawImage(this.image, this.x - this.game.camera.parallax/2 + this.offset, this.y, this.w, this.h);
        }

    };
};