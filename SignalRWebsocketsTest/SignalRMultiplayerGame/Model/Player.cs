using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SignalRMultiplayerGame.Model.HelperClasses;
using Newtonsoft.Json;

namespace SignalRMultiplayerGame.Model
{
    public class Player : Entity
    {
        static int count = 0;
        public int PlayerId { get; set; }

        public string PlayerName { get; set; }
        public int ReloadTimer { get; set; }

        public bool isShooting;

        public Player(string _PlayerName, Vector2D _Location, Vector2D _Velocity, Vector2D _Direction)
            : base(_Location, _Velocity, _Direction)
        {
            this.PlayerName = _PlayerName;
            this.PlayerId = count;
            count++;
        }

        public override void Update(World _world)
        {
            this.Location += Velocity;

            if (ReloadTimer < 100)
            {
                ReloadTimer++;
            }

            if (isShooting && ReloadTimer == 100)
            {
                _world.ProjectileList.Add(new Projectile(Projectile.ProjectileOrigin.Player, Location.Copy(), Direction.Copy() * 3, Direction.Copy()));
                ReloadTimer = 0;               
            }

            isShooting = false;
        }
        //Entity.configure("Entity" ,"img", "direction", "x", "y", "width", "height", "moving", "state", "speed", "type", "clipX", "clipY", "lifetime", "reloadTime");


    }
}