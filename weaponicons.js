class WeaponIcons {
    constructor(game) {
        Object.assign(this, {game});
        this.health = 18; //full health - 1 death;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/weaponicons.png");
        this.weapon = 0;
        this.sourceY = 2;
    }

    update() {

    }

    updateWeapon(num) {
        if (num > 2) num = 2;
        if (num < 0) num = 0;
        this.weapon = num;
    }

    draw(ctx) {
        switch (this.weapon) {
            case 0:
                this.sourceY = 2;
                break;
            case 1:
                this.sourceY = 95;
                break;
            default:
                this.sourceY = 188;
                break;
        }
        //source x, y, source width, height, dest x, y, dest width, height
        ctx.drawImage(this.spritesheet, 2, this.sourceY, 135, 89, 780, 8, 110, 40);
    }

}