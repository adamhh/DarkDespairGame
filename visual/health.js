/**
 * This class handles the healthbar for the the playable character.
 * @author Adam Hall
 */
class HealthBar {
    constructor(game) {
        Object.assign(this, {game});
        this.health = 18; //full health - 1 death;
        this.imagesheet = ASSET_MANAGER.getAsset("./sprites/gameassets/healthbar.png");
        this.x = 2;
        this.y = 2;
    }

    //Every game entity needs an update method, even if it is empty.
    update() {

    }

    //Update health if damage taken or health potion acquired.
    updateHealth(num) {
        this.health += num;
        if (this.health > 18) {
            this.health = 18;
        }
        if (this.health < 1) {
            this.health = 1;
        }
    }

    //Accessor methods
    getHealth() {
        return this.health;
    }

    isFull() {
        return this.health > 17;
    }
    isDead() {
        return this.health < 2;
    }

    //Draws the healthbar in the corner of the screen.
    draw(ctx) {
        if (this.health > 18) this.health = 18;
        if (this.health < 1) this.health = 1;
        let sourceY = (18 - Math.floor(this.health)) * 21 + 2;
        //source x, y, source width, height, dest x, y, dest width, height
        ctx.drawImage(this.imagesheet, 2, sourceY, 205, 17, 2, 8, 200, 15);
    }

}