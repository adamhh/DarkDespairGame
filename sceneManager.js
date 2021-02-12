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
        let dragon = new Dragon(this.game, -1700, 1400);
        this.game.addEntity(dragon);

        //start point
        this.assassin = new Assassin(this.game,-600, 1900, healthBar, weaponIcon);
        //portal start point
        // this.assassin = new Assassin(this.game,3971, 1926);
        //cloud start point
        //this.assassin = new Assassin(this.game,1937, 2000);
        this.game.addEntity(this.assassin);
        //dragon


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


    };
};
