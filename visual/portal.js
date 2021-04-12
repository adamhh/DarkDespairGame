/**
 * This class handles the portals in the game.
 *
 * @author Adam Hall
 */
class Portal {
    constructor(game, x, y, n, assassin) {
        Object.assign(this, {game, x, y, n, assassin});
        this.anim = false;
        this.portalOpenSound = false;
        switch(n){
            case 0:
                this.image = ASSET_MANAGER.getAsset("./sprites/backgroundassets/portal.png");
                this.h = 181;
                this.w = 200;
                this.BB = new BoundingBox(this.x + 50, this.y + 50, this.w-100, this.h-100);
                break;
            default:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgroundassets/portal_anim.png");
                this.h = 180;
                this.w = 165;
                this.BB = new BoundingBox(this.x + 50, this.y + 50, this.w - 100, this.h - 100);
                this.anim = true;
        }
        if (this.anim) {
            this.animation = new Animator(this.spritesheet, 0, 23, this.w, this.h, 12,
                                        .1, 13, false, true);
        }

    };

    //Needed, even if empty.
    update() {

    };

    //Draw outer portal, if player has key then display animation and allow player to interact.
    draw(ctx) {
        if (this.anim) {
            if (this.assassin.isKeyed) {
                this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
                if (!this.portalOpenSound) {
                    ASSET_MANAGER.playAsset("./audio/portal_open.mp3")
                    this.portalOpenSound = true;
                }

            }

        } else {
            ctx.drawImage(this.image, this.x - this.game.camera.x, this.y - this.game.camera.y, this.w, this.h);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};
