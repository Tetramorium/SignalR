using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using SignalRMultiplayerGame.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace SignalRMultiplayerGame.Controller
{
    public class GameLoop
    {
        // Singleton instance
        private readonly static Lazy<GameLoop> _instance = new Lazy<GameLoop>(() => new GameLoop(GlobalHost.ConnectionManager.GetHubContext<MultiplayerGameHub>().Clients));

        private readonly TimeSpan _updateInterval = TimeSpan.FromMilliseconds(1000 / 60);

        private World world { get; set; }

        private readonly Timer _timer;

        private GameLoop(IHubConnectionContext<dynamic> clients)
        {
            Clients = clients;

            world = new World();

            _timer = new Timer(UpdateWorld, null, _updateInterval, _updateInterval);
        }

        public static GameLoop Instance
        {
            get
            {
                return _instance.Value;
            }
        }

        public World GetWorld()
        {
            return world;
        }

        private IHubConnectionContext<dynamic> Clients
        {
            get;
            set;
        }

        private void UpdateWorld(object state)
        {
            // Check if players exist

            if (world.PlayerList.Count != 0)
            {
                foreach (Player p in world.PlayerList)
                {
                    p.Update(world);
                }

                List<Projectile> toRemove = new List<Projectile>();

                foreach (Projectile p in world.ProjectileList)
                {
                    p.Update(world);

                    if (p.Status == 15)
                    {
                        toRemove.Add(p);
                    }
                }

                foreach (Projectile p in toRemove)
                {
                    world.ProjectileList.Remove(p);
                }

                BroadcastWorld();
            }
        }

        private void BroadcastWorld()
        {
            world.PlayerList = world.PlayerList.OrderBy(e => e.Location.Y).ToList();
            Clients.All.updateWorld(world);
        }

    }
}