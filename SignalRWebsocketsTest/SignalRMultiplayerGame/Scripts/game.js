$(function () {

    var images = { player_1: "Resources/img/player1.png", player_2: "Resources/img/player2.png", player_3: "Resources/img/player3.png", player_4: "Resources/img/player4.png", projectile_green: "Resources/img/projectiles/green.png", background: "Resources/img/backgrounddetailed2.png" };

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

    var ProjectileImage = new Image;
    ProjectileImage.src = "Resources/img/projectiles/green.png";

    var resources = [playerOneImage, playerTwoImage, playerThreeImage, playerFourImage];

    var game = $.connection.simpleGame; // the generated client-side hub proxy

    function init() {
        game.server.getWorld().done(function (world) {
            if (world.PlayerList.length > 3) {

            } else {
                paint(world);
                gameLoop();
            }
        });
    }

    var playerName = prompt('Enter your name:', '');

    var player =
        {
            PlayerName: playerName,
            PrevW: false,
            PrevA: false,
            PrevS: false,
            PrevD: false,
            PrevSpacebar: false,
            Location: { X: 0, Y: 0 },
            Direction: { X: 1, Y: 0 }
        };

    $(document).keydown(function (key) {
        switch (key.keyCode) {
            //W
            case 87:
                if (!player.PrevW) {
                    player.PrevW = true;
                }
                break;
            //A
            case 65:
                if (!player.PrevA) {
                    player.PrevA = true;
                }
                break;
            //S
            case 83:
                if (!player.PrevS) {
                    player.PrevS = true;
                }
                break;

            //D
            case 68:
                if (!player.PrevD) {
                    player.PrevD = true;
                }
                break;
            //Spacebar
            case 32:
                if (!player.prevSpacebar) {
                    player.prevSpacebar = true;
                }
                break;
        }
    });
    $(document).keyup(function (key) {
        switch (key.keyCode) {
            //W
            case 87:
                if (player.PrevW) {
                    player.PrevW = false;
                }
                break;
            //S
            case 83:
                if (player.PrevS) {
                    player.PrevS = false;
                }
                break;
            //A
            case 65:
                if (player.PrevA) {
                    player.PrevA = false;
                }
                break;
            //D
            case 68:
                if (player.PrevD) {
                    player.PrevD = false;
                }
            //Spacebar
            case 32:
                if (player.prevSpacebar) {
                    player.prevSpacebar = false;
                }
                break;
        }
    });

    function paint(world) {
        var gameScreen = $("#Game")[0];
        var gameContext = gameScreen.getContext("2d");
        gameContext.clearRect(0, 0, width, height);

        for (_i = 0, _len = world.PlayerList.length; _i < _len; _i++) {
            entity = world.PlayerList[_i];
            Draw(entity, gameContext);
        }

        for (_i = 0, _len = world.ProjectileList.length; _i < _len; _i++) {
            entity = world.ProjectileList[_i];
            drawProjectile(entity, gameContext, -player.Location.X + entity.Location.X, -player.Location.Y + entity.Location.Y);
        }
    }

    function Draw(obj, ctx) {
        var a = 1;

        if (timer <= 4) {
            a = 0;
        } else if (timer <= 8) {
            a = 2;
        }

        if (obj.PlayerName === player.PlayerName) {
            drawPlayer(obj, ctx, a, 0, 0);
            player.Location.X = obj.Location.X;
            player.Location.Y = obj.Location.Y;
        } else {
            ctx.font = "16px Arial";
            ctx.fillText(obj.PlayerName, 328 + obj.Location.X - player.Location.X, 208 + obj.Location.Y - player.Location.Y);
            drawPlayer(obj, ctx, a, -player.Location.X + obj.Location.X, -player.Location.Y + obj.Location.Y);
            // ctx.drawImage(img, 0, 0, 32, 32, 328 + obj.Location.X - player.Location.X, 208 + obj.Location.Y - player.Location.Y, 32, 32);
        }
        //var player = new Entity({ img: images.player_1, direction: 0, x: width / 2 - 32, y: height / 2, width: 32, height: 32, moving: false, state: true, speed: 5, type: "player", clipX: 0, clipY: 0, reloadTime: 0 });
    }

    function drawPlayer(obj, ctx, state, offSetX, offSetY) {

        var convertedDirection = 0;

        if (obj.Direction.X == 1) {
            convertedDirection = 2;
        } else if (obj.Direction.X == -1) {
            convertedDirection = 1;
        } else if (obj.Direction.Y == 1) {
            convertedDirection = 0;
        } else if (obj.Direction.Y == -1) {
            convertedDirection = 3;
        }
        if (obj.Velocity.X !== 0 || obj.Velocity.Y !== 0) {
            ctx.drawImage(resources[obj.PlayerId], state * 32, 32 * convertedDirection, 32, 32, 328 + offSetX, 208 + offSetY, 32, 32);

        } else {
            ctx.drawImage(resources[obj.PlayerId], 0, 32 * convertedDirection, 32, 32, 328 + offSetX, 208 + offSetY, 32, 32);
        }
    }

    function drawProjectile(obj, ctx, offSetX, offSetY) {

        ctx.drawImage(ProjectileImage, 14 * obj.Status, 0, 14, 14, 328 + offSetX, 208 + offSetY, 28, 28);
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

        if (timer === 12) {
            timer = 0;
        }

        paint(world);
    };

    // Start the connection
    $.connection.hub.start().done(init);

});