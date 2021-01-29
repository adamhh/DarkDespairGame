class Background {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background/Background.png");
        this.BB = new BoundingBox(-2000, 2255, 2630, 65);

    };
    update() {
        // console.log("HEARD");

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x -2000, this.y - this.game.camera.y, 8000, 3000);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}
