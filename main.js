
var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/dragon_sheetUNCHANGED.png");
ASSET_MANAGER.queueDownload("./sprites/assassin.png");
ASSET_MANAGER.queueDownload("./sprites/assassin_bow.png");
ASSET_MANAGER.queueDownload("./sprites/assassin_sword.png");
ASSET_MANAGER.queueDownload("./sprites/portal.png");
ASSET_MANAGER.queueDownload("./sprites/portal_anim.png");
ASSET_MANAGER.queueDownload("./sprites/sign_portal.png");
ASSET_MANAGER.queueDownload("./sprites/landblock.png");
ASSET_MANAGER.queueDownload("./sprites/landendL.png");
ASSET_MANAGER.queueDownload("./sprites/landendR.png");
ASSET_MANAGER.queueDownload("./sprites/landassets.png");
ASSET_MANAGER.queueDownload("./sprites/floating_land.png");
ASSET_MANAGER.queueDownload("./sprites/background_layer1.png");
ASSET_MANAGER.queueDownload("./sprites/background_layer2.png");
ASSET_MANAGER.queueDownload("./sprites/vines.png");
ASSET_MANAGER.queueDownload("./sprites/ceiling.png");
ASSET_MANAGER.queueDownload("./sprites/portal.png");
ASSET_MANAGER.queueDownload("./sprites/healthbar.png");
ASSET_MANAGER.queueDownload("./sprites/weaponicons.png");
ASSET_MANAGER.queueDownload("./sprites/cavewall_left.png");
ASSET_MANAGER.queueDownload("./sprites/cavewall_right.png");
ASSET_MANAGER.queueDownload("./sprites/cavewall_left2.png");
ASSET_MANAGER.queueDownload("./sprites/cavewall_right2.png");
ASSET_MANAGER.queueDownload("./sprites/shadow_assassin.png");
ASSET_MANAGER.queueDownload("./sprites/arrow_right.png");
ASSET_MANAGER.queueDownload("./sprites/arrow_left.png");
ASSET_MANAGER.queueDownload("./sprites/start_menu.png");
ASSET_MANAGER.queueDownload("./sprites/red_eye_bow.png");
ASSET_MANAGER.queueDownload("./sprites/ingame_items.png");
ASSET_MANAGER.queueDownload("./sprites/knight.png");


ASSET_MANAGER.queueDownload("./audio/background_music.mp3");

ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();

	ASSET_MANAGER.autoRepeat("./audio/background_music.mp3");

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
