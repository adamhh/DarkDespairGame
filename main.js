
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/dragon/dragon_attack.png");
ASSET_MANAGER.queueDownload("./sprites/dragon/dragon_idle.png");
ASSET_MANAGER.queueDownload("./sprites/dragon/dragon_walk.png");
ASSET_MANAGER.queueDownload("./sprites/ground_brick.png");
ASSET_MANAGER.queueDownload("./sprites/floating_brick1.png");
ASSET_MANAGER.queueDownload("./sprites/floating_bridge.png");
ASSET_MANAGER.queueDownload("./sprites/landblock.png");
ASSET_MANAGER.queueDownload("./sprites/landendR.png");
ASSET_MANAGER.queueDownload("./sprites/landendL.png");
ASSET_MANAGER.queueDownload("./sprites/cloud1.png");
ASSET_MANAGER.queueDownload("./sprites/cloud2.png");
ASSET_MANAGER.queueDownload("./sprites/cloud2.png");
ASSET_MANAGER.queueDownload("./sprites/cloud3.png");
ASSET_MANAGER.queueDownload("./sprites/cloud4.png");
ASSET_MANAGER.queueDownload("./sprites/knight.png");
ASSET_MANAGER.queueDownload("./sprites/knightTEST.png");
ASSET_MANAGER.queueDownload("./sprites/knight/knight_idle.png");
ASSET_MANAGER.queueDownload("./sprites/knight/knight_walk.png");
ASSET_MANAGER.queueDownload("./sprites/princess/princess_idle.png");

ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
