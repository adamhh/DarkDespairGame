class Sign {
    constructor(game, x, y, n) {
        Object.assign(this, {game, x, y, n});
        switch(n){
            default:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/sign_portal.png");
                this.h = 125;
                this.w = 104;
                this.BB = new BoundingBox(this.x, this.y + 212, this.w - 20, 60);
                break;
        }


    }
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);

    };
}