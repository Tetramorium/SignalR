using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRMultiplayerGame.Model
{
    public class World
    {
        public List<Projectile> ProjectileList { get; set; }
        public List<Player> PlayerList { get; set; }

        public World()
        {
            ProjectileList = new List<Projectile>();
            PlayerList = new List<Player>();

            //playerList.Add(new Player { Name = "Bob", Location = new Vector2( 0 ,0) });
        }
    }
}