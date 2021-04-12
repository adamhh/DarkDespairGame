/**
 * This class manages all of the assets in the game, as well as the 'camera'.
 * This class is referred to as game.camera by classes that are passed a reference.
 * @author Adam Hall
 */

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

    //Returns game to original starting state
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

    //Called if player decides to respawn
    respawn() {
        this.game.entities = [];
        PARAMS.CONTROLS = true;
        PARAMS.GAMEOVER = false;
        PARAMS.RESPAWN = false;
        this.title = true;
        this.count = 0;
        this.loadLevelOne();

    };

    //Entities that exist before first portal
    loadPhaseOne() {
        let ceil = new Ceiling(this.game, -1500, -700);
        this.game.addEntityP1(ceil);
        ceil = new Ceiling(this.game, -500, -700);
        this.game.addEntityP1(ceil);
        ceil = new Ceiling(this.game, 500, -700);
        this.game.addEntityP1(ceil);
        ceil = new Ceiling(this.game, 1500, -700);
        this.game.addEntityP1(ceil);
        ceil = new Ceiling(this.game, 2500, -700);
        this.game.addEntityP1(ceil);

        //grass
        let grass = null;
        for (var i = 0; i < 20; i++) {
            //starting block
            grass = new Grass(this.game, randomInt(2500) - 500, 120 + randomInt(5), 0);
            this.game.addEntityP1(grass);
        }

        let caveWall = new CaveWall(this.game, -900, -650, 1, 0);
        this.game.addEntityP1(caveWall);
        caveWall = new CaveWall(this.game, 3000, -650, 1, 1);
        this.game.addEntityP1(caveWall);
        caveWall = new CaveWall(this.game, 3000, 230, .7, 3);
        this.game.addEntityP1(caveWall);

        let land = new Land(this.game, -930, 100, 'L');
        this.game.addEntityP1(land);
        land = new Land(this.game, 0, 100, 0);
        this.game.addEntityP1(land);
        land = new Land(this.game, 930, 100, 0);
        this.game.addEntityP1(land);
        land = new Land(this.game, 1860, 100, 'R');
        this.game.addEntityP1(land);

        let smallBridge = new Bridge(this.game, 2750, 650, 1);
        this.game.addEntityP1(smallBridge);


        //one level down
        land = new Land(this.game, 2700, 800, 0);
        this.game.addEntityP1(land);
        land = new Land(this.game, 1770, 800, 'L');
        this.game.addEntityP1(land);

        let floating = new FloatingLand(this.game, 1300, 1000, 1);
        this.game.addEntityP1(floating);
        floating = new FloatingLand(this.game, 850, 1000, 0);
        this.game.addEntityP1(floating);
        floating = new FloatingLand(this.game, 350, 950, 1);
        this.game.addEntityP1(floating);

        smallBridge = new Bridge(this.game, 1050, 800, 1);
        this.game.addEntityP1(smallBridge);
        smallBridge = new Bridge(this.game, 600, 800, 1);
        this.game.addEntityP1(smallBridge);

        smallBridge = new Bridge(this.game, 1050, 1100, 1);
        this.game.addEntityP1(smallBridge);
        smallBridge = new Bridge(this.game, 600, 1100, 1);
        this.game.addEntityP1(smallBridge);

        //past first nonplayables
        let portal = new Portal(this.game, -1700, 875, 1, this.assassin);
        this.game.addEntityP1(portal);
        portal = new Portal(this.game, -1715, 875, 0, this.assassin);
        this.game.addEntityP1(portal);

        land = new Land(this.game, -900, 950, 'R');
        this.game.addEntityP1(land);
        land = new Land(this.game, -1830, 950, 0);
        this.game.addEntityP1(land);
        land = new Land(this.game, -2760, 950, 'L');
        this.game.addEntityP1(land);

        let redEye = new RedEye(this.game, 901, 915);
        this.game.addEntityP1(redEye);

        let knight = new Knight(this.game, 800, -100, 160, 1200);
        this.game.addEntityP1(knight);

        let shadowWarrior = new ShadowWarrior(this.game, 1898, 800 , false);
        this.game.addEntityP1(shadowWarrior);
        shadowWarrior = new ShadowWarrior(this.game, -1000, 800, true);
        this.game.addEntityP1(shadowWarrior);

        let healthPotion = new HealthPotion(this.game, 920, 955);
        this.game.addEntityP1(healthPotion);
        healthPotion = new HealthPotion(this.game, 1900, 830);
        this.game.addEntityP1(healthPotion);

    }


    //Entities that exist after first portal and before second
    loadPhaseTwo() {
        let smallBridge = new Bridge(this.game, 2700, 3950, 1);
        this.game.addEntityP2(smallBridge);
        let bridge = new Bridge(this.game, 3050, 3800, 0);
        this.game.addEntityP2(bridge);
        smallBridge = new Bridge(this.game, 4000, 4000, 1);
        this.game.addEntityP2(smallBridge);

        let landCube = new FloatingLand(this.game, 4250, 3900, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 4500, 4100, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 4800, 4100, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 5100, 4100, 2);
        this.game.addEntityP2(landCube);


        landCube = new FloatingLand(this.game, 5330, 4100, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 5730, 3700, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 5330, 4240, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 5730, 3840, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 5730, 3980, 2);
        this.game.addEntityP2(landCube);

        let floating = new FloatingLand(this.game, 3650, 3800, 1);
        this.game.addEntityP2(floating);

        let land = new Land(this.game, 4500, 4600, 'L');
        this.game.addEntityP2(land);
        land = new Land(this.game, 5430, 4600, 0);
        this.game.addEntityP2(land);
        land = new Land(this.game, 6360, 4600, 'R');
        this.game.addEntityP2(land);

        let healthPotion = new HealthPotion(this.game, 5900, 4650);
        this.game.addEntityP2(healthPotion);

        floating = new FloatingLand(this.game, 7400, 4700, 1);
        this.game.addEntityP2(floating);

        landCube = new FloatingLand(this.game, 7600, 4900, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 7900, 4900, 2);
        this.game.addEntityP2(landCube);

        healthPotion = new HealthPotion(this.game, 8300, 5500);
        this.game.addEntityP2(healthPotion);

        //right stack tube b4 portal
        landCube = new FloatingLand(this.game, 8550, 4650, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 8550, 4800, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 8550, 4950, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 8550, 5100, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 8550, 5250, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 8550, 5400, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 8550, 5550, 2);
        this.game.addEntityP2(landCube);


        //left stack tube b4 portal
        landCube = new FloatingLand(this.game, 8200, 5100, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 8200, 5250, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 8200, 5400, 2);
        this.game.addEntityP2(landCube);
        landCube = new FloatingLand(this.game, 8200, 5550, 2);
        this.game.addEntityP2(landCube);


        //landing spot
        landCube = new FloatingLand(this.game, 8400, 5950, 2);
        this.game.addEntityP2(landCube);

        floating = new FloatingLand(this.game, 8100, 5950, 1);
        this.game.addEntityP2(floating);
        floating = new FloatingLand(this.game, 8700, 5950, 1);
        this.game.addEntityP2(floating);


        let portal = new Portal(this.game, 10600, 5880, 1, this.assassin);
        this.game.addEntityP2(portal);
        portal = new Portal(this.game, 10585, 5880, 0, this.assassin);
        this.game.addEntityP2(portal);

        //platform of second portal
        land = new Land(this.game, 9100, 5950, 'L');
        this.game.addEntityP2(land);
        land = new Land(this.game, 10030, 5950, 0);
        this.game.addEntityP2(land);
        land = new Land(this.game, 10930, 5950, 'R');
        this.game.addEntityP2(land);

        let shadowWarrior = new ShadowWarrior(this.game, 9600, 5900 , false);
        this.game.addEntityP2(shadowWarrior);
        shadowWarrior = new ShadowWarrior(this.game, 10700, 5900, true);
        this.game.addEntityP2(shadowWarrior);

        let redEye = new RedEye(this.game, 3690, 3700);
        this.game.addEntityP2(redEye);
        redEye = new RedEye(this.game, 5100, 4580);
        this.game.addEntityP2(redEye);
        redEye = new RedEye(this.game, 5800, 4580);
        this.game.addEntityP2(redEye);

        redEye = new RedEye(this.game, 8150, 5800);
        this.game.addEntityP2(redEye);
        redEye = new RedEye(this.game, 8800, 5800);
        this.game.addEntityP2(redEye);
        healthPotion = new HealthPotion(this.game, 9000, 5850);
        this.game.addEntityP2(healthPotion);


        let knight = new Knight(this.game, 4300, 3750, 100, 100);
        this.game.addEntityP2(knight);
        knight = new Knight(this.game, 5200, 4550, 100, 1200);
        this.game.addEntityP2(knight);
        knight = new Knight(this.game, 5700, 4550, 100, 1200);
        this.game.addEntityP2(knight);

        healthPotion = new HealthPotion(this.game, 5400, 4030);
        this.game.addEntityP2(healthPotion);
    }

    //Entities that exist after second portal (final phase)
    loadPhaseThree() {
        //borders
        let caveWall = new CaveWall(this.game, 3500, -1000, 1, 2);
        this.game.addEntityP1(caveWall);
        caveWall = new CaveWall(this.game, 3500, -100, 1, 2);
        this.game.addEntityP1(caveWall);
        caveWall = new CaveWall(this.game, 3500, 1106, 1, 2);
        this.game.addEntityP1(caveWall);


        //floating to left and right of block
        let smallBridge = new Bridge(this.game, 4250, 0, 1);
        this.game.addEntity(smallBridge);
        smallBridge = new Bridge(this.game, 6100, 0, 1);
        this.game.addEntity(smallBridge);
        smallBridge = new Bridge(this.game, 4250, 250, 1);
        this.game.addEntity(smallBridge);
        smallBridge = new Bridge(this.game, 6100, 250, 1);
        this.game.addEntity(smallBridge);
        let bridge = new Bridge(this.game, 4050, 400, 0);
        this.game.addEntity(bridge);
        bridge = new Bridge(this.game, 6050, 400, 0);
        this.game.addEntity(bridge);



        //main landblock
        let land = new Land(this.game, 4500, 100, 'L');
        this.game.addEntity(land);
        land = new Land(this.game, 5100, 100, 'R');
        this.game.addEntity(land);

        // bridges above dragon
        bridge = new Bridge(this.game, 4650, -75, 0);
        this.game.addEntity(bridge);
        bridge = new Bridge(this.game, 5500, -75, 0);
        this.game.addEntity(bridge);

        let iceArrow = new IceArrow(this.game, 5000, -120);
        this.game.addEntity(iceArrow);
        iceArrow = new IceArrow(this.game, 4700, -122);
        this.game.addEntity(iceArrow);
        iceArrow = new IceArrow(this.game, 5600, -120);
        this.game.addEntity(iceArrow);
        iceArrow = new IceArrow(this.game, 5900, -122);
        this.game.addEntity(iceArrow);
        iceArrow = new IceArrow(this.game, 5300, -450);
        this.game.addEntity(iceArrow);
        iceArrow = new IceArrow(this.game, 4400, -100);
        this.game.addEntity(iceArrow);
        iceArrow = new IceArrow(this.game, 6000, 0);
        this.game.addEntity(iceArrow);



        let healthPotion = new HealthPotion(this.game, 4850, -120, 0);
        this.game.addEntity(healthPotion);
        healthPotion = new HealthPotion(this.game, 6100, -50, 0);
        this.game.addEntity(healthPotion);

        let dragon = new Dragon(this.game, 5800, -100)
        this.game.addEntity(dragon);

    }

    //None playable assets that don't require collision detection
    loadBackgroundAssets() {
        let bLayer = new BackgroundLayer(this.game, 0, 0, 1, 0);
        this.game.addEntity(bLayer);
        bLayer = new BackgroundLayer(this.game, 0, 0, 1, 1);
        this.game.addEntity(bLayer);
        bLayer = new BackgroundLayer(this.game, 0, 0, 1, -1);
        this.game.addEntity(bLayer);
        bLayer = new BackgroundLayer(this.game, 0, 0, 1, 2);
        this.game.addEntity(bLayer);
        bLayer = new BackgroundLayer(this.game, 0, 0, 1, 3);
        this.game.addEntity(bLayer);
        bLayer = new BackgroundLayer(this.game, 0, 0, 1, 4);
        this.game.addEntity(bLayer)

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
        bVine = new BackgroundLayer(this.game, -1000, -200, 0, 7);
        this.game.addEntity(bVine);
        bVine = new BackgroundLayer(this.game, -1000, -200, 0, -1);
        this.game.addEntity(bVine);
        bVine = new BackgroundLayer(this.game, -1000, -200, 0, 8);
        this.game.addEntity(bVine);
    }

    //Load the assets, start music, then start game
    loadLevelOne() {
        this.x = 0;
        this.y = 0;
        this.parallax = 0;

        if (!this.title) {
            ASSET_MANAGER.pauseBackgroundMusic();
            //ASSET_MANAGER.playAsset("audio/background_diablo.mp3");
        }
        //assets for assassin
        let healthBar = new HealthBar(this.game);
        let weaponIcon = new WeaponIcons(this.game);
        this.assassin = new Assassin(this.game, PARAMS.XSPAWN, PARAMS.YSPAWN, healthBar, weaponIcon);
        this.loadBackgroundAssets()
        this.loadPhaseOne();
        this.loadPhaseTwo();
        this.loadPhaseThree();

        this.volumeSlider = new VolumeSlider();
        this.game.addEntity(this.volumeSlider);
        this.difficulty = new Difficulty();
        this.game.addEntity(this.difficulty);

        //initialized up higher to use in portal and keep appropriate order of drawing in front of each other
        this.game.addEntity(weaponIcon);
        this.game.addEntity(healthBar);
        this.game.addEntity(this.assassin);

        this.startMenu = new Menus(this.game);
        this.game.addEntity(this.startMenu);
    };

    //Updates the audio if a player changes volume settings in pause menu
    updateAudio() {
        let mute = PARAMS.VOLUME === 0;
        let volume = PARAMS.VOLUME/100;
        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
        if (PARAMS.START) {
            ASSET_MANAGER.playAsset("./audio/background_diablo.mp3");
        }

    }

    //check conditions and move camera/parallax effect
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
                ASSET_MANAGER.playAsset("./audio/game_over_music2.mp3")
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

    //Display volume, difficulty on pause and soul force when playing.
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
