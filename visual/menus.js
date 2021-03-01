class Menus {
    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/menus/start_menu.png");
        this.controls = ASSET_MANAGER.getAsset("./sprites/menus/intro_menu.png");
        this.pause = ASSET_MANAGER.getAsset("./sprites/menus/pause_menu.png");
        this.gameOver = ASSET_MANAGER.getAsset("./sprites/menus/gameover_menu.png")
        this.exists = true;
        this.playCounter = 0;
        this.startCounter = 0;
    };

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
    draw(ctx){
        if (this.exists) {
            if (!PARAMS.PLAY) {
                ctx.drawImage(this.spritesheet, 0, 0, 975, 772, 0, 0, 950, 750);
            } else if (PARAMS.PLAY) {
                ctx.drawImage(this.spritesheet, 979, 0, 975, 772, 0, 0, 950, 750);
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


    };

}

class VolumeSlider {
    constructor(game) {
        Object.assign(this, { game });
        this.exists = true;
    }

    update() {
        this.exists = PARAMS.PAUSE;
    }

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

class Difficulty {
    constructor(game) {
        Object.assign(this, { game });
        this.exists = true;
    }

    update() {
        this.exists = PARAMS.PAUSE;
    }

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

