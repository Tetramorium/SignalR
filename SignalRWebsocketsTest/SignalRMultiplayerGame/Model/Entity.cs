using SignalRMultiplayerGame.Model.HelperClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRMultiplayerGame.Model
{
    public abstract class Entity
    {
        static int count = 0;
        public int EntityId { get; set; }

        public Vector2D Location { get; set; }
        public Vector2D Velocity { get; set; }
        public Vector2D Direction { get; set; }

        public Entity(Vector2D _Location, Vector2D _Velocity, Vector2D _Direction)
        {
            this.Location = _Location;
            this.Velocity = _Velocity;
            this.Direction = _Direction;

            EntityId = count;
            count++;
        }

        public abstract void Update(World _world);
    }
}