class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.parallax = 0;
        this.x = 0;
        this.y = 0;
        this.count = 0;
        this.title = true;
        this.gameOverMusic = true;
        this.loadLevelOne();
        PARAMS.DEBUG = false;
    };
    //add checkpoint
    restartState() {
        this.game.entities = [];
        PARAMS.PLAY = false;
        PARAMS.START = false;
        PARAMS.CONTROLS = false;
        PARAMS.GAMEOVER = false;
        PARAMS.PAUSE = false;
        PARAMS.SOULS = 0;
        PARAMS.XSPAWN = 0;
        PARAMS.YSPAWN = 0;
        this.title = true;
        this.count = 0;
        this.loadLevelOne();
    };

    respawn() {
        this.game.entities = [];
        PARAMS.CONTROLS = true;
        PARAMS.GAMEOVER = false;
        PARAMS.RESPAWN = false;
        this.title = true;
        this.count = 0;
        this.loadLevelOne();
    };


    loadLevelOne() {
        this.x = 0;
        this.y = 0;
        this.parallax = 0;
        this.parallaxY = 0;

        if (!this.title) {
            ASSET_MANAGER.pauseBackgroundMusic();
            //ASSET_MANAGER.playAsset("audio/background_diablo.mp3");
        }
        //assets for assassin
        let healthBar = new HealthBar(this.game);
        let weaponIcon = new WeaponIcons(this.game);
        // this.assassin = new Assassin(this.game,-2000, 950, healthBar, weaponIcon);
        // this.assassin = new Assassin(this.game,0, 0, healthBar, weaponIcon);
        this.assassin = new Assassin(this.game, PARAMS.XSPAWN, PARAMS.YSPAWN, healthBar, weaponIcon);


        let bLayer = new BackgroundLayer(this.game, 0, 0, 1, 0);
        this.game.addEntity(bLayer);
        bLayer = new BackgroundLayer(this.game, 0, 0, 1, 1);
        this.game.addEntity(bLayer);
        bLayer = new BackgroundLayer(this.game, 0, 0, 1, -1);
        this.game.addEntity(bLayer);
        bLayer = new BackgroundLayer(this.game, 0, 0, 1, 2);
        this.game.addEntity(bLayer);
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
        bVine = new BackgroundLayer(this.game, -1000, -200, 0, 5);
        this.game.addEntity(bVine);
        bVine = new BackgroundLayer(this.game, -1000, -200, 0, 6);
        this.game.addEntity(bVine);
        bVine = new BackgroundLayer(this.game, -1000, -200, 0, -1);
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



        let caveWall = new CaveWall(this.game, -900, -650, 1, 0);
        this.game.addEntity(caveWall);
        caveWall = new CaveWall(this.game, 3000, -650, 1, 1);
        this.game.addEntity(caveWall);
        caveWall = new CaveWall(this.game, 3000, 230, .7, 3);
        this.game.addEntity(caveWall);

        let land = new Land(this.game, -930, 100, 'L');
        this.game.addEntity(land);
        land = new Land(this.game, 0, 100, 0);
        this.game.addEntity(land);
        land = new Land(this.game, 930, 100, 0);
        this.game.addEntity(land);
        land = new Land(this.game, 1860, 100, 'R');
        this.game.addEntity(land);


        //one level down
        land = new Land(this.game, 2700, 800, 0);
        this.game.addEntity(land);
        land = new Land(this.game, 1770, 800, 'L');
        this.game.addEntity(land);

        let floating = new FloatingLand(this.game, 1300, 1000, 1);
        this.game.addEntity(floating);
        floating = new FloatingLand(this.game, 850, 1000, 0);
        this.game.addEntity(floating);
        floating = new FloatingLand(this.game, 350, 950, 1);
        this.game.addEntity(floating);

        //past first nonplayables
        let portal = new Portal(this.game, -1700, 875, 1, this.assassin);
        this.game.addEntity(portal);
        portal = new Portal(this.game, -1715, 875, 0, this.assassin);
        this.game.addEntity(portal);

        land = new Land(this.game, -900, 950, 'R');
        this.game.addEntity(land);
        land = new Land(this.game, -1830, 950, 0);
        this.game.addEntity(land);
        land = new Land(this.game, -2760, 950, 'L');
        this.game.addEntity(land);

        let redEye = new RedEye(this.game, 901, 915);
        this.game.addEntity(redEye);

        let knight = new Knight(this.game, 800, -100, 160, 1200);
        this.game.addEntity(knight);

        let shadowWarrior = new ShadowWarrior(this.game, 1898, 800 , false);
        this.game.addEntity(shadowWarrior);
        shadowWarrior = new ShadowWarrior(this.game, -1000, 800, true);
        this.game.addEntity(shadowWarrior);

        //after portal

        let landCube = new FloatingLand(this.game, 2700, 3950, 2);
        this.game.addEntity(landCube);
        landCube = new FloatingLand(this.game, 3100, 3800, 2);
        this.game.addEntity(landCube);
        landCube = new FloatingLand(this.game, 4250, 3900, 2);
        this.game.addEntity(landCube);

        landCube = new FloatingLand(this.game, 4500, 4100, 2);
        this.game.addEntity(landCube);
        landCube = new FloatingLand(this.game, 4800, 4100, 2);
        this.game.addEntity(landCube);
        landCube = new FloatingLand(this.game, 5100, 4100, 2);
        this.game.addEntity(landCube);


        landCube = new FloatingLand(this.game, 5330, 4100, 2);
        this.game.addEntity(landCube);
        landCube = new FloatingLand(this.game, 5730, 3700, 2);
        this.game.addEntity(landCube);
        landCube = new FloatingLand(this.game, 5330, 4240, 2);
        this.game.addEntity(landCube);
        landCube = new FloatingLand(this.game, 5730, 3840, 2);
        this.game.addEntity(landCube);
        landCube = new FloatingLand(this.game, 5730, 3980, 2);
        this.game.addEntity(landCube);

        floating = new FloatingLand(this.game, 3650, 3800, 1);
        this.game.addEntity(floating);

        land = new Land(this.game, 4500, 4600, 'L');
        this.game.addEntity(land);
        land = new Land(this.game, 5430, 4600, 0);
        this.game.addEntity(land);
        land = new Land(this.game, 6360, 4600, 'R');
        this.game.addEntity(land);


        redEye = new RedEye(this.game, 3690, 3700);
        this.game.addEntity(redEye);
        redEye = new RedEye(this.game, 5100, 4580);
        this.game.addEntity(redEye);
        redEye = new RedEye(this.game, 5800, 4580);
        this.game.addEntity(redEye);

        knight = new Knight(this.game, 4300, 3750, 100, 100);
        this.game.addEntity(knight);
        knight = new Knight(this.game, 5200, 4550, 100, 1200);
        this.game.addEntity(knight);
        knight = new Knight(this.game, 5700, 4550, 100, 1200);
        this.game.addEntity(knight);

        // let floating = new Land(this.game, 250, 1000, 1);
        // this.game.addEntity(floating);
        // floating = new Land(this.game, -350, 1150, 1);
        // this.game.addEntity(floating);

        this.volumeSlider = new VolumeSlider();
        this.game.addEntity(this.volumeSlider);
        this.difficulty = new Difficulty();
        this.game.addEntity(this.difficulty);




        //initialized up higher to use in portal and keep appropriate favor of drawing in front of each other
        this.game.addEntity(weaponIcon);
        this.game.addEntity(healthBar);
        this.game.addEntity(this.assassin);

        let healthPotion = new HealthPotion(this.game, 920, 955);
        this.game.addEntity(healthPotion);

        healthPotion = new HealthPotion(this.game, 5400, 4000);
        this.game.addEntity(healthPotion);



        this.startMenu = new Menus(this.game);
        this.game.addEntity(this.startMenu);



    };

    updateAudio() {
        let mute = PARAMS.VOLUME === 0;
        let volume = PARAMS.VOLUME/100;
        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
        if (PARAMS.START) {
            ASSET_MANAGER.playAsset("./audio/background_diablo.mp3");
        }

    }

    update() {
        if (PARAMS.CONTROLS === true) {
            if (this.startMenu) {
                this.startMenu.exists = false;
                this.startMenu.optionsExists = true;
            }
        }

        if (PARAMS.GAMEOVER) {
            if (this.gameOverMusic) {
                ASSET_MANAGER.pauseBackgroundMusic();
                ASSET_MANAGER.playAsset("./audio/game_over_music.mp3")
                this.gameOverMusic = false;
            }

        }
        if (PARAMS.STARTOVER) {
            PARAMS.STARTOVER = false;
            this.restartState();
        }
        //TODO CHANGE TO UNIQUE BEHAVIOR
        if (PARAMS.RESPAWN) {
            //PARAMS.RESPAWN = false;
            this.respawn();
        }

        let midpoint = PARAMS.CANVAS_WIDTH/2 - 30;
        let midpointY = PARAMS.CANVAS_HEIGHT/2;
        this.updateAudio();

        if (this.assassin.x - midpoint > -1965 || this.count === 0) {
            this.count++;
            this.x = this.assassin.x - midpoint;
            this.parallax = this.assassin.x/1.1 - midpoint;
            //TODO delete
            this.title = false;
        }

        this.y = this.assassin.y - midpointY;


    };

    draw(ctx) {
        if (PARAMS.PAUSE) {
            this.volumeSlider.draw(ctx)
            this.difficulty.draw(ctx);

        }
        if (PARAMS.START && !PARAMS.GAMEOVER) {
            ctx.font = 18 + 'px "MedievalSharp"';
            ctx.fillStyle = "White";
            ctx.fillText("SOUL FORCE: " + PARAMS.SOULS, 5, 50);
        }


    };
};
