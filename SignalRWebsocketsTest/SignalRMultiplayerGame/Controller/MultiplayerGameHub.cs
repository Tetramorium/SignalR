using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using SignalRMultiplayerGame.Model;
using SignalRMultiplayerGame.Model.HelperClasses;

namespace SignalRMultiplayerGame.Controller
{
    [HubName("simpleGame")]
    public class MultiplayerGameHub : Hub
    {
        private readonly GameLoop _gameLoop;

        public MultiplayerGameHub() : this(GameLoop.Instance) { }

        public MultiplayerGameHub(GameLoop stockTicker)
        {
            _gameLoop = stockTicker;
        }

        public World GetWorld()
        {
            return _gameLoop.GetWorld();
        }

        public void send(Keyboard keyboard)
        {
            int index = this._gameLoop.GetWorld().playerList.FindIndex(e => e.PlayerName == keyboard.PlayerName);

            if (index == -1)
            {
                this.GetWorld().playerList.Add(new Player { PlayerName = keyboard.PlayerName, Location = new Vector2D(50, 50) });
            }
            else
            {

                Player p = this._gameLoop.GetWorld().playerList[index];

                if (keyboard.PrevW && keyboard.PrevS || !keyboard.PrevW && !keyboard.PrevS)
                {
                    p.Velocity.Y = 0;
                }
                else if (keyboard.PrevW)
                {
                    p.Velocity.Y = -1;
                    p.Direction = 3;
                }
                else if (keyboard.PrevS)
                {
                    p.Velocity.Y = 1;
                    p.Direction = 0;
                }

                if (keyboard.PrevA && keyboard.PrevD || !keyboard.PrevA && !keyboard.PrevD)
                {
                    p.Velocity.X = 0;
                }
                else if (keyboard.PrevA)
                {
                    p.Velocity.X = -1;
                    p.Direction = 1;
                }
                else if (keyboard.PrevD)
                {
                    p.Velocity.X = 1;
                    p.Direction = 2;
                }
            }
        }
    }
}