using SignalRMultiplayerGame.Model.HelperClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRMultiplayerGame.Model
{
    public class Projectile : Entity
    {

        public ProjectileOrigin Origin { get; set; }
        public int Status { get; set; }
        public int Counter { get; set; }

        public Projectile(ProjectileOrigin _Origin, Vector2D _Location, Vector2D _Velocity, Vector2D _Direction) 
            : base(_Location, _Velocity, _Direction)
        {
            this.Origin = _Origin;
            this.Status = 0;
        }

        public override void Update(World _world)
        {
            this.Location += Velocity;
            Counter++;

            if (Counter == 10)
            {
                Status++;
                Counter = 0;
            }
        }

        public enum ProjectileOrigin {
            Player,
            Enemy
        }
    }
}