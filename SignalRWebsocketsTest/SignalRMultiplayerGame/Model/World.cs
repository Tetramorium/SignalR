using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRMultiplayerGame.Model
{
    public class World
    {
        public List<Player> playerList { get; set; }

        public World()
        {
            playerList = new List<Player>();

            //playerList.Add(new Player { Name = "Bob", Location = new Vector2( 0 ,0) });
        }
    }
}