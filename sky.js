class Cloud {
    constructor(game, x, y, n) {
        Object.assign(this, {game, x, y, n});
        switch(n) {
            case 1:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cloud1.png");
                this.w = 200;
                this.h = 82;
                break;
            case 2:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cloud2.png");
                this.w = 305;
                this.h = 140;
                break;
            case 3:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cloud3.png");
                this.w = 300;
                this.h = 150;
                break;
            case 4:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cloud4.png");
                this.w = 300;
                this.h = 120;
                break;
            default:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cloud5.png");
                this.w = 360;
                this.h = 250;
                break;
        }

        this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
    };

    update() {
        // console.log("HEARD");
        // this.BB = new BoundingBox(this.x, this.y, this.w, 152);

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet,this.x, this.y, this.w, this.h);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};
