/**
 * This class handles the menus in the game: start, intro, pause, gameover, and 'you won'.
 *
 * @author Adam Hall
 */
class Menus {
    constructor(game) {
        Object.assign(this, { game });
        this.mainmenu = ASSET_MANAGER.getAsset("./sprites/menus/start_menu.png");
        this.controls = ASSET_MANAGER.getAsset("./sprites/menus/intro_menu.png");
        this.pause = ASSET_MANAGER.getAsset("./sprites/menus/pause_menu.png");
        this.gameOver = ASSET_MANAGER.getAsset("./sprites/menus/gameover_menu.png")
        this.winScreen = ASSET_MANAGER.getAsset("./sprites/menus/youWON.png")
        this.exists = true;
        this.playCounter = 0;
        this.startCounter = 0;
        this.initialWinPlay = true;
    };

    //Based on game PARAMS display menus
    update() {
        if (this.exists) {
            if (PARAMS.PLAY) {
                this.playCounter++;
                if (this.playCounter > 5) {
                    PARAMS.PLAY = false;
                }
            }
            if (this.playCounter > 5) {
                this.startCounter++;
                if (this.startCounter > 5) {
                    PARAMS.CONTROLS = true;
                }
            }

        }
    };

    //Draw the menus, if correct PARAMS are set.
    draw(ctx){
        if (this.exists) {
            if (!PARAMS.PLAY) {
                ctx.drawImage(this.mainmenu, 0, 0, 975, 772, 0, 0, 950, 750);
            } else if (PARAMS.PLAY) {
                ctx.drawImage(this.mainmenu, 979, 0, 975, 772, 0, 0, 950, 750);
            }
        }
        if (PARAMS.CONTROLS) {
            ctx.drawImage(this.controls, 0, 0, 950, 750);
        }
        if (PARAMS.PAUSE) {
            ctx.drawImage(this.pause, 0, 0, 950, 750);
        }
        if (PARAMS.GAMEOVER) {
            ctx.drawImage(this.gameOver, 0, 0, 950, 750);

        }
        if (PARAMS.WIN) {
            ctx.drawImage(this.winScreen, 0, 0, 950, 750);
            if (this.initialWinPlay) {
                PARAMS.START = false;
                ASSET_MANAGER.pauseBackgroundMusic();
                ASSET_MANAGER.playAsset("./audio/you_win.mp3")
                this.initialWinPlay = false;
            }
        }


    };

}

/**
 * This class handles the volume slider in the pause menu.
 *
 * @author Adam Hall
 */
class VolumeSlider {
    constructor(game) {
        Object.assign(this, { game });
        this.exists = true;
    }

    //Check if it should show exist
    update() {
        this.exists = PARAMS.PAUSE && !PARAMS.WIN;
    }

    //If it should exist draw on the screen (over pause menu)
    draw(ctx) {
        if(this.exists){
            ctx.strokeStyle = "Black";
            ctx.fillStyle = "Grey";
            ctx.strokeRect(335, 455, 50, 25);
            ctx.fillRect(390, 455, PARAMS.VOLUME * 2.5, 25);
            ctx.strokeRect(390, 455, 250, 25);
            ctx.font = 18 + 'px "MedievalSharp"';
            ctx.fillStyle = "Red";
            ctx.fillText("MUTE", 337, 475);
        }
    }
}

/**
 * This class handles the difficulty adjustment in the pause menu.
 */
class Difficulty {
    constructor(game) {
        Object.assign(this, { game });
        this.exists = true;
    }

    //Check if it should exist
    update() {
        this.exists = PARAMS.PAUSE && !PARAMS.WIN;
    }

    //If it should exist, draw to canvas.
    draw(ctx) {
        if(this.exists){
            let easyColor = "Black";
            let normalColor = "Black";
            let hardColor = "Black";
            switch (PARAMS.DIFFICULTY) {
                case PARAMS.EASY:
                    easyColor = "White";
                    break;
                case PARAMS.NORMAL:
                    normalColor = "White";
                    break;
                default:
                    hardColor = "White";
                    break;
            }
            ctx.font = 38 + 'px "MedievalSharp"';
            ctx.fillStyle = easyColor;
            ctx.fillText("EASY", 355, 535);
            ctx.fillStyle = normalColor;
            ctx.fillText("NORMAL", 465, 535);
            ctx.fillStyle = hardColor;
            ctx.fillText("HARD", 639, 535);
        }
    }
}