
var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/characters/dragon_sheetUNCHANGED.png");
ASSET_MANAGER.queueDownload("./sprites/characters/assassin.png");
ASSET_MANAGER.queueDownload("./sprites/characters/assassin_bow.png");
ASSET_MANAGER.queueDownload("./sprites/characters/assassin_sword.png");
ASSET_MANAGER.queueDownload("./sprites/characters/shadow_assassin.png");
ASSET_MANAGER.queueDownload("./sprites/characters/red_eye_bow.png");
ASSET_MANAGER.queueDownload("./sprites/characters/knight.png");

ASSET_MANAGER.queueDownload("./sprites/backgroundassets/landblock.png");
ASSET_MANAGER.queueDownload("./sprites/backgroundassets/landendL.png");
ASSET_MANAGER.queueDownload("./sprites/backgroundassets/landendR.png");
ASSET_MANAGER.queueDownload("./sprites/backgroundassets/landassets.png");
ASSET_MANAGER.queueDownload("./sprites/backgroundassets/floating_land.png");
ASSET_MANAGER.queueDownload("./sprites/backgroundassets/background_layer1.png");
ASSET_MANAGER.queueDownload("./sprites/backgroundassets/background_layer2.png");
ASSET_MANAGER.queueDownload("./sprites/backgroundassets/vines.png");
ASSET_MANAGER.queueDownload("./sprites/backgroundassets/ceiling.png");
ASSET_MANAGER.queueDownload("./sprites/backgroundassets/portal.png");
ASSET_MANAGER.queueDownload("./sprites/backgroundassets/portal_anim.png");
ASSET_MANAGER.queueDownload("./sprites/backgroundassets/cavewall_left.png");
ASSET_MANAGER.queueDownload("./sprites/backgroundassets/cavewall_right.png");
ASSET_MANAGER.queueDownload("./sprites/backgroundassets/cavewall_left2.png");
ASSET_MANAGER.queueDownload("./sprites/backgroundassets/cavewall_right2.png");


ASSET_MANAGER.queueDownload("./sprites/gameassets/sign_portal.png");
ASSET_MANAGER.queueDownload("./sprites/gameassets/healthbar.png");
ASSET_MANAGER.queueDownload("./sprites/gameassets/arrow_right.png");
ASSET_MANAGER.queueDownload("./sprites/gameassets/arrow_left.png");
ASSET_MANAGER.queueDownload("./sprites/gameassets/ingame_items.png");

ASSET_MANAGER.queueDownload("./sprites/menus/start_menu.png");
ASSET_MANAGER.queueDownload("./sprites/menus/intro_menu.png");
ASSET_MANAGER.queueDownload("./sprites/menus/pause_menu.png");
ASSET_MANAGER.queueDownload("./sprites/menus/gameover_menu.png");
ASSET_MANAGER.queueDownload("./sprites/menus/weaponicons.png");



ASSET_MANAGER.queueDownload("./audio/midnight_blade.mp3");
ASSET_MANAGER.queueDownload("./audio/background_diablo.mp3");
ASSET_MANAGER.queueDownload("./audio/sword_swing_metal.mp3");
ASSET_MANAGER.queueDownload("./audio/sword_swing.mp3");
ASSET_MANAGER.queueDownload("./audio/sword_swing_enemy.mp3");
ASSET_MANAGER.queueDownload("./audio/sword_hit_metal2.mp3");
ASSET_MANAGER.queueDownload("./audio/sword_thud.mp3");
ASSET_MANAGER.queueDownload("./audio/arrow_whoosh.mp3");
ASSET_MANAGER.queueDownload("./audio/arrow_impact_soft.mp3");
ASSET_MANAGER.queueDownload("./audio/player_death.mp3");
ASSET_MANAGER.queueDownload("./audio/portal_open.mp3");
ASSET_MANAGER.queueDownload("./audio/teleport.mp3");
ASSET_MANAGER.queueDownload("./audio/kick.mp3");
ASSET_MANAGER.queueDownload("./audio/sword_hit_player2.mp3");
ASSET_MANAGER.queueDownload("./audio/sword_hit_player_knight.mp3");
ASSET_MANAGER.queueDownload("./audio/game_over_music.mp3");


ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();

	ASSET_MANAGER.autoRepeat("./audio/midnight_blade.mp3");

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
