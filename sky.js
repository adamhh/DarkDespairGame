class Cloud {
    constructor(game, x, y, n, lowerBound, upperBound, isY, speed) {
        Object.assign(this, {game, x, y, n, lowerBound, upperBound, isY, speed});

        switch(n) {
            case 1:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cloud1.png");
                this.w = 200;
                this.h = 100;

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
        this.moveDown = false;
        this.moveRight = false;
        this.BB = new BoundingBox(this.x + 7,  this.y + 45, this.w -15, this.h - 80);
    };

    update() {

        if (this.isY) {
            //console.log("this.y = " + this.y + " this.lowerBound = " + this.lowerBound + " this.upperBound = " + this.upperBound);
            if (this.y > this.upperBound) {
                this.moveDown = false;
            } if (this.y < this.lowerBound) {
                this.moveDown = true;
            }
            if (this.moveDown) {
                this.y += this.speed;
            } else {
                this.y -= this.speed;
            }
        } else {
            if (this.x > this.upperBound) {
                this.moveRight = false;
            }
            if (this.x < this.lowerBound) {
                this.moveRight = true;
            }
            if(this.moveRight) {
                this.x += this.speed;
            } else {

                this.x -= this.speed;
            }
        }
        this.BB = new BoundingBox(this.x + 7, this.y + 45, this.w - 15, this.h - 80);

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};
