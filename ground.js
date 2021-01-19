class Ground {
    constructor(game, x, y, w) {
        Object.assign(this, {game, x, y, w});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/floating_brick1.png");
        this.BB = new BoundingBox(this.x, this.y, this.w, 194);
        // this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
        // this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
    }; // 152 345

    update() {
        // console.log("HEARD");
        // this.BB = new BoundingBox(this.x, this.y, this.w, 152);

    };

    draw(ctx) {
        for (var i = 0; i < 10; i++) {
            ctx.drawImage(this.spritesheet,0,0, 404, 194, this.x - this.game.camera.x, this.y, 404, 194);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
}