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
        //404 198

        let ground = new Ground(this.game, 0, 200, 400);
        this.game.addEntity(ground);
        ground = new Ground(this.game, -400, 200, 400);
        this.game.addEntity(ground);
        ground = new Ground(this.game, 400, 200, 400);
        this.game.addEntity(ground);
        ground = new Ground(this.game, -800, 200, 400);
        this.game.addEntity(ground);
        ground = new Ground(this.game, 800, 200, 400);
        this.game.addEntity(ground);
        ground = new Ground(this.game, 1300, 600, 400);
        this.game.addEntity(ground);





        let bridge = new Bridge(this.game, 400, 1200, 250);
        this.game.addEntity(bridge);
//         ground = new Ground(this.game, -1290, 700, 345);
//         this.game.addEntity(ground);
//         ground = new Ground(this.game, -990, 700, 345);
//         this.game.addEntity(ground);
        // ground = new Ground(this.game, -650, 700, 345);
        // this.game.addEntity(ground);
        // ground = new Ground(this.game, -330, 700, 345);
        // this.game.addEntity(ground);

        // ground = new Ground(this.game, 335, 700, 345);
        // this.game.addEntity(ground);
        // ground = new Ground(this.game, 670, 700, 345);
        // this.game.addEntity(ground);
        // ground = new Ground(this.game, 970, 700, 345);
        // this.game.addEntity(ground);
        // ground = new Ground(this.game, 1290, 700, 345);
        // this.game.addEntity(ground);
        // ground = new Ground(this.game, 1500, 700, 345);
        // this.game.addEntity(ground);
        // ground = new Ground(this.game, 2070, 750, 345);
        // this.game.addEntity(ground);
        // ground = new Ground(this.game, 2415, 750, 345);
        // this.game.addEntity(ground);
        // ground = new Ground(this.game, 2760, 750, 345);
        // this.game.addEntity(ground);
        // ground = new Ground(this.game, 3105, 750, 345);
        // this.game.addEntity(ground);

        this.knight = new Knight(this.game, 0, 0);
        this.game.addEntity(this.knight);

    };

    update() {

         PARAMS.DEBUG = document.getElementById("debug").checked;


        let midpoint = PARAMS.CANVAS_WIDTH/2 - 60;
        let midpointY = PARAMS.CANVAS_HEIGHT/2 - 60;

        // if (this.x < this.knight.x - midpoint) this.x = this.knight.x - midpoint;
        //always start center
        this.x = this.knight.x - midpoint;
        this.y = this.knight.y - midpointY;

        if (this.knight.dead && this.knight.y > PARAMS.BLOCKWIDTH * 16) {
            this.clearEntities();
            this.loadLevelOne();
        };
    };

    draw(ctx) {

        ctx.font = PARAMS.BLOCKWIDTH/2 + 'px "Press Start 2P"';
        ctx.fillStyle = "Black";
        ctx.fillText("SCORE", .2 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
        ctx.fillText(("TODO"), .2 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);
        ctx.fillText("HEALTH", 3 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
        ctx.fillText("TODO", 3 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);

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

class Minimap {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });
    };

    update() {

    };

    draw(ctx) {
        ctx.strokeStyle = "Black";
        ctx.strokeRect(this.x, this.y, this.w, PARAMS.BLOCKWIDTH);
        for (var i = 0; i < this.game.entities.length; i++) {
            this.game.entities[i].drawMinimap(ctx, this.x, this.y);
        }
    };
};
