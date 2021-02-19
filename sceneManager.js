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
        this.title = true;
        this.loadLevelOne();
    };

    clearEntities() {
        this.game.entities = [];
    };

    loadLevelOne() {
        this.x = 0;
        this.y = 0;
        this.parallax = 0;
        this.parallaxY = 0;

        if (!this.title) {
            ASSET_MANAGER.pauseBackgroundMusic();
            ASSET_MANAGER.playAsset("audio/background_music.mp3");
        }

        let bLayer = new BackgroundLayer(this.game, 0, 0, 1, 0);
        this.game.addEntity(bLayer);
        bLayer = new BackgroundLayer(this.game, 0, 0, 1, 1);
        this.game.addEntity(bLayer);
        bLayer = new BackgroundLayer(this.game, 0, 0, 1, -1);
        this.game.addEntity(bLayer);
        // bLayer = new BackgroundLayer(this.game, -950, 0, 1, 3);
        // this.game.addEntity(bLayer);
        // bLayer = new BackgroundLayer(this.game, -950, 0, 1, 4);
        // this.game.addEntity(bLayer);

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

        //one level down
        land = new Land(this.game, 2700, 800, 0);
        this.game.addEntity(land);
        land = new Land(this.game, 1770, 800, 0);
        this.game.addEntity(land);
        land = new Land(this.game, 840, 800, 0);
        this.game.addEntity(land);

        // let floating = new Land(this.game, 250, 1000, 1);
        // this.game.addEntity(floating);
        // floating = new Land(this.game, -350, 1150, 1);
        // this.game.addEntity(floating);


        //assets for assassin
        let healthBar = new HealthBar(this.game);
        this.game.addEntity(healthBar);
        let weaponIcon = new WeaponIcons(this.game);
        this.game.addEntity(weaponIcon);

        let shadowWarrior = new ShadowWarrior(this.game, 600, 0);
        this.game.addEntity(shadowWarrior);

        this.assassin = new Assassin(this.game,-200, 0, healthBar, weaponIcon);
        this.game.addEntity(this.assassin);

        this.startMenu = new StartMenu(this.game);
        this.game.addEntity(this.startMenu);



    };

    updateAudio() {
        let mute = document.getElementById("mute").checked;
        let volume = document.getElementById("volume").value;
        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
        if (PARAMS.START) {
            //console.log("HEARD");
            ASSET_MANAGER.playAsset("./audio/background_music.mp3");
        }


    }

    update() {
        PARAMS.DEBUG = false;
        if (PARAMS.START === true) {
            if (this.startMenu) {
                this.startMenu.exists = false;
            }
        }
        let midpoint = PARAMS.CANVAS_WIDTH/2 - 30;
        let midpointY = PARAMS.CANVAS_HEIGHT/1.2 - 160;
        this.updateAudio();
        // let midpointY = PARAMS.CANVAS_HEIGHT/2 - 60;

        // if (this.x < this.knight.x - midpoint) this.x = this.knight.x - midpoint;
        //always start center
        if (this.assassin.x - midpoint > -1965 || this.count === 0) {
            this.count++;
            this.x = this.assassin.x - midpoint;
            this.parallax = this.assassin.x/1.8 - midpoint;
            //TODO delete
            this.title = false;
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
