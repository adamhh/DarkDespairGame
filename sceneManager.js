class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.score = 0;
        this.health = 100;
        this.coins = 0;
        this.lives = 3;

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

        //ground
        //section 1
        let land = new Land(this.game, 0, 200, 300);
        this.game.addEntity(land);
        land = new Land(this.game, -300, 200, 300);
        this.game.addEntity(land);
        land = new Land(this.game, -600, 200, 300);
        this.game.addEntity(land);
        land = new Land(this.game, 300, 200, 300);
        this.game.addEntity(land);
        let landend = new LandEnd(this.game, 600, 200, 200, 0);
        this.game.addEntity(landend);
        landend = new LandEnd(this.game, -800, 200, 200, 1);
        this.game.addEntity(landend);

        //section 2
        landend = new LandEnd(this.game, 2500, -300, 200, 1);
        this.game.addEntity(landend);
        land = new Land(this.game, 2700, -300, 300);
        this.game.addEntity(land);
        land = new Land(this.game, 3000, -300, 300);
        this.game.addEntity(land);
        landend = new LandEnd(this.game, 3300, -300, 200, 0);
        this.game.addEntity(landend);

        //section 3
        landend = new LandEnd(this.game, 3800, -250, 200, 1);
        this.game.addEntity(landend);
        land = new Land(this.game, 4000, -250, 300);
        this.game.addEntity(land);
        land = new Land(this.game, 4300, -250, 300);
        this.game.addEntity(land);
        landend = new LandEnd(this.game, 4600, -250, 200, 0);
        this.game.addEntity(landend);

        //bridges
        let bridge = new Bridge(this.game, 1550, 0, 500);
        this.game.addEntity(bridge);
        // bridge = new Bridge(this.game, 1800, 600, 250);
        // this.game.addEntity(bridge);

        //layout clouds
        let cloud = new Cloud(this.game,1100, 0, 1, -500, 500, true, 3);
        this.game.addEntity(cloud);
        cloud = new Cloud(this.game,2180, 0, 1, -500, 100, true, 3);
        this.game.addEntity(cloud);
        // cloud = new Cloud(this.game,1750, 0, 1, 0, 700, true, 3);
        // this.game.addEntity(cloud);
        // cloud = new Cloud(this.game,1950, 200, 1, 1950, 2100, false, 2);
        // this.game.addEntity(cloud);



        // cloud = new Cloud(this.game,1750, 200, 1, 1000, 400, true, 4);
        // this.game.addEntity(cloud);





        this.knight = new Knight(this.game,0, -400);
        this.game.addEntity(this.knight);

    };

    update() {

         PARAMS.DEBUG = document.getElementById("debug").checked;


        let midpoint = PARAMS.CANVAS_WIDTH/4 - 60;
        let midpointY = PARAMS.CANVAS_HEIGHT/1.2 - 160;
        // let midpointY = PARAMS.CANVAS_HEIGHT/2 - 60;

        // if (this.x < this.knight.x - midpoint) this.x = this.knight.x - midpoint;
        //always start center
        this.x = this.knight.x - midpoint;
        this.y = this.knight.y - midpointY;

        // if (this.knight.dead && this.knight.y > PARAMS.BLOCKWIDTH * 16) {
        //     this.clearEntities();
        //     this.loadLevelOne();
        // };
    };

    draw(ctx) {
        //
        // ctx.font = PARAMS.BLOCKWIDTH/2 + 'px "Press Start 2P"';
        // ctx.fillStyle = "Black";
        // ctx.fillText("SCORE", .2 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
        // ctx.fillText(("TODO"), .2 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);
        // ctx.fillText("HEALTH", 3 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
        // ctx.fillText("TODO", 3 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);
        //
        // if (this.health === parseInt(this.health,10)) {
        //     this.health--;
        // }
        // if (this.health == 0) {
        //     this.health = "DEAD?"
        // }


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
