$(function () {

    var images = ({ player_1: "Resources/img/player1.png", player_2: "Resources/img/player2.png", player_3: "Resources/img/player3.png", player_4: "Resources/img/player4.png", projectile_green: "Resources/img/projectiles/green.png", background: "Resources/img/backgrounddetailed2.png" });

    var height = $("#Game").height();
    var width = $("#Game").width();

    var img = new Image;
    img.src = images.player_1;

    var game = $.connection.simpleGame; // the generated client-side hub proxy

    function init() {
        game.server.getWorld().done(function (world) {
            paint(world);
            gameLoop();
        });
    }

    var playerName = prompt('Enter your name:', '');

    var player = { PlayerName: playerName, prevW: false, prevA: false, prevS: false, prevD: false };

    $(document).keydown(function (key) {
        switch (key.keyCode) {
            //W
            case 87:
                if (!player.prevW) {
                    player.prevW = true;
                }
                break;
            //S
            case 83:
                if (!player.prevS) {
                    player.prevS = true;
                }
                break;
            //A
            case 65:
                if (!player.prevA) {
                    player.prevA = true;
                }
                break;
            //D
            case 68:
                if (!player.prevD) {
                    player.prevD = true;
                }
                break;
        }
    });
    $(document).keyup(function (key) {
        switch (key.keyCode) {
            //W
            case 87:
                if (player.prevW) {
                    player.prevW = false;
                }
                break;
            //S
            case 83:
                if (player.prevS) {
                    player.prevS = false;
                }
                break;
            //A
            case 65:
                if (player.prevA) {
                    player.prevA = false;
                }
                break;
            //D
            case 68:
                if (player.prevD) {
                    player.prevD = false;
                }
        }
    });

    function paint(world) {
        var gameScreen = $("#Game")[0];
        var gameContext = gameScreen.getContext("2d");
        gameContext.clearRect(0, 0, width, height);
        for (_i = 0, _len = world.playerList.length; _i < _len; _i++) {
            entity = world.playerList[_i];
            Draw(entity, gameContext);
            console.log(entity);
        }
    }

    function Draw(obj, ctx) {
        //ctx.drawImage(img, 0, 0, 32, 32, obj.X, obj.Y, 32, 32);


        //if (obj.PlayerName == player.PlayerName) {
        //    ctx.drawImage(img, 0, 0, 32, 32, 328, 208, 32, 32);
        //    player = obj;
        //} else {
        //    ctx.font = "16px Arial";
        //    ctx.fillText(obj.PlayerName, 328 + obj.Location.X, 208 + obj.Location.Y);
        //    ctx.drawImage(img, 0, 0, 32, 32, 328 + obj.Location.X, obj.Location.Y + 208, 32, 32);
        //}
        //var player = new Entity({ img: images.player_1, direction: 0, x: width / 2 - 32, y: height / 2, width: 32, height: 32, moving: false, state: true, speed: 5, type: "player", clipX: 0, clipY: 0, reloadTime: 0 });
    }

    var oldTime = new Date().getTime();

    var ONE_FRAME_TIME = 1000 / 60;

    function gameLoop() {
        game.server.send(player);
        setTimeout(function () { gameLoop(); }, ONE_FRAME_TIME);
    }

    // Add a client-side hub method that the server will call
    game.client.updateWorld = function (world) {
        paint(world);
    };

    // Start the connection
    $.connection.hub.start().done(init);

});