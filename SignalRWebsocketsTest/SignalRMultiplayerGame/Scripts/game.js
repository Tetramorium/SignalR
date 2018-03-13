$(function () {

    var images = ({ player_1: "Resources/img/player1.png", player_2: "Resources/img/player2.png", player_3: "Resources/img/player3.png", player_4: "Resources/img/player4.png", projectile_green: "Resources/img/projectiles/green.png", background: "Resources/img/backgrounddetailed2.png" });

    var height = $("#Game").height();
    var width = $("#Game").width();

    var playerOneImage = new Image;
    var playerTwoImage = new Image;
    var playerThreeImage = new Image;
    var playerFourImage = new Image;

    playerOneImage.src = images.player_1;
    playerTwoImage.src = images.player_2;
    playerThreeImage.src = images.player_3;
    playerFourImage.src = images.player_4;

    var resources = [playerOneImage, playerTwoImage, playerThreeImage, playerFourImage];

    var game = $.connection.simpleGame; // the generated client-side hub proxy

    function init() {
        game.server.getWorld().done(function (world) {
            if (world.playerList.length > 3) {

            } else {
                paint(world);
                gameLoop();
            }
        });
    }

    var playerName = prompt('Enter your name:', '');

    var player = { PlayerName: playerName, prevW: false, prevA: false, prevS: false, prevD: false, Location: { X: 50, Y: 50 }, Direction: 0 };

    $(document).keydown(function (key) {
        switch (key.keyCode) {
            //W
            case 87:
                if (!player.prevW) {
                    player.prevW = true;
                    player.Direction = 0;
                }
                break;
            //A
            case 65:
                if (!player.prevA) {
                    player.prevA = true;
                    player.Direction = 1;
                }
                break;
            //S
            case 83:
                if (!player.prevS) {
                    player.prevS = true;
                    player.Direction = 3;
                }
                break;

            //D
            case 68:
                if (!player.prevD) {
                    player.prevD = true;
                    player.Direction = 4;
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
        console.log(world.playerList.length);
        for (_i = 0, _len = world.playerList.length; _i < _len; _i++) {
            entity = world.playerList[_i];
            Draw(entity, gameContext);
            if (world.playerList.length == 3) {
                console.log(entity);
            }

        }
    }

    function Draw(obj, ctx) {

        var a = 1;

        if (timer <= 4) {
            a = 0;
        } else if (timer <= 8) {
            a = 2;
        }

        if (obj.PlayerName == player.PlayerName) {
            drawPlayer(obj, ctx, a, 0, 0);
            player.Location.X = obj.Location.X;
            player.Location.Y = obj.Location.Y;
        } else {
            ctx.font = "16px Arial";
            ctx.fillText(obj.PlayerName, 328 + obj.Location.X - player.Location.X, 208 + obj.Location.Y - player.Location.Y);
            drawPlayer(obj, ctx, a, -player.Location.X + obj.Location.X, -player.Location.Y + obj.Location.Y);
            //console.log(obj);
            // ctx.drawImage(img, 0, 0, 32, 32, 328 + obj.Location.X - player.Location.X, 208 + obj.Location.Y - player.Location.Y, 32, 32);
        }
        //var player = new Entity({ img: images.player_1, direction: 0, x: width / 2 - 32, y: height / 2, width: 32, height: 32, moving: false, state: true, speed: 5, type: "player", clipX: 0, clipY: 0, reloadTime: 0 });
    }

    function drawPlayer(obj, ctx, state, offSetX, offSetY) {
        if (obj.Velocity.X != 0 || obj.Velocity.Y != 0) {
            ctx.drawImage(resources[obj.Id], state * 32, 32 * obj.Direction, 32, 32, 328 + offSetX, 208 + offSetY, 32, 32);

        } else {
            ctx.drawImage(resources[obj.Id], 0, 32 * obj.Direction, 32, 32, 328 + offSetX, 208 + offSetY, 32, 32);
        }
    }

    var oldTime = new Date().getTime();

    var ONE_FRAME_TIME = 1000 / 60;

    function gameLoop() {
        game.server.send(player);
        setTimeout(function () { gameLoop(); }, ONE_FRAME_TIME);
    }

    var timer = 1;

    // Add a client-side hub method that the server will call
    game.client.updateWorld = function (world) {

        timer++;

        if (timer == 12) {
            timer = 0;
        }

        paint(world);
    };

    // Start the connection
    $.connection.hub.start().done(init);

});