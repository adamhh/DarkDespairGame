class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.health = 100;
        this.lives = 3;
        this.count = 0;

        this.loadLevelOne();
    };

    addCoin() {
        if (this.coins++ === 100) {
            this.coins = 0;
            this.lives++;
        }
    };

    clearEntities() {
        this.game.entities = [];
    };

    loadLevelOne() {
        this.x = 0;
        this.y = 0;
        //background
        let background = new Background(this.game, 0, 0);
        this.game.addEntity(background);

        //ground
        let sign = new Sign(this.game, 3715, 1900, 0);
        this.game.addEntity(sign);
        let land = new Land(this.game, 700, 2400, 928, 0);
        this.game.addEntity(land);
        land = new Land(this.game, 3300, 1800, 928, 0);
        this.game.addEntity(land);


        //floating land
        let floating = new Land(this.game, 2200, 2000, 128, 1);
        this.game.addEntity(floating);
        floating = new Land(this.game, 2500, 1850, 128, 1);
        this.game.addEntity(floating);


        //layout clouds
        let cloud = new Cloud(this.game,1850, 2526, 1, 2100, 2750, true, 3);
        this.game.addEntity(cloud);
        cloud = new Cloud(this.game,2800, 1414, 1, 1500, 2000, true, 3);
        this.game.addEntity(cloud);
        // cloud = new Cloud(this.game,1750, 0, 1, 0, 700, true, 3);
        // this.game.addEntity(cloud);
        // cloud = new Cloud(this.game,1950, 200, 1, 1950, 2100, false, 2);
        // this.game.addEntity(cloud);

        //portal
        let portalAnim = new Portal (this.game, 3950, 1830, 1);
        this.game.addEntity(portalAnim);
        let portal = new Portal (this.game, 3935, 1830, 0);
        this.game.addEntity(portal);
        //enemies
        //TODO

        //sky land
        land = new Land(this.game, -2500, 700, 930, 2);
        this.game.addEntity(land);
        land = new Land(this.game, -1600, 700, 930, 2);
        this.game.addEntity(land);
        land = new Land(this.game, -700, 700, 930, 2);
        this.game.addEntity(land);
        land = new Land(this.game, 200, 700, 930, 2);
        this.game.addEntity(land);
        land = new Land(this.game, 1100, 700, 930, 2);
        this.game.addEntity(land);
        land = new Land(this.game, 2000, 700, 930, 2);
        this.game.addEntity(land);
        land = new Land(this.game, 2900, 700, 930, 2);
        this.game.addEntity(land);
        land = new Land(this.game, 3800, 700, 930, 2);
        this.game.addEntity(land);


        let healthBar = new HealthBar(this.game);
        this.game.addEntity(healthBar);
        let weaponIcon = new WeaponIcons(this.game);
        this.game.addEntity(weaponIcon);
        let dragon = new Dragon(this.game, -1500, 1400);
        this.game.addEntity(dragon);

        //start point
        this.assassin = new Assassin(this.game,-1700, 1900, healthBar, weaponIcon);
        //portal start point
        // this.assassin = new Assassin(this.game,3971, 1926);
        //cloud start point
        //this.assassin = new Assassin(this.game,1937, 2000);
        this.game.addEntity(this.assassin);
        //dragon


    };

    update() {

         PARAMS.DEBUG = document.getElementById("debug").checked;


        let midpoint = PARAMS.CANVAS_WIDTH/4 - 60;
        let midpointY = PARAMS.CANVAS_HEIGHT/1.2 - 160;
        // let midpointY = PARAMS.CANVAS_HEIGHT/2 - 60;

        // if (this.x < this.knight.x - midpoint) this.x = this.knight.x - midpoint;
        //always start center
        if (this.assassin.x - midpoint > -1965 || this.count === 0) {
            this.count++;
            this.x = this.assassin.x - midpoint;
        }
        //console.log(this.knight.y-midpointY);
        if (this.assassin.y -midpointY < 1920) {
            this.y = this.assassin.y - midpointY;
        }


        // if (this.knight.dead && this.knight.y > PARAMS.BLOCKWIDTH * 16) {
        //     this.clearEntities();
        //     this.loadLevelOne();
        // };
    };

    draw(ctx) {
        // ctx.font = 48 + 'px "MedievalSharp"';
        // ctx.fillStyle = "White";
        // ctx.fillText("TEST", 5, 40);
        // ctx.fillText(("TODO"), .2 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);
        // ctx.fillText("HEALTH", 3 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
        // ctx.fillText("TODO", 3 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);

        if (this.health === parseInt(this.health,10)) {
            this.health--;
        }
        if (this.health == 0) {
            this.health = "DEAD?"
        }


        // if (PARAMS.DEBUG) {
        //     let xV = "xV=" + Math.floor(this.game.mario.velocity.x);
        //     let yV = "yV=" + Math.floor(this.game.mario.velocity.y);
        //     ctx.fillText(xV, 1.5 * PARAMS.BLOCKWIDTH, 2.5 * PARAMS.BLOCKWIDTH);
        //     ctx.fillText(yV, 1.5 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH);
        //
        //     ctx.translate(0, -10); // hack to move elements up by 10 pixels instead of adding -10 to all y coordinates below
        //     ctx.strokeStyle = "White";
        //     ctx.lineWidth = 2;
        //     ctx.strokeStyle = this.game.left ? "White" : "Grey";
        //     ctx.fillStyle = ctx.strokeStyle;
        //     ctx.strokeRect(6 * PARAMS.BLOCKWIDTH - 2, 2.5 * PARAMS.BLOCKWIDTH - 2, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
        //     ctx.fillText("L", 6 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH);
        //     ctx.strokeStyle = this.game.down ? "White" : "Grey";
        //     ctx.fillStyle = ctx.strokeStyle;
        //     ctx.strokeRect(6.5 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
        //     ctx.fillText("D", 6.5 * PARAMS.BLOCKWIDTH + 2, 3.5 * PARAMS.BLOCKWIDTH + 2);
        //     ctx.strokeStyle = this.game.up ? "White" : "Grey";
        //     ctx.fillStyle = ctx.strokeStyle;
        //     ctx.strokeRect(6.5 * PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH - 4, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
        //     ctx.fillText("U", 6.5 * PARAMS.BLOCKWIDTH + 2, 2.5 * PARAMS.BLOCKWIDTH - 2);
        //     ctx.strokeStyle = this.game.right ? "White" : "Grey";
        //     ctx.fillStyle = ctx.strokeStyle;
        //     ctx.strokeRect(7 * PARAMS.BLOCKWIDTH + 2, 2.5 * PARAMS.BLOCKWIDTH - 2, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
        //     ctx.fillText("R", 7 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);
        //
        //     ctx.strokeStyle = this.game.A ? "White" : "Grey";
        //     ctx.fillStyle = ctx.strokeStyle;
        //     ctx.beginPath();
        //     ctx.arc(8.25 * PARAMS.BLOCKWIDTH + 2, 2.75 * PARAMS.BLOCKWIDTH, 0.25 * PARAMS.BLOCKWIDTH + 4, 0, 2 * Math.PI);
        //     ctx.stroke();
        //     ctx.fillText("A", 8 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);
        //     ctx.strokeStyle = this.game.B ? "White" : "Grey";
        //     ctx.fillStyle = ctx.strokeStyle;
        //     ctx.beginPath();
        //     ctx.arc(9 * PARAMS.BLOCKWIDTH + 2, 2.75 * PARAMS.BLOCKWIDTH, 0.25 * PARAMS.BLOCKWIDTH + 4, 0, 2 * Math.PI);
        //     ctx.stroke();
        //     ctx.fillText("B", 8.75 * PARAMS.BLOCKWIDTH + 4, 3 * PARAMS.BLOCKWIDTH);
        //
        //     ctx.translate(0, 10);
        //     ctx.strokeStyle = "White";
        //     ctx.fillStyle = ctx.strokeStyle;
        //
        //     this.minimap.draw(ctx);
        // }
    };
};

// class Minimap {
//     constructor(game, x, y, w) {
//         Object.assign(this, { game, x, y, w });
//     };
//
//     update() {
//
//     };
//
//     draw(ctx) {
//         ctx.strokeStyle = "Black";
//         ctx.strokeRect(this.x, this.y, this.w, PARAMS.BLOCKWIDTH);
//         for (var i = 0; i < this.game.entities.length; i++) {
//             this.game.entities[i].drawMinimap(ctx, this.x, this.y);
//         }
//     };
// };
