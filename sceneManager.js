class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.parallax = 0;
        this.parallaxY = 0;
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
        this.parallax = 0;
        this.parallaxY = 0;
        // //background
        // let background = new Land(this.game, 0, 0);
        // this.game.addEntity(background);
        //
        // //ground
        // let sign = new Sign(this.game, 3715, 1900, 0);
        // this.game.addEntity(sign);
        // let land = new Land(this.game, 700, 2400, 928, 0);
        // this.game.addEntity(land);
        // land = new Land(this.game, 3300, 1800, 928, 0);
        // this.game.addEntity(land);
        //
        //
        // //floating land
        // let floating = new Land(this.game, 2200, 2000, 128, 1);
        // this.game.addEntity(floating);
        // floating = new Land(this.game, 2500, 1850, 128, 1);
        // this.game.addEntity(floating);
        //
        //
        // //layout clouds
        // let cloud = new Cloud(this.game,1850, 2526, 1, 2100, 2750, true, 3);
        // this.game.addEntity(cloud);
        // cloud = new Cloud(this.game,2800, 1414, 1, 1500, 2000, true, 3);
        // this.game.addEntity(cloud);
        // // cloud = new Cloud(this.game,1750, 0, 1, 0, 700, true, 3);
        // // this.game.addEntity(cloud);
        // // cloud = new Cloud(this.game,1950, 200, 1, 1950, 2100, false, 2);
        // // this.game.addEntity(cloud);
        //
        // //portal
        // let portalAnim = new Portal (this.game, 3950, 1830, 1);
        // this.game.addEntity(portalAnim);
        // let portal = new Portal (this.game, 3935, 1830, 0);
        // this.game.addEntity(portal);
        // //enemies
        // //TODO
        //
        // //sky land
        // land = new Land(this.game, -2500, 700, 930, 2);
        // this.game.addEntity(land);
        // land = new Land(this.game, -1600, 700, 930, 2);
        // this.game.addEntity(land);
        // land = new Land(this.game, -700, 700, 930, 2);
        // this.game.addEntity(land);
        // land = new Land(this.game, 200, 700, 930, 2);
        // this.game.addEntity(land);
        // land = new Land(this.game, 1100, 700, 930, 2);
        // this.game.addEntity(land);
        // land = new Land(this.game, 2000, 700, 930, 2);
        // this.game.addEntity(land);
        // land = new Land(this.game, 2900, 700, 930, 2);
        // this.game.addEntity(land);
        // land = new Land(this.game, 3800, 700, 930, 2);
        // this.game.addEntity(land);
        //
        //

        // let dragon = new Dragon(this.game, -1600, 1400);
        // this.game.addEntity(dragon);


        let bLayer = new BackgroundLayer(this.game, -950, 0, 1, 0);
        this.game.addEntity(bLayer);
        bLayer = new BackgroundLayer(this.game, -950, 0, 1, 1);
        this.game.addEntity(bLayer);
        bLayer = new BackgroundLayer(this.game, -950, 0, 1, 2);
        this.game.addEntity(bLayer);
        bLayer = new BackgroundLayer(this.game, -950, 0, 1, 3);
        this.game.addEntity(bLayer);
        bLayer = new BackgroundLayer(this.game, -950, 0, 1, 4);
        this.game.addEntity(bLayer);

        let bVine = new BackgroundLayer(this.game, -1000, -200, 0, 0);
        this.game.addEntity(bVine);
        bVine = new BackgroundLayer(this.game, -1000, -200, 0, 1);
        this.game.addEntity(bVine);
        bVine = new BackgroundLayer(this.game, -1000, -200, 0, 2);
        this.game.addEntity(bVine);
        bVine = new BackgroundLayer(this.game, -1000, -200, 0, 3);
        this.game.addEntity(bVine);
        bVine = new BackgroundLayer(this.game, -1000, -200, 0, 4);
        this.game.addEntity(bVine);


        let ceil = new Ceiling(this.game, -1500, -700);
        this.game.addEntity(ceil);
        ceil = new Ceiling(this.game, -500, -700);
        this.game.addEntity(ceil);
        ceil = new Ceiling(this.game, 500, -700);
        this.game.addEntity(ceil);
        ceil = new Ceiling(this.game, 1500, -700);
        this.game.addEntity(ceil);
        ceil = new Ceiling(this.game, 2500, -700);
        this.game.addEntity(ceil);


        //let vines = new Vines(this.game, -500, -500);
       // this.game.addEntity(vines);
        //trees
        // let tree = null;
        // let place = -1000;
        // //for starting block
        // for (var i = 0; i < 20; i++) {
        //     place += randomInt(400) + 200;
        //     if (place > 1800) i = 20;
        //     tree = new Tree(this.game, place, -180, randomInt(2));
        //     this.game.addEntity(tree);
        // }

        //grass
        let grass = null;
        for (var i = 0; i < 20; i++) {
            //starting block
            grass = new Grass(this.game, randomInt(2500) - 500, 120 + randomInt(5), 0);
            this.game.addEntity(grass);
        }

        let land = new Land(this.game, -930, 100, 0);
        this.game.addEntity(land);
        land = new Land(this.game, 0, 100, 0);
        this.game.addEntity(land);
        land = new Land(this.game, 930, 100, 0);
        this.game.addEntity(land);
        land = new Land(this.game, 1860, 100, 0);
        this.game.addEntity(land);

        let caveWall = new CaveWall(this.game, -900, -650, 1, 0);
        this.game.addEntity(caveWall);
        caveWall = new CaveWall(this.game, 3000, -650, 1, 1);
        this.game.addEntity(caveWall);
        caveWall = new CaveWall(this.game, 3000, 550, .5, 3);
        this.game.addEntity(caveWall);

        land = new Land(this.game, 2700, 1050, 0);
        this.game.addEntity(land);
        land = new Land(this.game, 1770, 1050, 0);
        this.game.addEntity(land);


        //assets for assassin


        let healthBar = new HealthBar(this.game);
        this.game.addEntity(healthBar);
        let weaponIcon = new WeaponIcons(this.game);
        this.game.addEntity(weaponIcon);
        //start point
        this.assassin = new Assassin(this.game,0, 0, healthBar, weaponIcon);
        this.game.addEntity(this.assassin);

    };

    update() {

         PARAMS.DEBUG = true;


        let midpoint = PARAMS.CANVAS_WIDTH/2 - 100;
        let midpointY = PARAMS.CANVAS_HEIGHT/1.2 - 160;
        // let midpointY = PARAMS.CANVAS_HEIGHT/2 - 60;

        // if (this.x < this.knight.x - midpoint) this.x = this.knight.x - midpoint;
        //always start center
        if (this.assassin.x - midpoint > -1965 || this.count === 0) {
            this.count++;
            this.x = this.assassin.x - midpoint;
            this.parallax = this.assassin.x/1.4 - midpoint;
        }
        //console.log(this.knight.y-midpointY);
        // if (this.assassin.y -midpointY < 1920) {
        //     this.y = this.assassin.y - midpointY;
        //     this.parallaxY = this.assassin.y/1.4 - midpointY;
        // }
        this.y = this.assassin.y - midpointY;
        this.parallaxY = this.assassin.y/1.1 - midpointY;


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


    };
};
