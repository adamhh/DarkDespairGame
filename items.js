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

class HealthPotion {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ingame_items.png");
        this.w = 25;
        this.h = 32;
        this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
        this.drank = false;
        this.floatY = 0;
        this.step = .1;
    }


    update() {
        this.floatY += this.step;
        if (this.drank) {
            this.BB = new BoundingBox(0, 0,0, 0);
        }
    };

    draw(ctx) {
        if (Math.round(parseFloat(this.floatY) * 10) > 50) {
            this.step = -.1
        }
        else if (Math.round(parseFloat(this.floatY) * 10) < -50) {
            this.step = +.1
        }
        if (!this.drank) {
            ctx.drawImage(this.spritesheet, 0, 0, 50, 65, this.x - this.game.camera.x, this.y - this.game.camera.y + this.floatY, this.w, this.h);
        }
        if (PARAMS.DEBUG) {
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y + this.floatY, this.BB.width, this.BB.height);
            }
        }
    }
 }